document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // AUTHENTICATION
  // =========================================================

  const SESSION_KEY = "aiFitnessCoach.currentSession";

  let currentUser = null;

  try {
    const savedSession = localStorage.getItem(SESSION_KEY);

    if (savedSession) {
      currentUser = JSON.parse(savedSession);
    }

  } catch (error) {
    console.error("Could not read current session:", error);
  }


  // If nobody is logged in, go to login
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }


  // =========================================================
  // ELEMENTS
  // =========================================================

  const userName =
    document.getElementById("user-name");

  const currentGoal =
    document.getElementById("current-goal");

  const todayProgress =
    document.getElementById("today-progress");

  const todayProgressCard =
    document.getElementById("today-progress-card");


  // Water
  const waterCount =
    document.getElementById("water-count");

  const waterProgress =
    document.getElementById("water-progress");

  const waterPlus =
    document.getElementById("water-plus");

  const waterMinus =
    document.getElementById("water-minus");


  // Meals
  const mealsCount =
    document.getElementById("meals-count");

  const mealProgress =
    document.getElementById("meal-progress");

  const mealPlus =
    document.getElementById("meal-plus");

  const mealMinus =
    document.getElementById("meal-minus");


  // Main workout
  const workoutStatus =
    document.getElementById("workout-status");

  const workoutProgress =
    document.getElementById("workout-progress");

  const startWorkout =
    document.getElementById("start-workout");


  // Full Body
  const fullBodyStart =
    document.getElementById("workout-plan-start");

  const fullBodyComplete =
    document.getElementById("workout-plan-complete");


  // Cardio
  const cardioStartButtons =
    document.querySelectorAll(".workout-start");

  const cardioCompleteButtons =
    document.querySelectorAll(".workout-complete");


  // Streak
  const streakCount =
    document.getElementById("streak-count");

  const streakDisplay =
    document.getElementById("streak-display");


  // Logout
  const logoutBtn =
    document.getElementById("logout-btn");


  // Weekly
  const weeklyWorkouts =
    document.getElementById("weekly-workouts");

  const weeklyWater =
    document.getElementById("weekly-water");

  const weeklyMeals =
    document.getElementById("weekly-meals");

  const weeklyHabits =
    document.getElementById("weekly-habits");


  // BMI
  const bmiResult =
    document.getElementById("bmi-result");

  const calorieResult =
    document.getElementById("calorie-result");


  // Goal buttons
  const goalButtons =
    document.querySelectorAll(".goal-option");


  // =========================================================
  // USER NAME
  // =========================================================

  if (userName) {

    userName.textContent =
      currentUser.name || "Member";

  }


  // =========================================================
  // STORAGE KEY
  // =========================================================
  // Each user gets separate dashboard data.
  // =========================================================

  const dashboardKey =
    `aiFitnessCoach.dashboard.${currentUser.id}`;


  // =========================================================
  // DEFAULT DATA
  // =========================================================

  const defaultData = {

    water: 0,

    meals: 0,

    workoutDone: false,

    workoutStarted: false,

    fullBodyStarted: false,

    fullBodyCompleted: false,

    cardioStarted: false,

    cardioCompleted: false,

    streak: 0,

    fitnessGoal: "",

    lastWorkoutDate: null

  };


  // =========================================================
  // LOAD DASHBOARD DATA
  // =========================================================

  let dashboardData = {
    ...defaultData
  };


  try {

    const savedData =
      localStorage.getItem(dashboardKey);

    if (savedData) {

      dashboardData = {
        ...defaultData,
        ...JSON.parse(savedData)
      };

    }

  } catch (error) {

    console.error(
      "Could not load dashboard data:",
      error
    );

  }


  // =========================================================
  // SAVE DASHBOARD DATA
  // =========================================================

  function saveDashboardData() {

    localStorage.setItem(
      dashboardKey,
      JSON.stringify(dashboardData)
    );

  }


  // =========================================================
  // DATE
  // =========================================================

  function getTodayDate() {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
      String(today.getDate())
        .padStart(2, "0");

    return `${year}-${month}-${day}`;

  }


  // =========================================================
  // USER PROFILE
  // =========================================================

  function getUserProfile() {

    const possibleKeys = [

      `aiFitnessCoach.profile.${currentUser.id}`,

      `aiFitnessCoach.user.${currentUser.id}`,

      `aiFitnessCoach.users.${currentUser.id}`,

      "profile",

      "aiFitnessCoach.profile",

      "aiFitnessCoach.userProfile",

      "fitnessProfile"

    ];


    for (const key of possibleKeys) {

      try {

        const data =
          JSON.parse(
            localStorage.getItem(key)
          );

        if (data) {
          return data;
        }

      } catch (error) {
        // Continue checking other keys
      }

    }

    return null;

  }


  // =========================================================
  // BMI
  // =========================================================

  function updateBMI() {

    if (!bmiResult) {
      return;
    }


    const profile =
      getUserProfile();


    if (
      !profile ||
      !profile.height ||
      !profile.weight
    ) {

      bmiResult.textContent =
        "—";

      return;

    }


    const height =
      Number(profile.height);

    const weight =
      Number(profile.weight);


    if (
      height <= 0 ||
      weight <= 0
    ) {

      bmiResult.textContent =
        "—";

      return;

    }


    const heightMeters =
      height / 100;


    const bmi =
      weight /
      (heightMeters * heightMeters);


    bmiResult.textContent =
      bmi.toFixed(1);

  }


  // =========================================================
  // CALORIES
  // =========================================================

  function updateCalories() {

    if (!calorieResult) {
      return;
    }


    const profile =
      getUserProfile();


    if (
      !profile ||
      !profile.age ||
      !profile.height ||
      !profile.weight
    ) {

      calorieResult.textContent =
        "—";

      return;

    }


    const age =
      Number(profile.age);

    const height =
      Number(profile.height);

    const weight =
      Number(profile.weight);


    let calories;


    if (
      profile.gender === "male"
    ) {

      calories =
        10 * weight +
        6.25 * height -
        5 * age +
        5;

    } else {

      calories =
        10 * weight +
        6.25 * height -
        5 * age -
        161;

    }


    if (!Number.isFinite(calories)) {

      calorieResult.textContent =
        "—";

      return;

    }


    calorieResult.textContent =
      Math.round(calories);

  }


  // =========================================================
  // GOAL
  // =========================================================

  const goalNames = {

    lose: "Lose Weight",

    strength: "Build Strength",

    active: "Stay Active",

    fitness: "Improve Fitness"

  };


  function updateGoalDisplay() {

    if (!currentGoal) {
      return;
    }


    const goal =
      dashboardData.fitnessGoal;


    currentGoal.textContent =
      goalNames[goal] || "—";


    goalButtons.forEach((button) => {

      button.classList.remove(
        "border-primary",
        "bg-primary/10",
        "border-accent",
        "bg-accent/10"
      );


      if (
        button.dataset.goal === goal
      ) {

        button.classList.add(
          "border-primary",
          "bg-primary/10"
        );

      }

    });

  }


  goalButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const selectedGoal =
          button.dataset.goal;


        dashboardData.fitnessGoal =
          selectedGoal;


        localStorage.setItem(
          "fitnessGoal",
          selectedGoal
        );


        saveDashboardData();

        updateGoalDisplay();

      }
    );

  });


  // =========================================================
  // WATER
  // =========================================================

  function updateWater() {

    if (waterCount) {

      waterCount.textContent =
        `${dashboardData.water} / 8`;

    }


    if (waterProgress) {

      const percentage =
        Math.min(
          (dashboardData.water / 8) * 100,
          100
        );


      waterProgress.style.width =
        `${percentage}%`;

    }

  }


  if (waterPlus) {

    waterPlus.addEventListener(
      "click",
      () => {

        if (
          dashboardData.water < 8
        ) {

          dashboardData.water++;

          saveDashboardData();

          updateDashboard();

        }

      }
    );

  }


  if (waterMinus) {

    waterMinus.addEventListener(
      "click",
      () => {

        if (
          dashboardData.water > 0
        ) {

          dashboardData.water--;

          saveDashboardData();

          updateDashboard();

        }

      }
    );

  }


  // =========================================================
  // MEALS
  // =========================================================

  function updateMeals() {

    dashboardData.meals =
      Math.max(
        0,
        Math.min(
          Number(dashboardData.meals) || 0,
          3
        )
      );


    if (mealsCount) {

      mealsCount.textContent =
        `${dashboardData.meals} / 3`;

    }


    if (mealProgress) {

      const percentage =
        Math.min(
          (dashboardData.meals / 3) * 100,
          100
        );


      mealProgress.style.width =
        `${percentage}%`;

    }

  }


  if (mealPlus) {

    mealPlus.addEventListener(
      "click",
      () => {

        if (
          dashboardData.meals < 3
        ) {

          dashboardData.meals++;

          saveDashboardData();

          updateDashboard();

        }

      }
    );

  }


  if (mealMinus) {

    mealMinus.addEventListener(
      "click",
      () => {

        if (
          dashboardData.meals > 0
        ) {

          dashboardData.meals--;

          saveDashboardData();

          updateDashboard();

        }

      }
    );

  }


  // =========================================================
  // MAIN WORKOUT
  // =========================================================

  function startMainWorkout() {

    if (
      dashboardData.workoutDone
    ) {
      return;
    }


    dashboardData.workoutStarted =
      true;


    saveDashboardData();

    updateDashboard();

  }


  function completeMainWorkout() {

    if (
      dashboardData.workoutDone
    ) {
      return;
    }


    dashboardData.workoutStarted =
      true;

    dashboardData.workoutDone =
      true;


    increaseStreak();


    saveDashboardData();

    updateDashboard();

  }


  if (startWorkout) {

    startWorkout.addEventListener(
      "click",
      startMainWorkout
    );

  }


  // =========================================================
  // FULL BODY WORKOUT
  // =========================================================

  function startFullBodyWorkout() {

    if (
      dashboardData.fullBodyCompleted
    ) {
      return;
    }


    dashboardData.fullBodyStarted =
      true;


    saveDashboardData();

    updateDashboard();

  }


  function completeFullBodyWorkout() {

    if (
      dashboardData.fullBodyCompleted
    ) {
      return;
    }


    dashboardData.fullBodyStarted =
      true;

    dashboardData.fullBodyCompleted =
      true;


    // Full Body also counts as main workout
    dashboardData.workoutStarted =
      true;

    dashboardData.workoutDone =
      true;


    increaseStreak();


    saveDashboardData();

    updateDashboard();

  }


  if (fullBodyStart) {

    fullBodyStart.addEventListener(
      "click",
      startFullBodyWorkout
    );

  }


  if (fullBodyComplete) {

    fullBodyComplete.addEventListener(
      "click",
      completeFullBodyWorkout
    );

  }


  // =========================================================
  // CARDIO WORKOUT
  // =========================================================

  function startCardioWorkout() {

    if (
      dashboardData.cardioCompleted
    ) {
      return;
    }


    dashboardData.cardioStarted =
      true;


    saveDashboardData();

    updateDashboard();

  }


  function completeCardioWorkout() {

    if (
      dashboardData.cardioCompleted
    ) {
      return;
    }


    dashboardData.cardioStarted =
      true;

    dashboardData.cardioCompleted =
      true;


    // Cardio also counts as main workout
    dashboardData.workoutStarted =
      true;

    dashboardData.workoutDone =
      true;


    increaseStreak();


    saveDashboardData();

    updateDashboard();

  }


  cardioStartButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        startCardioWorkout
      );

    }
  );


  cardioCompleteButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        completeCardioWorkout
      );

    }
  );


  // =========================================================
  // STREAK
  // =========================================================

  function increaseStreak() {

    const today =
      getTodayDate();


    if (
      dashboardData.lastWorkoutDate ===
      today
    ) {

      return;

    }


    dashboardData.streak =
      Number(dashboardData.streak) + 1;


    dashboardData.lastWorkoutDate =
      today;

  }


  // =========================================================
  // UPDATE WORKOUT BUTTONS
  // =========================================================

  function updateWorkoutButtons() {

    // Main workout

    if (startWorkout) {

      if (
        dashboardData.workoutDone
      ) {

        startWorkout.textContent =
          "WORKOUT COMPLETED ✓";

        startWorkout.disabled =
          true;

        startWorkout.classList.add(
          "opacity-60",
          "cursor-not-allowed"
        );

      } else if (
        dashboardData.workoutStarted
      ) {

        startWorkout.textContent =
          "WORKOUT STARTED ✓";

      } else {

        startWorkout.textContent =
          "START WORKOUT →";

        startWorkout.disabled =
          false;

        startWorkout.classList.remove(
          "opacity-60",
          "cursor-not-allowed"
        );

      }

    }


    // Full Body Start

    if (fullBodyStart) {

      if (
        dashboardData.fullBodyCompleted
      ) {

        fullBodyStart.textContent =
          "Completed ✓";

        fullBodyStart.disabled =
          true;

      } else if (
        dashboardData.fullBodyStarted
      ) {

        fullBodyStart.textContent =
          "Started ✓";

        fullBodyStart.disabled =
          true;

      } else {

        fullBodyStart.textContent =
          "Start";

        fullBodyStart.disabled =
          false;

      }

    }


    // Full Body Complete

    if (fullBodyComplete) {

      if (
        dashboardData.fullBodyCompleted
      ) {

        fullBodyComplete.textContent =
          "Completed ✓";

        fullBodyComplete.disabled =
          true;

      } else {

        fullBodyComplete.textContent =
          "Complete";

        fullBodyComplete.disabled =
          false;

      }

    }


    // Cardio Start

    cardioStartButtons.forEach(
      (button) => {

        if (
          dashboardData.cardioCompleted
        ) {

          button.textContent =
            "Completed ✓";

          button.disabled =
            true;

        } else if (
          dashboardData.cardioStarted
        ) {

          button.textContent =
            "Started ✓";

          button.disabled =
            true;

        } else {

          button.textContent =
            "Start";

          button.disabled =
            false;

        }

      }
    );


    // Cardio Complete

    cardioCompleteButtons.forEach(
      (button) => {

        if (
          dashboardData.cardioCompleted
        ) {

          button.textContent =
            "Completed ✓";

          button.disabled =
            true;

        } else {

          button.textContent =
            "Complete";

          button.disabled =
            false;

        }

      }
    );

  }


  // =========================================================
  // WORKOUT DISPLAY
  // =========================================================

  function updateWorkoutDisplay() {

    if (workoutStatus) {

      if (
        dashboardData.workoutDone
      ) {

        workoutStatus.textContent =
          "Done ✓";

      } else if (
        dashboardData.workoutStarted
      ) {

        workoutStatus.textContent =
          "In Progress";

      } else {

        workoutStatus.textContent =
          "Not Started";

      }

    }


    if (workoutProgress) {

      if (
        dashboardData.workoutDone
      ) {

        workoutProgress.style.width =
          "100%";

      } else if (
        dashboardData.workoutStarted
      ) {

        workoutProgress.style.width =
          "50%";

      } else {

        workoutProgress.style.width =
          "0%";

      }

    }

  }


  // =========================================================
  // TODAY'S PROGRESS
  // =========================================================

  function updateTodayProgress() {

    let completed =
      0;


    if (
      dashboardData.water >= 8
    ) {

      completed++;

    }


    if (
      dashboardData.meals >= 3
    ) {

      completed++;

    }


    if (
      dashboardData.workoutDone
    ) {

      completed++;

    }


    const progress =
      Math.round(
        (completed / 3) * 100
      );


    if (todayProgress) {

      todayProgress.textContent =
        `${progress}%`;

    }


    if (todayProgressCard) {

      todayProgressCard.textContent =
        `${progress}%`;

    }

  }


  // =========================================================
  // WEEKLY STATS
  // =========================================================

  function updateWeeklyStats() {

    if (weeklyWorkouts) {

      weeklyWorkouts.textContent =
        dashboardData.workoutDone
          ? "1"
          : "0";

    }


    if (weeklyWater) {

      weeklyWater.textContent =
        dashboardData.water;

    }


    if (weeklyMeals) {

      weeklyMeals.textContent =
        dashboardData.meals;

    }


    if (weeklyHabits) {

      let habits =
        0;


      if (
        dashboardData.water >= 8
      ) {

        habits++;

      }


      if (
        dashboardData.meals >= 3
      ) {

        habits++;

      }


      if (
        dashboardData.workoutDone
      ) {

        habits++;

      }


      weeklyHabits.textContent =
        habits;

    }

  }


  // =========================================================
  // STREAK DISPLAY
  // =========================================================

  function updateStreak() {

    if (streakCount) {

      streakCount.textContent =
        dashboardData.streak;

    }


    if (streakDisplay) {

      streakDisplay.textContent =
        dashboardData.streak;

    }

  }


  // =========================================================
  // LOGOUT
  // =========================================================

  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      () => {

        // Remove the ACTUAL authentication session
        localStorage.removeItem(
          "aiFitnessCoach.currentSession"
        );


        // Go to login
        window.location.href =
          "login.html";

      }
    );

  }


  // =========================================================
  // UPDATE EVERYTHING
  // =========================================================

  function updateDashboard() {

    updateWater();

    updateMeals();

    updateWorkoutDisplay();

    updateWorkoutButtons();

    updateStreak();

    updateTodayProgress();

    updateWeeklyStats();

    updateGoalDisplay();

    updateBMI();

    updateCalories();

    saveDashboardData();

  }


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  updateDashboard();

});
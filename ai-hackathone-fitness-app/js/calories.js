// Get saved profile
const savedProfile = localStorage.getItem("profile");


// If profile doesn't exist
if (!savedProfile) {

    alert("Please complete your profile first.");

    window.location.href = "profile.html";

}


// Convert profile from JSON
const profile = JSON.parse(savedProfile);


// Get goal
const fitnessGoal = localStorage.getItem("fitnessGoal");


// Get elements
const activityLevel =
    document.getElementById("activity-level");

const calculateButton =
    document.getElementById("calculate-btn");

const calorieError =
    document.getElementById("calorie-error");

const calorieResultBox =
    document.getElementById("calorie-result-box");

const calorieResult =
    document.getElementById("calorie-result");

const calorieGoalMessage =
    document.getElementById("calorie-goal-message");

const continueButton =
    document.getElementById("continue-btn");


// Calculate calories
calculateButton.addEventListener("click", function () {

    const activity = Number(activityLevel.value);


    // Validation
    if (!activity) {

        calorieError.classList.remove("hidden");

        return;

    }


    calorieError.classList.add("hidden");


    // BMR calculation
    let bmr;


    if (profile.gender === "male") {

        bmr =
            (10 * profile.weight) +
            (6.25 * profile.height) -
            (5 * profile.age) +
            5;

    } else {

        bmr =
            (10 * profile.weight) +
            (6.25 * profile.height) -
            (5 * profile.age) -
            161;

    }


    // TDEE
    let calories = bmr * activity;


    // Adjust according to goal
    if (fitnessGoal === "Lose Weight") {

        calories = calories - 300;

    }

    else if (fitnessGoal === "Gain Muscle") {

        calories = calories + 300;

    }


    // Round calories
    calories = Math.round(calories);


    // Display result
    calorieResult.textContent = calories;


    calorieResultBox.classList.remove("hidden");


    // Goal message
    if (fitnessGoal === "Lose Weight") {

        calorieGoalMessage.textContent =
            "Your target has been adjusted for your weight-loss goal.";

    }

    else if (fitnessGoal === "Gain Muscle") {

        calorieGoalMessage.textContent =
            "Your target has been adjusted to support muscle growth.";

    }

    else {

        calorieGoalMessage.textContent =
            "Your target is based on your estimated daily activity.";

    }


    // Save calories
    localStorage.setItem(
        "calories",
        calories
    );


    // Show continue button
    continueButton.classList.remove("hidden");

});


// Continue to workout
continueButton.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});
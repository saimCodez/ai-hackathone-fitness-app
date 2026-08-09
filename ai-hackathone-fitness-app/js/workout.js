const workoutCards = document.querySelectorAll(".workout-card");

const continueButton = document.getElementById("continue-btn");

const errorMessage = document.getElementById("workout-error");

let selectedWorkout = "";

// Select workout

workoutCards.forEach(function (card) {
  card.addEventListener("click", function () {
    // Remove selection from all cards
    workoutCards.forEach(function (item) {
      item.classList.remove("border-primary", "bg-primary/10");
    });

    // Select clicked card
    card.classList.add("border-primary", "bg-primary/10");

    // Get selected workout
    selectedWorkout = card.dataset.workout;

    // Hide error
    errorMessage.classList.add("hidden");
  });
});

// Continue button

continueButton.addEventListener("click", function () {
  // Check selection

  if (!selectedWorkout) {
    errorMessage.classList.remove("hidden");

    return;
  }

  // Save workout

  localStorage.setItem("workoutPlan", selectedWorkout);

  // Go to dashboard

  window.location.href = "dashboard.html";
});

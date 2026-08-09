const goalCards = document.querySelectorAll(".goal-card");

const continueButton = document.getElementById("continue-btn");

const errorMessage = document.getElementById("goal-error");

let selectedGoal = "";


goalCards.forEach(function (card) {

    card.addEventListener("click", function () {

        // Remove selection from all cards
        goalCards.forEach(function (item) {

            item.classList.remove(
                "border-primary",
                "bg-primary/10"
            );

        });


        // Select clicked card
        card.classList.add(
            "border-primary",
            "bg-primary/10"
        );


        selectedGoal = card.dataset.goal;

        errorMessage.classList.add("hidden");

    });

});



continueButton.addEventListener("click", function () {

    if (!selectedGoal) {

        errorMessage.classList.remove("hidden");

        return;

    }


    // Save goal
    localStorage.setItem(
        "fitnessGoal",
        selectedGoal
    );


    // Next page
    window.location.href = "bmi.html";

});
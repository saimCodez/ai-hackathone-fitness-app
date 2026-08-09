// Get saved profile
const savedProfile = localStorage.getItem("profile");


// Check if profile exists
if (!savedProfile) {

    alert("Please complete your profile first.");

    window.location.href = "profile.html";

}


// Convert saved data back into an object
const profile = JSON.parse(savedProfile);


// Get HTML elements
const heightDisplay = document.getElementById("height-display");
const weightDisplay = document.getElementById("weight-display");

const bmiResult = document.getElementById("bmi-result");
const bmiStatus = document.getElementById("bmi-status");
const bmiMessage = document.getElementById("bmi-message");

const errorMessage = document.getElementById("bmi-error");

const continueButton = document.getElementById("continue-btn");


// Display height and weight
heightDisplay.textContent = `${profile.height} cm`;

weightDisplay.textContent = `${profile.weight} kg`;


// Convert height from cm to meters
const heightInMeters = profile.height / 100;


// Calculate BMI
const bmi = profile.weight / (heightInMeters * heightInMeters);


// Round BMI to 1 decimal place
const roundedBMI = bmi.toFixed(1);


// Display BMI
bmiResult.textContent = roundedBMI;


// Determine BMI category
if (bmi < 18.5) {

    bmiStatus.textContent = "Underweight";
    bmiStatus.className = "text-lg font-bold mt-3 text-blue-400";

    bmiMessage.textContent =
        "Your BMI is below the standard adult healthy range.";

}

else if (bmi < 25) {

    bmiStatus.textContent = "Healthy Range";
    bmiStatus.className = "text-lg font-bold mt-3 text-green-400";

    bmiMessage.textContent =
        "Your BMI is within the standard adult healthy range.";

}

else if (bmi < 30) {

    bmiStatus.textContent = "Overweight";
    bmiStatus.className = "text-lg font-bold mt-3 text-yellow-400";

    bmiMessage.textContent =
        "Your BMI is above the standard adult healthy range.";

}

else {

    bmiStatus.textContent = "Obesity Range";
    bmiStatus.className = "text-lg font-bold mt-3 text-red-400";

    bmiMessage.textContent =
        "Your BMI is in the obesity range.";

}


// Save BMI
localStorage.setItem("bmi", roundedBMI);


// Continue to Calories
continueButton.addEventListener("click", function () {

    window.location.href = "calories.html";

});
const profileForm = document.getElementById("profile-form");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const errorMessage = document.getElementById("profile-error");


profileForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get values
    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const gender = genderInput.value;
    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);


    // Validation
    if (!name || !age || !gender || !height || !weight) {

        errorMessage.textContent = "Please fill in all fields.";

        errorMessage.classList.remove("hidden");

        return;
    }


    // Create profile object
    const profile = {
        name: name,
        age: age,
        gender: gender,
        height: height,
        weight: weight
    };


    // Save profile in localStorage
    localStorage.setItem(
        "profile",
        JSON.stringify(profile)
    );


    // Go to Fitness Goal
    window.location.href = "goal.html";

});
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalForm = document.querySelector(".modal-form");
const modalCloseBtn = document.querySelector(".close");
const modalFinish = document.querySelector(".modal-finish");
const modalFinishBtn = document.querySelector(".modal-finish-btn");

// Form elements
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locations = document.querySelectorAll("input[name='location']");
const checkbox = document.querySelector("#checkbox1");

// Objet pour stocker l'état de validation de chaque élément de formulaire
const validationObj = {
  firstName: false,
  lastName: false,
  email: false,
  birthdate: false,
  quantity: false,
  checkbox: true,

// Vérification de la validité des données à l'aide de la méthode 'isValid'
isValid() {
  return (
    this.firstName &&
    this.lastName &&
    this.email &&
    this.birthdate &&
    this.quantity &&
    isCityValid() &&
    this.checkbox
  );
 }
};

// Validation des données en temps réel
firstName.addEventListener("input", validateFirstName);
lastName.addEventListener("input", validateLastName);
email.addEventListener("input", validateEmail);
birthdate.addEventListener("input", validateBirthdate);
quantity.addEventListener("input", validateQuantity);
checkbox.addEventListener("change", validatePolicy);

locations.forEach((item) => {
  item.addEventListener("change", validateCity);
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.addEventListener("click", closeModal);
modalFinishBtn.addEventListener("click", closeModalFinish);
modalForm.addEventListener("submit", submitModal);

function validateForm() {
  validateFirstName();
  validateLastName();
  validateEmail();
  validateBirthdate();
  validateQuantity();
  validateCity();
  validatePolicy();
}

// validation function FirstName
function validateFirstName() {
  clearError(firstName);
  validationObj.firstName = true;

  if (firstName.value === "") {
    displayError(firstName, "Entrez votre prénom");
    validationObj.firstName = false;
  } else if (firstName.value.length < 2) {
    displayError(
      firstName,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom"
    );
    validationObj.firstName = false;
  }
}

// validation function LastName
function validateLastName() {
  clearError(lastName);
  validationObj.lastName = true;

  if (lastName.value === "") {
    displayError(lastName, "Entrez votre nom");
    validationObj.lastName = false;
  } else if (lastName.value.length < 2) {
    displayError(
      lastName,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom"
    );
    validationObj.lastName = false;
  }
}

// validation function Email
function validateEmail() {
  clearError(email);
  validationObj.email = true;

  if (email.value === "") {
    displayError(email, "Entrez email");
    validationObj.email = false;
    //  une expression régulière pour valider une adresse e-mail
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    displayError(email, "Email doit être valide");
    validationObj.email = false;
  }
}

// validation function Birthdate
function validateBirthdate() {
  clearError(birthdate);
  validationObj.birthdate = true;

  if (birthdate.value === "") {
    displayError(birthdate, "Vous devez entrer votre date de naissance");
    validationObj.birthdate = false;
  } else if (!isValidDate(birthdate.value)) {
    displayError(birthdate, "La date de naissance n'est pas valide");
    validationObj.birthdate = false;
  } else if (!isPersonOldEnough(birthdate.value, 16)) {
    displayError(birthdate, "Vous devez avoir au moins 16 ans");
    validationObj.birthdate = false;
  }
}

// validation function Quantity
function validateQuantity() {
  clearError(quantity);
  validationObj.quantity = true;

  if (quantity.value === "") {
    displayError(quantity, "Entrez la quantité");
    validationObj.quantity = false;
  } else if (+quantity.value < 0 || +quantity.value > 99) {
    displayError(quantity, "La quantité doit être comprise entre 0 et 99");
    validationObj.quantity = false;
  }
}

// validation function Location
function validateCity() {
  clearError(locations[0]);
  if (!isCityValid()) {
    displayError(locations[0], "Vous devez choisir une option");
  }
}

// validation function Policy
function validatePolicy() {
  clearError(checkbox);
  validationObj.checkbox = true;

  if (!checkbox.checked) {
    displayError(
      checkbox,
      "Vous devez vérifier que vous acceptez les termes et conditions"
    );
    validationObj.checkbox = false;
  }
}

function isCityValid() {
  return Array.from(locations).some((item) => item.checked);
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
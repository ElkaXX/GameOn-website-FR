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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
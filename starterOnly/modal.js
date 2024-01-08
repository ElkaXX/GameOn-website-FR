//La fonction "editNav()" est responsable de la réponse à l'appui sur le bouton "burger" dans le menu de navigation.
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Obtenir et enregistrer des références aux éléments DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn"); // La variable "modalBtn", qui stocke une collection d'éléments DOM trouvés avec la classe ".modal-btn".
const modalForm = document.querySelector(".modal-form");
const modalCloseBtn = document.querySelector(".close"); //La variable "modalCloseBtn", qui stocke une référence à un élément DOM avec la classe ".close".
const modalFinish = document.querySelector(".modal-finish");
const modalFinishBtn = document.querySelector(".modal-finish-btn");

// Form elements. Affectation de valeurs d'éléments de formulaire à des variables
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locations = document.querySelectorAll("input[name='location']"); //J'attribue à la variable "locations" une collection de toutes les cases à cocher portant le nom "location".
const checkbox = document.querySelector("#checkbox1");

// Objet pour stocker l'état de validation de chaque élément de formulaire
const validationObj = {
  firstName: false,
  lastName: false,
  email: false, //Propriété permettant de suivre l'exactitude de l'adresse e-mail saisie.
  birthdate: false,
  quantity: false,
  checkbox: true,

// Vérification de la validité des données à l'aide de la méthode 'isValid'
isValid() {
  return (
    this.firstName && // Vérifier que firstName est validé (non vide et comportant au moins 2 caractères)
    this.lastName &&
    this.email &&
    this.birthdate &&
    this.quantity &&
    isCityValid() && // Vérification qu'au moins une ville est sélectionnée (la fonction isCityValid est appelée)
    this.checkbox  // Vérifier que la case est cochée (true)
  );
 }
};

// Validation des données en temps réel
firstName.addEventListener("input", validateFirstName);
lastName.addEventListener("input", validateLastName);
email.addEventListener("input", validateEmail);
birthdate.addEventListener("input", validateBirthdate);
quantity.addEventListener("input", validateQuantity); //Définit l'écouteur d'événement pour le champ "quantité" sur l'événement "input", en appelant la fonction "validateQuantity".
checkbox.addEventListener("change", validatePolicy);

//Écouteur d'événements pour chaque élément de la collection "locations" à l'aide de la méthode "forEach"
locations.forEach((item) => {
  item.addEventListener("change", validateCity);
});

// launch modal event

//Un écouteur pour l'événement "click" est ajouté. Avec cliquer sur l'un de ces boutons, la fonction "launchModal" est appelée.
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); 
modalCloseBtn.addEventListener("click", closeModal);
//Ajouter un écouteur d'événement de clic pour un bouton avec la classe modal-finish-btn (bouton de fin de fenêtre modale)
modalFinishBtn.addEventListener("click", closeModalFinish);
//Un écouteur pour l'événement "submit" de formulaire est ajouté. Lorsque le formulaire est soumis (l'utilisateur appuie sur "C'est parti"), la fonction "submitModal" est appelée.
modalForm.addEventListener("submit", submitModal);

//Appeler "validateForm()" pour valider tous les champs du formulaire.
function validateForm() {
  validateFirstName();
  validateLastName();
  validateEmail();
  validateBirthdate();
  validateQuantity();
  validateCity();
  validatePolicy();
}

// La fonction validateFirstName, qui permet de valider le champ de saisie du nom (firstName) en temps réel.
function validateFirstName() {
  clearError(firstName); //Appelle la fonction clearError, qui efface tous les messages d'erreur.
  validationObj.firstName = true;

  if (firstName.value === "") {//Vérifie si un champ de saisie est vide
    displayError(firstName, "Entrez votre prénom"); //Appelle la fonction displayError, qui ajoute un message d'erreur indiquant que le champ doit être renseigné.
    validationObj.firstName = false;
  } else if (firstName.value.length < 2) { //Vérifie si le nom saisi contient au moins deux caractères.
    displayError( //Si le nom saisi contient moins de deux caractères, displayError affiche des messages d'erreur.
      firstName,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom"
    );
    validationObj.firstName = false; //Définit firstName sur "false" dans "validationObj", indiquant que la validation du champ a échoué.
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

// validation function Location. 
function validateCity() {
  clearError(locations[0]);
  if (!isCityValid()) { // Vérifie si au moins une ville est sélectionnée et renvoie « true »
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

// Effacement des valeurs des champs de formulaire à l'aide de la fonction clearForm()
function clearForm() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  birthdate.value = "";
  quantity.value = "";
  locations.forEach((item) => (item.checked = false)); //Réinitialisation de toutes "checkbox" dans la collection "locations"
  checkbox.checked = true; //Définir l'état "checkbox" à sa valeur d'origine.

// Efface les erreurs pour chaque champ utilisation de la fonction "clearError"
  clearError(firstName);
  clearError(lastName);
  clearError(email);
  clearError(birthdate);
  clearError(quantity);
  clearError(locations[0]);
  clearError(checkbox);
}

// launch modal form
function launchModal() {
  clearForm(); //Efface un formulaire à l'aide de la fonction "clearForm()".
  modalbg.style.display = "block"; //Afficher une fenêtre modale
}

function closeModal() {
  modalbg.style.display = "none"; //Masque la fenêtre modale
}

function closeModalFinish() {
  closeModal();

  modalForm.style.display = "block";
  modalFinish.style.display = "none";
}

function submitModal(e) {
  e.preventDefault(); //Empêche la soumission du formulaire par défaut

  validateForm(); //Appelle la fonction validateForm() pour valider les données du formulaire

  if (validationObj.isValid() && confirm("Êtes-vous sûr ?")) { //Contrôle de validation
    // send ajax request to server
    modalForm.style.display = "none";
    modalFinish.style.display = "flex"; //L'élément sera rendu comme un conteneur
  }
}

function isValidDate(dateString) { //Vérifie si une chaîne est une date valide à l'aide de l'objet "Date"
  const date = new Date(dateString);
  if (isNaN(date.getTime())) { //Si date est un objet "Date" valide, alors getTime() renvoie un nombre, sinon il renvoie NaN (Pas un nombre).
    return false;
  }

  return true;
}

function isPersonOldEnough(dateString, minAge) { //Vérifie si une personne a atteint l'âge minimum spécifié en fonction de sa date de naissance.
  const today = new Date(); //new Date est créé pour représenter la date actuelles.
  const date = new Date(dateString); // New Date est créé représentant la date de naissance obtenue à partir de la chaîne "dateString"
  const age = today.getFullYear() - date.getFullYear(); // L'âge est calculé

  return age >= minAge;
}

//Création d'un élément avec un message d'erreur à l'aide de "displayError"
function displayError(formField, errorMessage) {
  const errorContainer = document.createElement("div"); //Un nouvel élément "div" est créé et contiendra le message d'erreur
  errorContainer.className = "error-message"; 
  errorContainer.innerText = errorMessage;

  formField.parentNode.appendChild(errorContainer); //L'élément de message d'erreur généré est ajouté à l'élément parent "formField".
  formField.classList.add("error-field"); // Ajoute la classe « error-field » pour styliser le champ "message d'erreur".
}

// Supprime un message d'erreur
function clearError(formField) {
  const errorMessage = formField.parentNode.querySelector(".error-message");
  if (errorMessage) {
    formField.parentNode.removeChild(errorMessage); // Vérifie et supprime le message d'erreur précédent avant d'en afficher un nouveau
  }
  formField.classList.remove("error-field"); // La classe "error-field" est supprimée de formField
}

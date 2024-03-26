import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"

const initialCards = [
    {
        name: "Yosemite Valley", 
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
        name: "Lake Louise", 
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Bald Mountains", 
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Latemar", 
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park", 
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies", 
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }
];

/* ELEMENTS */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = document.forms["edit-profile-form"];
const cardListEl = document.querySelector(".cards__list");

const cardAddModal = document.querySelector('#add-card-modal'); 
const cardAddButton = document.querySelector('#add-button');
const cardAddCloseButton = cardAddModal.querySelector(".modal__close");
const cardAddForm = document.forms["add-card-form"];

const previewImageModal = document.querySelector('#preview-image-modal');
const modalImageElement = previewImageModal.querySelector(".modal__image");
const modalImageCaption = previewImageModal.querySelector(".modal__image-caption");
const previewImageCloseButton = previewImageModal.querySelector(".modal__close");

/* FUNCTIONS */
function createCard(data) {
    const card = new Card(data, "#card-template", handleImageClick)
    return card.generateCard()
} 

function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', closeModalByEscape);
    modal.removeEventListener("mousedown", closeModalOnRemoteClick);
};

function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', closeModalByEscape);
    modal.addEventListener("mousedown", closeModalOnRemoteClick);
};

function closeModalByEscape(event) {
    if (event.key === 'Escape') {
        const openedModal = document.querySelector('.modal_opened');
        closeModal(openedModal);
    };
};

function renderCard(cardElement, container) {
    container.prepend(cardElement);
};

const handleImageClick = (cardData) => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalImageCaption.textContent = cardData.name;
    openModal(previewImageModal);
};


function closeModalOnRemoteClick(evt) {
    if (evt.target === evt.currentTarget) { 
      closeModal(evt.target);
    }
};

/* EVENT HANDLERS */

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal); 
}

function handleAddCardsubmit(e) {
    e.preventDefault();
    const name = e.target.title.value;
    const link = e.target.link.value;
    const card = new Card({name, link}, "#card-template", handleImageClick)
    const cardElement = card.generateCard();
    renderCard(cardElement, cardListEl);
    e.target.reset();
    closeModal(cardAddModal); 
};

function handleProfileEditButton () {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal);
};

/* EVENT LISTENER */

profileEditButton.addEventListener('click', handleProfileEditButton);

profileEditCloseButton.addEventListener('click', () => {
    closeModal(profileEditModal);
});

cardAddButton.addEventListener('click', () => {
    openModal(cardAddModal);
});

cardAddCloseButton.addEventListener('click', () => {
    closeModal(cardAddModal);
});

previewImageCloseButton.addEventListener('click', () => {
    closeModal(previewImageModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddForm.addEventListener("submit", handleAddCardsubmit);

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    renderCard(cardElement, cardListEl);
});

const options = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  };

const editProfileFormValidator =  new FormValidator(options, profileEditForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(options, cardAddForm);
addCardFormValidator.enableValidation();

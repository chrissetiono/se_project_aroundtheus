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
]

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
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

const cardAddModal = document.querySelector('#add-card-modal'); 
const cardAddButton = document.querySelector('#add-button');
const cardAddCloseButton = cardAddModal.querySelector(".modal__close")
const cardAddForm = document.forms["add-card-form"];

const previewImageModal = document.querySelector('#preview-image-modal');
const modalImageElement = previewImageModal.querySelector(".modal__image");
const modalImageCaption = previewImageModal.querySelector(".modal__image-caption");
const previewImageCloseButton = previewImageModal.querySelector(".modal__close")

/* FUNCTIONS */

function closeModal(modal) {
    modal.classList.remove('modal_opened');
}

function openModal(modal) {
    modal.classList.add('modal_opened');
}

function renderCard(cardElement, container) {
    container.prepend(cardElement);
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_active");
    });

    deleteButton.addEventListener("click", () => {
        cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
        modalImageElement.src = cardData.link;
        modalImageElement.alt = cardData.name;
        modalImageCaption.textContent = cardData.name;
        openModal(previewImageModal);
    })

    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardTitleEl.textContent = cardData.name;
    return cardElement;
}

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
    const cardElement = getCardElement({
        name, link
    })
    renderCard(cardElement, cardListEl)
    e.target.reset();
    closeModal(cardAddModal); 
}


/* EVENT LISTENER */

profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal);
});

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
    const cardElement = getCardElement(cardData);
    renderCard(cardElement, cardListEl);
});


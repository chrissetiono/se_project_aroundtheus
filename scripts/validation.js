// enabling validation by calling enableValidation()
// pass all the settings on call



function showInputError(formEl, inputEl, options) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`)
    inputEl.classList.add(options.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formEl, inputEl, options) {
    inputEl.classList.remove(options.inputErrorClass);
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.remove(options.errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, options);
    } else {
        hideInputError(formEl, inputEl, options);
    }
}

const hasValidInputs = (inputList) => inputList.every((inputEl) => inputEl.validity.valid === true)

function toggleButtonState(inputList, submitButton, options) {
    submitButton.disabled = false;
    if (!hasValidInputs(inputList)) {
        submitButton.disabled = true;
        submitButton.classList.add(options.inactiveButtonClass)
    } else {
        submitButton.classList.remove(options.inactiveButtonClass);
    }
    return submitButton.disabled;

}

function setEventListeners(formEl, options) {
    const inputList = [...formEl.querySelectorAll(options.inputSelector)];
    const submitButton = formEl.querySelector(options.submitButtonSelector);
    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
            checkInputValidity(formEl, inputEl, options);

            toggleButtonState(inputList, submitButton, options);
        })

    })
}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        setEventListeners(formEl, options);
        // look for all inputs inside of form
        // loop through all the inputs to see if all are valid
        // if input is not valid
            // get validation message
            // add error class to input
            // display error message
            // disable button
        // if all inputs are valid
            // enable button
            // reset error message
    });
}

const options = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  };

enableValidation(options);
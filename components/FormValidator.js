export default class FormValidator {
    constructor (options, formEl) {
        this._inputSelector = options.inputSelector;
        this.submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this.inputErrorClass = options.inputErrorClass;
        this.errorClass = options.errorClass;

        this._form = formEl;
    }

    _showInputError(inputEl) {
        this.errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`)
        inputEl.classList.add(this.inputErrorClass);
        this.errorMessageEl.textContent = inputEl.validationMessage;
        this.errorMessageEl.classList.add(this.errorClass);
    } 
        
    _hideInputError(inputEl) {
        inputEl.classList.remove(this.inputErrorClass);
        this.errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
        this.errorMessageEl.textContent = inputEl.validationMessage;
        this.errorMessageEl.classList.remove(this.errorClass);
    }

    _checkInputValidity(inputEl) {
        if (!inputEl.validity.valid) {
            this._showInputError(inputEl);
        } else {
            this._hideInputError(inputEl);
        }
    }

    _hasValidInputs() {
        return this._inputList.every((inputEl) => inputEl.validity.valid === true);
    }

    toggleButtonState() {
        if (!this._hasValidInputs()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _setEventListeners () {
        this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
        this._submitButton = this._form.querySelector(this.submitButtonSelector);
        this._inputList.forEach((inputEl) => {
            inputEl.addEventListener("input", () => {
                this._checkInputValidity(inputEl);
                this.toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }

    _disableButton() {
        this._submitButton.disabled = true;
        this._submitButton.classList.add(this._inactiveButtonClass)
    }

    _enableButton() {
        this._submitButton.disabled = false;
        this._submitButton.classList.remove(this._inactiveButtonClass);
    }
}
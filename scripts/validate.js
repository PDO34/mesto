  export const enableValidation = {
        formSelector: '.popup__form',
        inputSelector: '.popup__row',
        submitButtonSelector: '.popup__btn-submit',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    };

  export class FormValid {
      constructor(validationConfig, form) {
            this._form = form;
            this._formSelector = validationConfig.formSelector;
            this._inputSelector = validationConfig.inputSelector;
            this._submitButtonSelector = validationConfig.submitButtonSelector;
            this._inactiveButtonClass = validationConfig.inactiveButtonClass;
            this._inputErrorClass = validationConfig.inputErrorClass;
            this._errorClass = validationConfig.errorClass;

            this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
            this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        }

      // Функция "ошибки"
      _showInputError(inputElement, errorMessage) {
            const errorElement = this._form.querySelector(`#${inputElement.name}Error`);
            inputElement.classList.add(this._inputErrorClass);
            errorElement.textContent = errorMessage;
            errorElement.classList.add(this._errorClass); 
        };

      // Функция удаления "ошибки"
      _hideInputError(inputElement) {
            const errorElement = this._form.querySelector(`#${inputElement.name}Error`)
            inputElement.classList.remove(this._inputErrorClass);
            errorElement.classList.remove(this._errorClass);
            errorElement.textContent = '';
        };

        // Функция проверки валидности
      _checkInputValidity(inputElement) {
            if (!inputElement.validity.valid) {        
              this._showInputError(inputElement, inputElement.validationMessage);
            } else {
              this._hideInputError(inputElement);
            }
        };

        _hasInvalidInput(inputList) {
            return this._inputList.some((inputElement) => {
                return !inputElement.validity.valid;
            });
        };

        // Функция блокирования кнопки "сохранить/добавить" при проверки валидности
      _toggleButtonState(inputList, buttonElement) {
            if (this._hasInvalidInput()) {
              this._buttonElement.classList.add(this._inactiveButtonClass);
              this._buttonElement.disabled = true; // деактивация
            } else {
              this._buttonElement.classList.remove(this._inactiveButtonClass);
              this._buttonElement.disabled = false; // активация
            }
        };

        // Функция валидации в инпутах (определенного элемента)
      _setEventListener() {
          this._inputList.forEach((inputElement) => {
              inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);  
                this._toggleButtonState();
              });
          });
        };

        // Функция запуска валидации в инпутах (определенного элемента)
      clearForm() {
          this._inputList.forEach((inputItem) => {
              inputItem.value = '';
              this._hideInputError(inputItem);
              this._toggleButtonState();
          });
          this.buttonElement.disabled = true;
        }
        // Функция определения элемента из массива форм
        enableValidation() {
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListener();
        }
    }

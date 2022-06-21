export default class FormValidator {
    constructor(formSelectors, formElement) {
      this._formElement = formElement;
  
      this._inputFieldSelector = formSelectors.inputFieldSelector;
      this._inputSelector = formSelectors.inputSelector;
      this._inputErrorMessageClass = formSelectors.inputErrorMessageClass;
      this._inputErrorUnderlineClass = formSelectors.inputErrorUnderlineClass;
      this._activeErrorClass = formSelectors.activeErrorClass;
      this._inactiveSubmitButtonClass = formSelectors.inactiveSubmitButtonClass;
      this._inputElementsArr = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._popupSubmitButtonElement = this._formElement.querySelector(formSelectors.popupSubmitButtonSelector);
    }
  
    // Добавление сообщения об ошибке
    _showInputError = (inputElement, errorMessage) => {
      const errorElement = inputElement.closest(this._inputFieldSelector).querySelector(this._inputErrorMessageClass); // ссылка на span внутри формы
      inputElement.classList.add(this._inputErrorUnderlineClass); // подчеркивает поле input красной линией
      errorElement.textContent = errorMessage; // вставляет в span текст ошибки
      errorElement.classList.add(this._activeErrorClass); // выводит сообщение об ошибке
    }
  
  // Удаление сообщения об ошибке
    _hideInputError = inputElement => {
      const errorElement = inputElement.closest(this._inputFieldSelector).querySelector(this._inputErrorMessageClass);
      inputElement.classList.remove(this._inputErrorUnderlineClass);
      errorElement.classList.remove(this._activeErrorClass);
      errorElement.textContent = '';
    }
  
  // Проверить валидность поля
    _isValid = inputElement => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
  // Перебрать массив, чтобы найти невалидный input
    _hasInvalidInput = () => {
      return this._inputElementsArr.some(inputElement => {
        return !inputElement.validity.valid;
      });
    }
  
    toggleButtonState = () => {
      if (this._hasInvalidInput()) {
        this._popupSubmitButtonElement.classList.add(this._inactiveSubmitButtonClass);
        this._popupSubmitButtonElement.setAttribute('disabled', true);
      } else {
        this._popupSubmitButtonElement.classList.remove(this._inactiveSubmitButtonClass);
        this._popupSubmitButtonElement.removeAttribute('disabled');
      }
    }
  
  // Установить слушатель для добавления сообщений об ошибках при заполнении полей формы
    _setEventListeners = () => {
      this.toggleButtonState(); // делает кнопку неактивной, если хотя бы одно поле формы невалидно
  
      this._inputElementsArr.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
          this.toggleButtonState();
        });
      });
    }
  
  // Запустить выполнение методов класса
    enableValidation = () => {
      this._setEventListeners();
    };
  }
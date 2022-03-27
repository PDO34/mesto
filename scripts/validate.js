//Сергей, благодарю за Вас за помощь, когда получаешь развернутый ответ от ревьювера это очень помогает, 
//попробую еще раз вопроизвести форму на тестовом макете! Вроде исправил все замечания, 
//кроме падингов у инпутов, т.к. в макете там отступы по 13px, если их убрать текст падает на полоску инпута.
// Еще раз большое спасибо!

const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__row',
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

// Функция "ошибки"
const showInputError = (formElement, inputElement, errorMessage, enableValidation) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}Error`);
    inputElement.classList.add(enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enableValidation.errorClass);
};

//Функция удаления "ошибки"
const hideInputError = (formElement, inputElement, enableValidation) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}Error`)
    inputElement.classList.remove(enableValidation.inputErrorClass);
    errorElement.classList.remove(enableValidation.errorClass);
    errorElement.textContent = '';
};

//Функция проверки валидности
const checkInputValidity = (formElement, inputElement, enableValidation) => {
    if (!inputElement.validity.valid) {        
        showInputError(formElement, inputElement, inputElement.validationMessage, enableValidation);
    } else {
        hideInputError(formElement, inputElement, enableValidation);
    }
};

//Функция валидации в инпутах (определенного элемента)
const setEventListeners = (formElement,enableValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);  

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, enableValidation);
            toggleButtonState(inputList, buttonElement, formElement, enableValidation);
        });
    });
};

//Функция определения элемента из массива форм
function enableValidationForm(enableValidation) {
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, enableValidation);
    });
};

//Функция блокирования кнопки "сохранить/добавить" при проверки валидности
const toggleButtonState = (inputList, buttonElement, formElement, enableValidation) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(enableValidation.inactiveButtonClass);
        buttonElement.disabled = true; // деактивация
    } else {
        buttonElement.classList.remove(enableValidation.inactiveButtonClass);
        buttonElement.disabled = false; // активация
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//Функция запуска валидации в инпутах (определенного элемента)
function clearForm(popup, enableValidation) {
    const inputList = Array.from(popup.querySelectorAll(enableValidation.inputSelector));
    const formElement = popup.querySelector(enableValidation.formSelector);
    const buttonElement = popup.querySelector(enableValidation.submitButtonSelector);
    inputList.forEach((inputItem) => {
        inputItem.value = '';
        hideInputError(formElement, inputItem, enableValidation);
        toggleButtonState(inputList, buttonElement, formElement, enableValidation);
    });
    buttonElement.disabled = true;
};

enableValidationForm(enableValidation);

const errorShow = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}Error`)
    errorElement.textContent = errorMessage
    errorElement.classList.add('popup__input-error_active')
    inputElement.classList.add('popup__input_type_error')
}

const errorHide = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}Error`)
    errorElement.textContent = ''
    errorElement.classList.remove('popup__input-error_active')
    inputElement.classList.remove('popup__input_type_error')
}

const checkInputValidity = (formElement, inputElement) => {
    const inputNotValid = !inputElement.validity.valid;

    if (inputNotValid) {
        const errorMessage = inputElement.validationMessage;
        errorShow(formElement, inputElement, errorMessage);
    } else {
        errorHide(formElement, inputElement);
    }
};


const toggleButtonState = (inputList, buttonElement) => {
    const inputInvalid = Array.from(inputList).some(elem => {
        return !elem.validity.valid    
    });

    if (inputInvalid) {
        buttonElement.classList.add('popup__btn_disabled')
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove('popup__btn_disabled')
        buttonElement.removeAttribute('disabled')
    }
}

const setEventListeners = (formElement) => {
    const inputList = formElement.querySelectorAll('.popup__row')
    const buttonElement = formElement.querySelector('.popup__btn-submit')  

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
            checkInputValidity(formElement, inputElement)
            toggleButtonState(inputList, buttonElement)
        })
    })
}

const enableValidation = () => {
    const listForm = document.querySelectorAll('.popup__form');

    listForm.forEach(formElement => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setEventListeners(formElement)
    })
}

enableValidation();
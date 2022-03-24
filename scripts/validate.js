const toggleButtonState = (inputList, buttonElement) => {
    const inputElements = Array.from(inputList)
    const inputInvalid = inputElements.some(inputElement => {
        return !inputElement.validity.valid
    });

    if (inputInvalid) {
        buttonElement.classList.add('popup__btn_disabled') // добавить стиль
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove('popup__btn_disabled')
        buttonElement.removeAttribute('disabled')
    }
}

const setEventListeners = (formElement) => {
    const inputList = formElement.querySelectorAll('.popup__row')
    const buttonElement = formElement.querySelector('.popup__btn_effect_submit')

    toggleButtonState(inputList, buttonElement)

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
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
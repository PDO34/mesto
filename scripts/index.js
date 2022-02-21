// Сделал через add и remove, зачем в toggle делать проверку, 
// если мы изначально знаем что он добавляет если нету и удаляет если есть, 
// т.е. по идеи это может быть Открытие-закрытием и закрытие-открытием.
// Если поясните буду благодарен, спасибо.

const popup = document.querySelector('.popup');
const popupName = document.querySelector('.popup__row_data_name');
const popupStatus = document.querySelector('.popup__row_data_profession');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupOpenBtn = document.querySelector('.profile__edit-btn');

//Открываем попап
const openPopupForm = function () {    
    popup.classList.add('popup_open');
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
};

//"слушаем"
popupOpenBtn.addEventListener('click', openPopupForm);

const popupCloseBtn = document.querySelector('.popup__btn_effect_close');

//Закрываем попап
const closePopupForm = function () {    
    popup.classList.remove('popup_open');
};

//"слушаем"
popupCloseBtn.addEventListener('click', closePopupForm);

const popupSubmitForm = popup.querySelector ('.popup__form');

//Сохраняем форму
const submitForm = function(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    closePopupForm();
};

//"слушаем"
popupSubmitForm.addEventListener('submit', submitForm);
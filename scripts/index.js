import { FormValid, enableValidation } from './validate.js'
import { Card } from './Card.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Попап редактирование профиля
const popupEditProfile = document.querySelector('.popup_type-edit');
const popupEditOpenBtnProfile = document.querySelector('.profile__edit-btn');

//Попап картинки при нажатии
const popupImage = document.querySelector('#image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__text');
const popupImageClose = popupImage.querySelector('.popup__btn_effect_close');
//Попап добавления карточки
const popupAddElement = document.querySelector('#addElement');
const popupAddButtonOpenElement = document.querySelector('.profile__add-btn');

// Попапы
const popups = document.querySelectorAll('.popup');

// Popup
const editForm = popupEditProfile.querySelector('.popup__form'); // профиль
const addCardForm = popupAddElement.querySelector('.popup__form'); // карточки

// Заполнение формы профиля
const jobInput = document.querySelector('.popup__row_data_profession');
const nameInput = document.querySelector('.popup__row_data_name');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

// Заполнение формы карточек
const fieldCardName = document.querySelector('.popup__row_card_name');
const fieldCardProfession = document.querySelector('.popup__row_card_profession');

// Валидация
const editFormValidator = new FormValid(enableValidation, editForm);
const addCardFormValidator = new FormValid(enableValidation, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// editFormValidator.clearForm();
//

//
popupEditOpenBtnProfile.addEventListener('click', () => {
  // editFormValidator.clearForm();
  openPopupForm(popupEditProfile);
  jobInput.value = profileStatus.textContent;
  nameInput.value = profileName.textContent;
});

popupAddButtonOpenElement.addEventListener('click', () => {
  openPopupForm(popupAddElement);
  addCardFormValidator.clearForm();
});
//

// Функция закрытия на крестик и оверле

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_open')) {
      closePopupForm(popup)
    }
    if (evt.target.classList.contains('popup__btn_effect_close')) {
      closePopupForm(popup)
    }    
  })
});

// Заполнение формы профиля
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;

  closePopupForm(popupEditProfile)
});

// Заполнение формы карточки
addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const item = {
    name: fieldCardName.value,
    link: fieldCardProfession.value
  }

  const cardElement = createCard(item);
  elementList.prepend(cardElement);

  closePopupForm(popupAddElement);

  evt.target.reset();
});

//Карточки
const elementList = document.querySelector('.elements'); 
const elementTemplate = '.element-tamplate' 

// Функция создания карточки

function createCard(cardData) {
  const card = new Card(cardData, elementTemplate);
  const cardElement = card.createCard();
  return cardElement
};

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  elementList.prepend(cardElement);
});


console.log(initialCards);







// Функция открытия попапа
export function openPopupForm(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', escClosePopupForm); 
};

// Функция закрытия попапа
function closePopupForm(popup) {
popup.classList.remove('popup_open')
document.removeEventListener('keydown', escClosePopupForm);
};

// Функция закрытия попап Esc
function escClosePopupForm(evt) {
if (evt.key === 'Escape') {
  const openPopup = document.querySelector('.popup_open')
  closePopupForm(openPopup);
}  
};
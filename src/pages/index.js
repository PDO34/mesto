import './index.css';

import { initialCards } from '../utils/initialCards.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {
  profileEditButtonSelector,
  cardAddButtonSelector,
  profileSelector,
  profileNameSelector,
  profileAboutSelector,
  cardsContainerSelector,
  popupProfileSelector,
  popupProfileNameSelector,
  popupProfileAboutSelector,
  popupCardSelector,
  popupImageSelector,
  cardTemplateSelector,
  formSelectors
} from '../utils/constants.js';

const profileElement = document.querySelector(profileSelector);
const profileEditButtonElement = profileElement.querySelector(profileEditButtonSelector);

const popupProfileFormElement = document.querySelector(popupProfileSelector);
const popupCardFormElement = document.querySelector(popupCardSelector);

const popupProfileNameElement = popupProfileFormElement.querySelector(popupProfileNameSelector);
const popupProfileAboutElement = popupProfileFormElement.querySelector(popupProfileAboutSelector);

// Отрисовка initial cards

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

function createCard(cardData) {
  const newCard = new Card(cardData, cardTemplateSelector, () => {popupWithImage.open(cardData)});
  return newCard.generateCard();
};

const renderCards = new Section(
  { items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      renderCards.addItemAppend(card);
    }
  },
  cardsContainerSelector);

renderCards.renderItems();

// Изменение данных профиля

const userInfo = new UserInfo({profileNameSelector, profileAboutSelector});

const popupWithProfileForm = new PopupWithForm(popupProfileSelector, (formData) => {
  userInfo.setUserInfo({userName: formData.userName, userAbout: formData.userAbout});
  popupWithProfileForm.close();
});

popupWithProfileForm.setEventListeners();

profileEditButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupProfileNameElement.value = userData.userName;
  popupProfileAboutElement.value = userData.userAbout;
  popupWithProfileForm.open();
});


// Создание новой карточки

const popupWithCardForm = new PopupWithForm(popupCardSelector, (formData) => {
  const card = createCard({name: formData.name, link: formData.link});
  renderCards.addItemPrepend(card);
  popupWithCardForm.close();
});

popupWithCardForm.setEventListeners();

document.querySelector(cardAddButtonSelector).addEventListener('click', () => {
  newCardValidation.toggleButtonState();
  popupWithCardForm.open();
});


/** Подключение валидации полей формы */
const profileValidation = new FormValidator(formSelectors, popupProfileFormElement);
const newCardValidation = new FormValidator(formSelectors, popupCardFormElement);
profileValidation.enableValidation();
newCardValidation.enableValidation();




// import { FormValidator, enableValidation } from '../scripts/FormValidator.js'
// import { Card } from '../scripts/Card.js';

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// //Попап редактирование профиля
// const popupEditProfile = document.querySelector('.popup_type-edit');
// const popupEditOpenBtnProfile = document.querySelector('.profile__edit-btn');

// //Попап картинки при нажатии
// const popupImage = document.querySelector('#image');
// const popupImagePicture = popupImage.querySelector('.popup__image');
// const popupImageText = popupImage.querySelector('.popup__text');
// const popupImageClose = popupImage.querySelector('.popup__btn_effect_close');
// //Попап добавления карточки
// const popupAddElement = document.querySelector('#addElement');
// const popupAddButtonOpenElement = document.querySelector('.profile__add-btn');

// // Попапы
// const popups = document.querySelectorAll('.popup');

// // Popup
// const editForm = popupEditProfile.querySelector('.popup__form'); // профиль
// const addCardForm = popupAddElement.querySelector('.popup__form'); // карточки

// // Заполнение формы профиля
// const jobInput = document.querySelector('.popup__row_data_profession');
// const nameInput = document.querySelector('.popup__row_data_name');
// const profileName = document.querySelector('.profile__name');
// const profileStatus = document.querySelector('.profile__status');

// // Заполнение формы карточек
// const fieldCardName = document.querySelector('.popup__row_card_name');
// const fieldCardProfession = document.querySelector('.popup__row_card_profession');

// // Валидация
// const editFormValidator = new FormValidator(enableValidation, editForm);
// const addCardFormValidator = new FormValidator(enableValidation, addCardForm);

// editFormValidator.enableValidation();
// addCardFormValidator.enableValidation();

// // editFormValidator.clearForm();
// //

// //
// popupEditOpenBtnProfile.addEventListener('click', () => {
//   // editFormValidator.clearForm();
//   openPopup(popupEditProfile);
//   jobInput.value = profileStatus.textContent;
//   nameInput.value = profileName.textContent;
// });

// popupAddButtonOpenElement.addEventListener('click', () => {
//   openPopup(popupAddElement);
//   addCardFormValidator.clearForm();
// });
// //

// // Функция закрытия на крестик и оверле

// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup_open')) {
//       closePopup(popup)
//     }
//     if (evt.target.classList.contains('popup__btn_effect_close')) {
//       closePopup(popup)
//     }    
//   })
// });

// // Заполнение формы профиля
// editForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   profileName.textContent = nameInput.value;
//   profileStatus.textContent = jobInput.value;

//   closePopup(popupEditProfile)
// });

// // Заполнение формы карточки
// addCardForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const item = {
//     name: fieldCardName.value,
//     link: fieldCardProfession.value
//   }

//   const cardElement = createCard(item);
//   elementList.prepend(cardElement);

//   closePopup(popupAddElement);

//   evt.target.reset();
// });

// //Карточки
// const elementList = document.querySelector('.elements'); 
// const elementTemplate = '.element-tamplate' 

// // Функция создания карточки

// function createCard(cardData) {
//   const card = new Card(cardData, elementTemplate);
//   const cardElement = card.createCard();
//   return cardElement
// };

// initialCards.forEach((item) => {
//   const cardElement = createCard(item);
//   elementList.prepend(cardElement);
// });


// console.log(initialCards);







// // Функция открытия попапа
// export function openPopup(popup) {
//   popup.classList.add('popup_open');
//   document.addEventListener('keydown', handleEscape); 
// };

// // Функция закрытия попапа
// function closePopup(popup) {
// popup.classList.remove('popup_open')
// document.removeEventListener('keydown', handleEscape);
// };

// // Функция закрытия попап Esc
// function handleEscape(evt) {
// if (evt.key === 'Escape') {
//   const openPopup = document.querySelector('.popup_open')
//   closePopup(openPopup);
// }  
// };
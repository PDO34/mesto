//Карточки
const elementList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-tamplate').content;
//Профиль
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
//Попап редактирование профиля
const popupEditProfile = document.querySelector('#editProfile');
const popupEditOpenBtnProfile = document.querySelector('.profile__edit-btn');
const popupEditCloseBtnProfile = popupEditProfile.querySelector('.popup__btn_effect_close');
const popupEditSubmitBtnForm = popupEditProfile.querySelector('#editForm');
//Попап картинки при нажатии
const popupImage = document.querySelector('#image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__text');
const popupImageClose = popupImage.querySelector('.popup__btn_effect_close');
//Попап добавления карточки
const popupAddElement = document.querySelector('#addElement');
const popupAddButtonOpenElement = document.querySelector('.profile__add-btn');
const popupAddButtonCloseElement = popupAddElement.querySelector('.popup__btn_effect_close');
const popupAddSubmitElement = popupAddElement.querySelector('#addForm');
// Попапы
const popups = document.querySelectorAll('.popup');

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

//Начальные карточки
initialCards.reverse().forEach(elem => renderElement(createElement(elem.name, elem.link)));

//Функция добавления карточек(element)
function createElement(name, link) {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__title').textContent = name
  element.querySelector('.element__image').src = link
  element.querySelector('.element__image').alt = `фото ${name}`

  element.querySelector('.element__btn').addEventListener('click', likeClick);
  element.querySelector('.element__btn-del').addEventListener('click', elementDel);
  element.querySelector('.element__image').addEventListener('click', () => {
    takeImagePopup(), openPopupForm(popupImage)
  });
  return element
};

//Функция добавление карточек
function renderElement(element) {
  elementList.prepend(element)
};

//Функция открытие попапа
function openPopupForm(selector) {
  selector.classList.add('popup_open')
  selector.addEventListener('click', () => overlayClosePopup(selector))
  document.addEventListener('keydown', () => escClosePopup(selector))
};

//Функция закрытия попапа
function closePopupForm(selector) {
  selector.classList.remove('popup_open')
};

// Функция Лайк
function likeClick(event) {
  event.target.classList.toggle('element__btn_action_active');
};

//Функция Удаления карточки
function elementDel(event) {
  event.target.closest('.element').remove();
};

//Функция очистки полей попапа
function cleanBoxPopup (selector) {
  selector.reset();
}

//Перенос в попап с изображением
function takeImagePopup() {
  text = event.target.closest('.element').querySelector('.element__title').textContent
  popupImagePicture.src = event.target.src
  popupImagePicture.alt = `фото ${text}`
  popupImageText.textContent = text
};

//Функция переноса из профиля в попап
function transferEditPopup(selector) {
  selector.profileName.value = profileName.textContent;
  selector.profileStatus.value = profileStatus.textContent;
};

//Функция переноса из попапа в профиль
function transferPopupProfile(selector) {
  profileName.textContent = selector.profileName.value
  profileStatus.textContent = selector.profileStatus.value
};

// Функция закрытия попап Esc
function escClosePopup(selector) {
  if (event.key == 'Escape') {
    closePopupForm(selector);
  }
  return
};

// Функция закрытия попапа Overlay
function overlayClosePopup(selector) {
  if (event.target == event.currentTarget) {
    closePopupForm(selector)
  }
  return
};

//"Слушаем"
popupImageClose.addEventListener('click', () => closePopupForm(popupImage));

popupEditOpenBtnProfile.addEventListener('click', () => { transferEditPopup(popupEditSubmitBtnForm), openPopupForm(popupEditProfile) });
popupEditCloseBtnProfile.addEventListener('click', () => closePopupForm(popupEditProfile));
popupEditSubmitBtnForm.addEventListener('submit', () => {
  event.preventDefault();
  closePopupForm(popupEditProfile);
  transferPopupProfile(popupEditSubmitBtnForm);
});

popupAddButtonOpenElement.addEventListener('click', () => { cleanBoxPopup(popupAddSubmitElement), openPopupForm(popupAddElement) });
popupAddButtonCloseElement.addEventListener('click', () => closePopupForm(popupAddElement));
popupAddSubmitElement.addEventListener('submit', () => {
  event.preventDefault();
  closePopupForm(popupAddElement);
  renderElement(createElement(popupAddSubmitElement.placeName.value, popupAddSubmitElement.placeLink.value));
});
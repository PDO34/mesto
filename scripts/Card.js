import { openPopup } from './index.js';

const popupImage = document.querySelector('.popup_type_photo');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__text');

export class Card {
  constructor(item, elementTemplate) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = elementTemplate;
    // this._template = document.querySelector(this._cardSelector).content.querySelector('.element')
  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  //Действия с карточками
  _getCard() {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardText = this._cardElement.querySelector('.element__title');
    this._deleteBtn = this._cardElement.querySelector('.element__btn-del');
    this._likeBtn = this._cardElement.querySelector('.element__btn');

    return this._cardElement
  }

  createCard() {
    this._getCard();
    this._cardImage.src = this._link;
    this._cardText.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => { this._likeCard() });
    this._deleteBtn.addEventListener('click', () => { this._deleteCard() });
    // Открытие картинки по клику на картинку
    this._cardImage.addEventListener('click', () => {
      openPopup(popupImage)

      popupImagePicture.src = this._link
      popupImageText.textContent = this._name
      popupImagePicture.alt = this._name
    });
  }
    // Ставим и удаляем лайк
  _likeCard() {
    this._likeBtn.classList.toggle('element__btn_action_active')
  };
    // Удаление карточки
  _deleteCard() {
    this._cardElement.remove();
  };

}

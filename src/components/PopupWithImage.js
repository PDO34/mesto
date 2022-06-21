import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    _popupImageElement = this._popupElement.querySelector('.popup__image');
    _popupImageСaptionElement = this._popupElement.querySelector('.popup__text');

  open(item) {
    this._popupImageСaptionElement.textContent = item.name;
    this._popupImageElement.src = item.link;
    this._popupImageElement.alt = `${item.name}. Фотография`;

    super.open();
  }
}
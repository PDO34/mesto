export default class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popupElement.classList.add('popup_open');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popupElement.classList.remove('popup_open');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      this._popupElement.addEventListener('click', event => {
        if (event.target.classList.contains('popup_open') || event.target.classList.contains('popup__btn_effect_close')) {
          this.close();
        };
      });
    }
  }
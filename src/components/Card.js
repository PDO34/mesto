export default class Card {
    constructor(cardData, cardTemplateSelector, handleCardClick) {
        this._cardNameData = cardData.name;
        this._cardLinkData = cardData.link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
    }

    // копируем темплейт в DOM
    _getTemplate() {
        return document
        .querySelector(this._cardTemplateSelector) //селектор для карточки
        .content
        .querySelector('.element')
        .cloneNode(true);
    }

    // генерируем карточку, наполняем содержимым
    generateCard() {
        this._cardElement = this._getTemplate();

        this._cardTitleElement = this._cardElement.querySelector('.element__title');
        this._cardTitleElement.textContent = this._cardNameData;

        this._cardImageElement = this._cardElement.querySelector('.element__image');
        this._cardImageElement.src = this._cardLinkData;
        this._cardImageElement.alt = `${this._cardNameData}. Фотография`;

        this._likeButtonElement = this._cardElement.querySelector('.element__btn');

        this._setEventListeners();

        return this._cardElement;
    }

    //устанавливаем слушателей
    _setEventListeners() {

        //слушатель на картинку для открытия попапа
        this._cardImageElement.addEventListener('click', () => {
            this._handleCardClick();
        });

        //слушатель на кнопку лайка
        this._likeButtonElement.addEventListener('click', () => {
            this._handleLikeButton();
        });

        //слушатель для удаления карточки (корзина)
      this._cardElement.querySelector('.element__btn-del').addEventListener('click', () => {
        this._removeCard();
      });
    }

    _handleLikeButton() {
        this._likeButtonElement.classList.toggle('element__btn_action_active');
    }

    _removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }
}
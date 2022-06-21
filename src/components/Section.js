export default class Section {
    constructor({items, renderer}, containerSelector) {
      this._items = items; // массив данных, которые нужно добавить на страницу при инициализации класса;
      this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице;
      this._containerElement = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы.
    }
  
    // отвечает за отрисовку всех элементов
    renderItems() {
      this._items.forEach(item => {
        this._renderer(item);
      });
    }
  
    // принимает DOM-элемент и добавляет его в контейнер.
    addItemAppend(item) {
      this._containerElement.append(item);
    }
  
    addItemPrepend(item) {
      this._containerElement.prepend(item);
    }
  }
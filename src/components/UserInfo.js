export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector}) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._profileNameElement.textContent,
      userAbout: this._profileAboutElement.textContent
    }
  }

  // Принимает новые данные пользователя, добавляет их на страницу
  setUserInfo({userName, userAbout}) {
    this._profileNameElement.textContent = userName;
    this._profileAboutElement.textContent = userAbout;
  }
}
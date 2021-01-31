const refs = {
  language: document.querySelector('.languages'),
  languageRu: document.querySelector('.ru__icon'),
  languageEn: document.querySelector('.en__icon'),
  Languages: {
    RUSSIAN: 'ru-RU',
    ENGLISH: 'en-EN',
  },
  registrationOverlayRef: document.querySelector('.modal__overlay'),
  userLogin: document.querySelector('.user__login'),
  userAccount: document.querySelector('.user__account'),
  wrapperMenuRef: document.querySelector('.menu__list'),

  mainLink: document.querySelector('.mainLink'),
  headerLogoLink: document.querySelector('.header-logo-link'),

  /**Burger menu for mobile and tablet */
  // userMenuRef: document.querySelector('.user__menu'),
  // menuBtnRef: document.getElementById('menu__btn'),
};

export default refs;

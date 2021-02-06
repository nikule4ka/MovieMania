const refs = {
  language: document.querySelector('.languages'),
  languageRu: document.querySelector('.ru__icon'),
  languageEn: document.querySelector('.en__icon'),

  registrationOverlayRef: document.querySelector('.modal__overlay'),
  userLogin: document.querySelector('.user__login'),
  userAccount: document.querySelector('.user__account'),
  wrapperMenuRef: document.querySelector('.menu__list'),
  containerMenuRef: document.querySelector('.wrapper'),

  mainLink: document.querySelector('.mainLink'),
  headerLogoLink: document.querySelector('.header-logo-link'),

  /**Burger menu for mobile and tablet */
  // userMenuRef: document.querySelector('.user__menu'),
  // menuBtnRef: document.getElementById('menu__btn'),
  listMovies: document.querySelector('.list_movies'),
  paginationRef: document.getElementById('pagination'),
  cardMovies: document.querySelector('.main_card'),

  mainContainer: document.querySelector('.main.container'),
  footerTeam: document.querySelector('.footer_copyright.team'),

  homeRef: document.querySelector('.icons__header__home'),
  //choicesContainerRef: document.querySelector('.clear__choices'),
};

export default refs;

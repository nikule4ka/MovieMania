import firebase from '@firebase/app';
import '@firebase/auth';
import fetchApi from '../services/apiService';
import refs from './refs';
import constData from './constData';
import userMenuRu from '../templates/header/dropDownMenu.hbs';
import userMenuEn from '../templates/header/dropDownMenuEn.hbs';
import userFilmsList from './userFilmsByStatus';
import getLanguage from '../js/language-localstorage';
import interests from './showUserInterest';
import main from './main';

refs.userAccount.addEventListener('click', openDropDownMenu);

function openDropDownMenu() {
  if (refs.userAccount.classList.contains('menu__open')) {
    refs.wrapperMenuRef.innerHTML = '';
    refs.userAccount.classList.toggle('menu__open');
    refs.wrapperMenuRef.classList.toggle('menu__list--animate');
    return;
  }

  const languageRu = getLanguage() === constData.Languages.RUSSIAN;

  if (languageRu) {
    refs.wrapperMenuRef.insertAdjacentHTML('beforeend', userMenuRu());
    refs.userAccount.classList.toggle('menu__open');
  } else {
    refs.wrapperMenuRef.insertAdjacentHTML('beforeend', userMenuEn());
    refs.userAccount.classList.toggle('menu__open');
  }

  document.body.addEventListener('click', closeDropDownMenu);

  const userMenuRefs = {
    logOutRef: document.querySelector('.user__logout'),
    userInterests: document.querySelectorAll('.user__item__js'),
  };

  userMenuRefs.userInterests.forEach(interes =>
    interes.addEventListener('click', userFilmsList.userFilmsList),
  );

  refs.wrapperMenuRef.classList.toggle('menu__list--animate');
  userMenuRefs.logOutRef.addEventListener('click', logOut);
}

function logOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Sign-out successful');
      refs.userAccount.classList.toggle('menu__open');
      refs.wrapperMenuRef.classList.toggle('menu__list--animate');
      refs.wrapperMenuRef.innerHTML = '';
      constData.userData = [];
      main.mainInit();
      fetchApi.setLocation(`#`);
    })
    .catch(error => {
      console.log(error);
    });
  refs.userLogin.classList.remove('is-hidden');
  refs.userAccount.classList.add('is-hidden');
}

//refs.mainLink.addEventListener('click', onClickMainLink);
refs.headerLogoLink.addEventListener('click', onClickMainLink);

function onClickMainLink(e) {
  e.preventDefault();
  fetchApi.setLocation('#/');
}

function closeDropDownMenu() {
  const getMenuAttribute = refs.containerMenuRef.getAttribute('aria-expanded');
  if (getMenuAttribute === 'false') {
    refs.containerMenuRef.setAttribute('aria-expanded', true);
  } else {
    refs.containerMenuRef.setAttribute('aria-expanded', false);
    refs.wrapperMenuRef.innerHTML = '';
    refs.userAccount.classList.remove('menu__open');
    refs.wrapperMenuRef.classList.remove('menu__list--animate');
    document.body.removeEventListener('click', closeDropDownMenu);
  }
}

/**Burger menu for mobile and tablet */

// refs.menuRef.addEventListener('click', onClickMenu);

// function onClickMenu(e) {
//   e.preventDefault();
//   if (refs.menuRef.classList.contains('open')) {
//     refs.menuRef.classList.remove('open');
//     refs.menuRef.classList.add('close');
//     refs.userMenuRef.innerHTML = '';
//   } else {
//     refs.menuRef.classList.remove('close');
//     refs.menuRef.classList.add('open');
//     refs.userMenuRef.insertAdjacentHTML('beforeend', userMenu());
//   }
// }

import firebase from '@firebase/app';
import '@firebase/auth';
import fetchApi from '../services/apiService';
import refs from './refs';
import constData from './constData';
import main from './main';
import userMenu from '../templates/header/dropDownMenu.hbs';

function logOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Sign-out successful');
      refs.wrapperMenuRef.innerHTML = '';
      refs.userAccount.classList.toggle('menu__open');
      refs.wrapperMenuRef.classList.toggle('menu__list--animate');
      constData.userData = [];
      main.getMovie();
    })
    .catch(error => {
      // An error happened.
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

refs.userAccount.addEventListener('click', openDropDownMenu);

function openDropDownMenu() {
  if (refs.userAccount.classList.contains('menu__open')) {
    refs.wrapperMenuRef.innerHTML = '';
    refs.userAccount.classList.toggle('menu__open');
    refs.wrapperMenuRef.classList.toggle('menu__list--animate');
    return;
  }

  refs.wrapperMenuRef.insertAdjacentHTML('beforeend', userMenu());

  refs.userAccount.classList.toggle('menu__open');

  const userMenuRefs = {
    logOutRef: document.querySelector('.user__logout'),
    menuListRef: document.querySelector('.menu__list'),
  };

  userMenuRefs.menuListRef.classList.toggle('menu__list--animate');

  userMenuRefs.logOutRef.addEventListener('click', logOut);
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

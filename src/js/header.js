import fetchApi from '../services/apiService';
import refs from './refs';
import userMenu from '../templates/header/dropDownMenu.hbs';

refs.mainLink.addEventListener('click', onClickMainLink);
refs.headerLogoLink.addEventListener('click', onClickMainLink);

function onClickMainLink(e) {
  e.preventDefault();
  fetchApi.setLocation('#/');
}

refs.userAccount.addEventListener('click', openDropDownMenu);

function openDropDownMenu() {
  refs.userAccount.insertAdjacentHTML('beforeend', userMenu());
  // console.log(userMenu());

  const menuListRef = document.querySelector('.menu__list');
  menuListRef.classList.toggle('menu__list--animate');
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

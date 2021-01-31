import firebase from '@firebase/app';
import '@firebase/auth';
import refs from './refs';
import constData from './constData';
import main from './main';

// refs.userAccount.addEventListener('click', logOut);
// refs.userAccount.addEventListener('click', userMenu);

// function logOut() {
//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       console.log('Sign-out successful');
//       constData.userData = [];
//       main.getMovie();
//     })
//     .catch(error => {
//       // An error happened.
//       console.log(error);
//     });
//   refs.userLogin.classList.remove('is-hidden');
//   refs.userAccount.classList.add('is-hidden');
// }

// function userMenu(e) {
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

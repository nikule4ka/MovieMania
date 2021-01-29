import firebase from '@firebase/app';
import '@firebase/auth';
import refs from './refs';

refs.userAccount.addEventListener('click', logOut);

function logOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Sign-out successful');

      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
      console.log(error);
    });
  refs.userLogin.classList.remove('is-hidden');
  refs.userAccount.classList.add('is-hidden');
}

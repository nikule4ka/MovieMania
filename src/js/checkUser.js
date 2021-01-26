import firebase from '../services/firebase';
import '@firebase/auth';
import refs from './refs';
import loginRegForm from '../templates/loginRegForm.hbs';
import submitForm from './submitRegLogForm';
import showModal from './showModal';

refs.userLogin.addEventListener('click', checkUser);

function checkUser() {
  firebase.auth().onAuthStateChanged(function () {
    showModal(loginRegForm());
    const modalRef = document.querySelector('.login-html');
    modalRef.classList.remove('is-hidden');
    const formRef = document.querySelector('.form__submit');
    formRef.addEventListener('submit', submitForm);
    refs.userLogin.removeEventListener;
  });
}

// firebase
//   .auth()
//   .signOut()
//   .then(() => {
//     // Sign-out successful.
//   })
//   .catch(error => {
//     // An error happened.
//     console.log(error);
//   });

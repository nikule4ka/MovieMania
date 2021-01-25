import firebase from '../services/firebase';
import refs from './refs';
import regForm from '../templates/registration-form.hbs';
import submitForm from './registration';

refs.userLogin.addEventListener('click', checkUser);

function checkUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
    } else {
      refs.registrationOverlayRef.insertAdjacentHTML('afterbegin', regForm());
      // const { modalRef, formRef } = formRefs;
      const modalRef = document.querySelector('.login-html');
      modalRef.classList.remove('is-hidden');
      const formRef = document.querySelector('.form__submit');

      formRef.addEventListener('submit', submitForm);
    }
  });
}

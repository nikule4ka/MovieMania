import refs from './refs';
import loginRegForm from '../templates/loginRegForm.hbs';
import submitRegForm from './submitRegForm';
import { submitLogForm } from './submitLogForm';
import constData from './constData';
import showModal from './showModal';

refs.userLogin.addEventListener('click', checkUser);

function checkUser() {
  constData.instance = showModal(loginRegForm());
  const modalRef = document.querySelector('.login-html');
  modalRef.classList.remove('is-hidden');
  const signInRef = document.querySelector('.sign-in');
  const signUpRef = document.querySelector('.sign-up');
  const regFormRef = document.querySelector('.form__sign__up');
  const loginFormRef = document.querySelector('.form__sing__in');

  signInRef.checked = true;
  loginFormRef.addEventListener('submit', submitLogForm);

  signUpRef.addEventListener('click', () => {
    signUpRef.checked = true;
    signInRef.checked = false;
    regFormRef.addEventListener('submit', submitRegForm);
    loginFormRef.removeEventListener('submit', submitLogForm);
  });

  signInRef.addEventListener('click', () => {
    signInRef.checked = true;
    signUpRef.checked = false;
    loginFormRef.addEventListener('submit', submitLogForm);
    regFormRef.removeEventListener('submit', submitRegForm);
  });
}

export default checkUser;

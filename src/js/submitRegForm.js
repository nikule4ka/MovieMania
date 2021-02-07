import { registration } from './services/firebase';

import constData from './constData';

export default function submitRegForm(event) {
  event.preventDefault();

  const instance = constData.instance;

  const passwordRef = document.querySelector('.password__sign__up');
  const emailRef = document.querySelector('.email__sign__up');

  registration(emailRef.value, passwordRef.value);

  instance.close();
  constData.instance = '';
}

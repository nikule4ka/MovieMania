import { login } from '../services/firebase';
import constData from './constData';
import refs from './refs';
import init from '../services/firebase';

export async function submitLogForm(event) {
  event.preventDefault();

  const instance = constData.instance;
  const loginEmailRef = document.querySelector('.email__sign__in');
  const loginPasRef = document.querySelector('.password__sign__in');

  login(loginEmailRef.value, loginPasRef.value);
  // init();
  instance.close();
  constData.instance = '';
}

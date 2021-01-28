import firebase from '@firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { registration } from '../services/firebase';
import init from '../services/firebase';

import constData from './constData';

export default function submitRegForm(event) {
  event.preventDefault();

  const instance = constData.instance;

  // const usernameRef = document.querySelector('.username__sign__up');
  const passwordRef = document.querySelector('.password__sign__up');
  const emailRef = document.querySelector('.email__sign__up');

  registration(emailRef.value, passwordRef.value);
  init();

  instance.close();
  constData.instance = '';
}

import firebase from '../services/firebase';
import 'firebase/database';
import 'firebase/auth';

import constData from './constData';
import refs from './refs';

export default function submitRegForm(event) {
  event.preventDefault();

  const instance = constData.instance;
  console.log(instance);
  console.log(event);

  const usernameRef = document.querySelector('.username__sign__up');
  const passwordRef = document.querySelector('.password__sign__up');
  const emailRef = document.querySelector('.email__sign__up');

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailRef.value, passwordRef.value)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      //   console.log(user.uid);
      //   user.displayName = usernameRef.value;
      //   console.log(user.displayName);

      function writeUserData(userId, name) {
        firebase
          .database()
          .ref('users/' + userId)
          .set({
            username: name,
          });
      }

      refs.userLogin.classList.add('is-hidden');
      refs.userAccount.classList.remove('is-hidden');

      writeUserData(user.uid, usernameRef.value);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

  instance.close();
  constData.instance = '';
}

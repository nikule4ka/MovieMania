import firebase from '../services/firebase';
import 'firebase/database';
import 'firebase/auth';
import constData from './constData';
import refs from './refs';

export default function submitLogForm(event) {
  event.preventDefault();

  const instance = constData.instance;
  const loginEmailRef = document.querySelector('.email__sign__in');
  const loginPasRef = document.querySelector('.password__sign__in');

  console.dir(loginEmailRef.value);
  console.dir(loginPasRef.value);

  firebase
    .auth()
    .signInWithEmailAndPassword(loginEmailRef.value, loginPasRef.value)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      var userId = user.uid;

      refs.userLogin.classList.add('is-hidden');
      refs.userAccount.classList.remove('is-hidden');

      var ref = firebase.database().ref('/users/' + userId);

      ref.on(
        'value',
        function (snapshot) {
          const userInfo = snapshot.val();
          console.log(userInfo);
          console.log(userInfo.username);
        },
        function (error) {
          console.log('Error: ' + error.code);
        },
      );
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      /**add notification for error */
    });

  instance.close();
  constData.instance = '';
}

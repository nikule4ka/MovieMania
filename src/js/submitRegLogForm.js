import firebase from '../services/firebase';
import 'firebase/database';

export default function submitForm(event) {
  event.preventDefault();
  const usernameRef = document.querySelector('.username');
  const passwordRef = document.querySelector('.password__sign__up');
  const emailRef = document.querySelector('.email');
  const signInRef = document.querySelector('.sign-in');
  const signUpRef = document.querySelector('.sign-up');

  console.log(signInRef.checked);
  console.log(signUpRef.checked);

  if (signInRef.checked) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  if (signUpRef.checked) {
    // console.log(signUpRef.checked);
    // console.log(passwordRef.value);
    // console.log(emailRef.value);
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

        writeUserData(user.uid, usernameRef.value);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });

    return;
  }
}

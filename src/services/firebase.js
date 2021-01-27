import firebase from '@firebase/app';
import '@firebase/analytics';
import '@firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyDxhL1yChcVJg9Bh5SNQIDffedtmC-aqsQ',
  authDomain: 'filmo-mania.firebaseapp.com',
  databaseURL: 'https://filmo-mania-default-rtdb.firebaseio.com',
  projectId: 'filmo-mania',
  storageBucket: 'filmo-mania.appspot.com',
  messagingSenderId: '344881823410',
  appId: '1:344881823410:web:f403c34ee2c35adf5653ab',
  measurementId: 'G-EBY8MDBS7Y',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebase
//   .auth()
//   .setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return firebase.auth().signInWithEmailAndPassword(email, password);
//   })
//   .catch(error => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode);
//     console.log(errorMessage);
//   });

export default firebase;

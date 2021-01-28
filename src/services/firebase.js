import firebase from '@firebase/app';
import '@firebase/analytics';
import '@firebase/auth';
import refs from '../js/refs';
import { getUserData } from '../js/getSetUserData';

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

async function addUser({ user }) {
  try {
    const { uid, email } = user;
    const db = firebase.database();
    const users = db.ref('users');
    users.child(uid).set({ email: email });
  } catch {
    console.error('user add failed');
  }
}

export async function registration(email, password) {
  try {
    const auth = firebase.auth();
    const user = await auth.createUserWithEmailAndPassword(email, password);
    await addUser(user);
  } catch {
    alert('User with this e-mail already exists');
  }
}

export async function login(email, password) {
  try {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password);
    refs.userLogin.classList.add('is-hidden');
    refs.userAccount.classList.remove('is-hidden');
  } catch {
    console.log(errorMessage);
  }
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    init();

    refs.userLogin.classList.add('is-hidden');
    refs.userAccount.classList.remove('is-hidden');
  } else {
    refs.userLogin.classList.remove('is-hidden');
    refs.userAccount.classList.add('is-hidden');
  }
});

const getListings = function () {
  const currentUserId = firebase.auth().currentUser.uid;

  const listingsRef = firebase
    .database()
    .ref('users/' + currentUserId + '/userFilms/currentStatusFilm');
  return listingsRef.once('value');
};

let currentSnapshot;

function loadListing() {
  getListings().then(setListing, showError);
}

function setListing(snapshot) {
  currentSnapshot = snapshot.val();
  console.log(currentSnapshot);
}

function showError(e) {
  console.log(e);
}

export default function init() {
  loadListing();
}

// export default firebase;

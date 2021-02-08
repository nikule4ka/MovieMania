import firebase from '@firebase/app';
import '@firebase/analytics';
import '@firebase/auth';
import refs from '../refs';
import { getListings } from '../getSetUserData';
import constData from '../constData';
import main from '../main';
import notification from '../notification';
import getLanguage from '../changeLanguage';
import { getUserName } from '../getSetUserData';

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

async function addUser({ user }, username) {
  try {
    const { uid, email } = user;
    const db = firebase.database();
    const users = db.ref('users');
    users.child(uid).set({ email: email, username: username });
  } catch {
    console.error('user add failed');
  }
}

export async function registration(email, password, username) {
  try {
    const auth = firebase.auth();
    const user = await auth.createUserWithEmailAndPassword(email, password);
    await addUser(user, username);
  } catch {
    const languageRu = getLanguage() === constData.Languages.RUSSIAN;
    if (languageRu) {
      notification.errorNotifications(
        'Пользователь с таким e-mail уже существует',
      );
    } else {
      notification.errorNotifications('User with this e-mail already exists');
    }
  }
}

export async function login(email, password) {
  try {
    const auth = firebase.auth();
    await auth.signInWithEmailAndPassword(email, password);
    getUserName().then(snapshot => {
      const userInfo = snapshot.val();
      const languageRu = getLanguage() === constData.Languages.RUSSIAN;
      if (languageRu) {
        notification.successNotifications(`Вы вошли как ${userInfo.username}`);
      } else {
        notification.successNotifications(
          `You are signed as ${userInfo.username}`,
        );
      }
    });

    refs.userLogin.classList.add('is-hidden');
    refs.userAccount.classList.remove('is-hidden');
  } catch {
    const languageRu = getLanguage() === constData.Languages.RUSSIAN;
    if (languageRu) {
      notification.errorNotifications(
        'Пользователя с таким e-mail не существует',
      );
    } else {
      notification.errorNotifications('User with this e-mail no exists');
    }
  }
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    getListings().then(snapshot => {
      constData.userData = snapshot.val();

      if (
        window.location.href.includes('watched') ||
        window.location.href.includes('favorites')
      ) {
        constData.router.render();
      } else {
        main.changeUserInterests(constData.userData);
      }
    });

    refs.userLogin.classList.add('is-hidden');
    refs.userAccount.classList.remove('is-hidden');
  } else {
    refs.userLogin.classList.remove('is-hidden');
    refs.userAccount.classList.add('is-hidden');
  }
});

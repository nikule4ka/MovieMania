import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

export async function getListings() {
  const currentUserId = getCurrentUser();
  const listingsRef = firebase
    .database()
    .ref('users/' + currentUserId + '/userFilms/currentStatusFilm');
  return listingsRef.once('value');
}

export function getCurrentUser() {
  const currentUserId = firebase.auth().currentUser.uid;
  return currentUserId;
}

const userData = { getListings, getCurrentUser };

export default userData;

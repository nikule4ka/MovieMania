import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import constData from './constData';

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

export function getStatusMovieById(id) {
  const findFilm = constData.userData.find(el => Number(el.id) === Number(id));

  if (findFilm === undefined) {
    return constData.wathedFilms;
  }

  return findFilm;
}

const userData = { getListings, getCurrentUser, getStatusMovieById };

export default userData;

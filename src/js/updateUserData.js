import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import wathedData from './constData';
import { getListings, getCurrentUser } from './getSetUserData';
import showInterests from './showUserInterest';
import main from './main';

function setStatusFilm(movieId, status) {
  getListings().then(
    snapshot => {
      let getUserData = snapshot.val();

      let currentStatusFilm = addFilm(getUserData, movieId, status);

      wathedData.userData = currentStatusFilm;

      main.changeUserInterests(wathedData.userData);

      const currentUserId = getCurrentUser();

      firebase
        .database()
        .ref(/users/ + currentUserId + /userFilms/)
        .set({ currentStatusFilm });
    },
    error => console.log(error),
  );
}

export async function filmStatus(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'I') {
    return;
  }
  const idFilm = e.target.dataset.id;
  const statusFilm = e.target.dataset.status;

  await setStatusFilm(idFilm, statusFilm);
}

function addFilm(getUserData, movieId, status) {
  if (getUserData === null) {
    getUserData = [];
  }

  let newWatchedData = getUserData.find(el => {
    return el.id === movieId;
  });

  if (newWatchedData === undefined) {
    newWatchedData = { id: movieId, ...wathedData.wathedFilms };
  }

  const userMovieKeys = Object.keys(newWatchedData);

  userMovieKeys.forEach(el => {
    if (el === status) {
      newWatchedData[status] = !newWatchedData[status];
    }
  });

  let indexNumber = getUserData.findIndex(el => {
    return el.id === movieId;
  });

  if (indexNumber === -1) {
    getUserData.push(newWatchedData);
  } else {
    getUserData.splice(indexNumber, 1, newWatchedData);
  }

  return getUserData;
}

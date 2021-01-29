import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import wathedData from './constData';
import { getListings, getCurrentUser } from './getSetUserData';

function setStatusFilm(movieId, status) {
  getListings().then(
    snapshot => {
      let getUserData = snapshot.val();

      let currentStatusFilm = addFilm(getUserData, movieId, status);

      const currentUserId = getCurrentUser();

      firebase
        .database()
        .ref(/users/ + currentUserId + /userFilms/)
        .set({ currentStatusFilm });
    },
    error => console.log(error),
  );

  // function getUserInfo(snapshot) {
  //   let getUserData = snapshot.val();
  //   console.log(getUserData);
  //   return getUserData;
  // }
  // const perParsetest = localStorage.getItem('wathedFilms');
  // let parseTest = JSON.parse(perParsetest);

  // console.log(parseTest);

  // console.log(setUserData);
}

export async function filmStatus(e) {
  e.preventDefault();

  const idFilm = e.target.dataset.id;
  const statusFilm = e.target.dataset.status;

  await setStatusFilm(idFilm, statusFilm);
  // console.log(currentStatusFilm);

  // localStorage.setItem('wathedFilms', JSON.stringify(currentStatusFilm));

  // const userId = firebase.auth().currentUser.uid;
  // firebase
  //   .database()
  //   .ref(/users/ + userId + /userFilms/)
  //   .set({ currentStatusFilm });
}

function addFilm(getUserData, movieId, status) {
  if (getUserData === null) {
    getUserData = [];
  }

  let newWatchedData = getUserData.find(el => {
    return el.movieId === movieId;
  });

  if (newWatchedData === undefined) {
    newWatchedData = { movieId, ...wathedData.wathedFilms };
  }

  const test = Object.keys(newWatchedData);

  test.forEach(el => {
    if (el === status) {
      newWatchedData[status] = !newWatchedData[status];
    }
  });

  let indexNumber = getUserData.findIndex(el => {
    return el.movieId === movieId;
  });

  if (indexNumber === -1) {
    getUserData.push(newWatchedData);
  } else {
    getUserData.splice(indexNumber, 1, newWatchedData);
  }

  return getUserData;
}

import firebase from '../services/firebase';
import '@firebase/auth';
import '@firebase/database';
import wathedData from './constData';
// import { getUserData } from './getSetUserData';
import { setUserData } from './getSetUserData';

function setStatusFilm(movieId, status) {
  console.log(setUserData());
  // const currentUserId = firebase.auth().currentUser.uid;

  // const ref = firebase
  //   .database()
  //   .ref('users/' + currentUserId + '/userFilms/currentStatusFilm');

  // ref.on(
  //   'value',
  //   function (snapshot) {
  //     getUserData(snapshot.val());
  //     // console.log(snapshot.val());
  //   },
  //   function (error) {
  //     console.log('Error: ' + error.code);
  //   },
  // );
  // const perParsetest = localStorage.getItem('wathedFilms');
  let parseTest = setUserData();

  console.log(parseTest);

  // console.log(setUserData);

  if (parseTest === null) {
    parseTest = [];
  }

  let newWatchedData = parseTest.find(el => {
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

  let indexNumber = parseTest.findIndex(el => {
    return el.movieId === movieId;
  });

  if (indexNumber === -1) {
    parseTest.push(newWatchedData);
  } else {
    parseTest.splice(indexNumber, 1, newWatchedData);
  }

  return parseTest;
}

export async function filmStatus(e) {
  e.preventDefault();

  const idFilm = e.target.dataset.id;
  const statusFilm = e.target.dataset.status;

  const currentStatusFilm = await setStatusFilm(idFilm, statusFilm);

  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(/users/ + userId + /userFilms/)
    .set({ currentStatusFilm });
}

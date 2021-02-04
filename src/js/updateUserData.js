import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import wathedData from './constData';
import { getListings, getCurrentUser } from './getSetUserData';
import main from './main';
import checkUser from './checkUser';

function setStatusFilm(movieId, status) {
  getListings().then(
    snapshot => {
      let getUserData = snapshot.val();

      let currentStatusFilm = addFilm(getUserData, movieId, status);

      wathedData.userData = currentStatusFilm;

      if (
        location.hash.includes('favorites') ||
        location.hash.includes('watched')
      ) {
        wathedData.router.render();
      }

      main.changeUserInterests(wathedData.userData);

      const currentUserId = getCurrentUser();

      firebase
        .database()
        .ref(/users/ + currentUserId + /userFilms/)
        .set({ currentStatusFilm });
    },
    error => checkUser(),
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

  const filmAtribute = addInfoToFilm(movieId);

  const filmInfo = getUserData.map(el => {
    if (Number(el.id) === Number(filmAtribute.id)) {
      return {
        ...el,
        poster_path: filmAtribute.poster,
        vote_average: filmAtribute.vote,
        title: filmAtribute.title,
        release_date: filmAtribute.release,
      };
    }
    return el;
  });

  return filmInfo;
}

function addInfoToFilm(filmId) {
  const films = document.querySelectorAll('.card');
  const findCurrentFilm = Object.values(films);

  const currentFilm = findCurrentFilm.find(film => {
    if (filmId === film.dataset.id) {
      return film;
    }
  });

  return currentFilm.dataset;
}

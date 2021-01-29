import movieMarkup from '../templates/movieMarkup.hbs';
import { filmStatus } from './updateUserData';

const refs = {
  listMovies: document.querySelector('.list_movies'),
};

export default function showMovie(data) {
  /**map for information from firebase */
  refs.listMovies.innerHTML = '';
  refs.listMovies.insertAdjacentHTML('beforeend', movieMarkup(data));

  const statusListFilm = document.querySelectorAll('.status__film__js');
  // const watchLaterListRef = document.querySelectorAll('.watch__later__list');
  // const watchedListRef = document.querySelectorAll('.watched__list');

  statusListFilm.forEach(statusFilm =>
    statusFilm.addEventListener('click', filmStatus),
  );

  // watchLaterListRef.forEach(watchLaterFilm =>
  //   watchLaterFilm.addEventListener('click', updateUserInfo.setStatusFilm),
  // );

  // watchedListRef.forEach(watchedFilm =>
  //   watchedFilm.addEventListener('click', updateUserInfo.setStatusFilm),
  // );
}

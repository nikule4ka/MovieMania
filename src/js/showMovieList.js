import movieMarkup from '../templates/movieMarkup.hbs';
import { filmStatus } from './updateUserData';

import refs from './refs';

export default function showMovie(data) {
  refs.listMovies.innerHTML = '';
  refs.listMovies.insertAdjacentHTML('beforeend', movieMarkup(data));

  const statusListFilm = document.querySelectorAll('.status__film__js');

  statusListFilm.forEach(statusFilm =>
    statusFilm.addEventListener('click', filmStatus),
  );
}

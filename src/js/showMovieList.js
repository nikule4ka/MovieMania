import movieMarkup from '../templates/movieMarkup.hbs';
import { filmStatus } from './updateUserData';
import fetchApi from '../services/apiService';

const refs = {
  listMovies: document.querySelector('.list_movies'),
};

export default function showMovie(data) {
  refs.listMovies.innerHTML = '';
  refs.listMovies.insertAdjacentHTML('beforeend', movieMarkup(data));

  const imgListFilms = document.querySelectorAll('.card-img-top');

  imgListFilms.forEach(imgFilm =>
    imgFilm.addEventListener('click', onCLickImgFilm),
  );

  const statusListFilm = document.querySelectorAll('.status__film__js');

  statusListFilm.forEach(statusFilm =>
    statusFilm.addEventListener('click', filmStatus),
  );
}

function onCLickImgFilm(e) {
  e.preventDefault();

  const id = e.target.dataset.id;

  fetchApi.setLocation(`#/movie/${id}`);
}

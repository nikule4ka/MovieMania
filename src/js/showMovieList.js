import movieMarkup from '../templates/movieMarkup.hbs';

const refs = {
  listMovies: document.querySelector('.list_movies'),
};

export default function showMovie(data) {
  refs.listMovies.innerHTML = '';
  refs.listMovies.insertAdjacentHTML('beforeend', movieMarkup(data));
}

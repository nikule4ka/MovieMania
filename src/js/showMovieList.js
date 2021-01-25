import movieMarkup from '../templates/movieMarkup.hbs';
import showMovieCard from './showMovieCard';

const refs = {
  listMovies: document.querySelector('.list_movies'),
};

refs.listMovies.addEventListener('click', onCardClick);

function onCardClick(e) {
  e.preventDefault();

  if (e.target.nodeName === 'BUTTON') {
    return;
  }
  //   console.dir(e.target.nodeName);
  showMovieCard(e.target.dataset.id);
}

export default function showMovie(data) {
  refs.listMovies.insertAdjacentHTML('beforeend', movieMarkup(data));
  //return markup;
}

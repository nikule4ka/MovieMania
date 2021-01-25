import movieMarkup from '../templates/movieMarkup.hbs';
import showMovieCard from './showMovieCard';

const refs = {
  main: document.querySelector('.main'),
};

refs.main.addEventListener('click', onCardClick);

function onCardClick(e) {
  e.preventDefault();

  if (e.target.nodeName === 'BUTTON') {
    return;
  }
  //   console.dir(e.target.nodeName);
  showMovieCard(e.target.dataset.id);
}

export default function showMovie(data) {
  refs.main.insertAdjacentHTML('beforeend', movieMarkup(data));
  //return markup;
}

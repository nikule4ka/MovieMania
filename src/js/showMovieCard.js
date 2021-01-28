import fetchApi from '../services/apiService';

import movieMarkupCard from '../templates/movieMarkupCard.hbs';
import actors from '../templates/movieCard/actors.hbs';
import reviews from '../templates/movieCard/reviews.hbs';
import trailers from '../templates/movieCard/trailers.hbs';

const refs = {
  cardMovies: document.querySelector('.main_card'),
};

function openTab(evt) {
  evt.preventDefault();
  const target = evt.target;
  if (target.nodeName !== 'BUTTON') {
    return;
  }
  const tabName = target.dataset.tabname;

  // Get all elements with class="tabcontent" and hide them
  const tabcontent = document.getElementsByClassName(
    'movie__markup__tabcontent',
  );
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  const tablinks = document.getElementsByClassName('movie__markup__tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

export default function showMovieCard(id) {
  fetchApi.fetchMovieId(id).then(data => {
    if (data.poster_path === null) {
      data.poster_path = './images/no-movie.jpg';
    } else {
      data.poster_path = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
    }
    // data.poster_path = './public/no-movie.jpg';
    data.release_date = data.release_date.split('-').reverse().join('/');

    refs.cardMovies.innerHTML = '';
    refs.cardMovies.insertAdjacentHTML('beforeend', movieMarkupCard(data));

    const movieMarkupTab = document.querySelector('.movie__markup__tab');

    movieMarkupTab.addEventListener('click', openTab);
    document.getElementById('defaultOpen').click();

    addExtensions(data.credits.cast, 'actors', actors);
    addExtensions(data.reviews.results, 'reviews', reviews);
    addExtensions(data.videos.results, 'trailers', trailers);
  });
}

function addExtensions(dataExt, idExt, template) {
  if (dataExt.length === 0) {
    dataExt === false;
  }
  document
    .getElementById(idExt)
    .insertAdjacentHTML('beforeend', template(dataExt));
}

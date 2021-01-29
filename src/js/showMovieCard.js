import fetchApi from '../services/apiService';

import movieMarkupCard from '../templates/movieMarkupCard.hbs';
import actors from '../templates/movieCard/actors.hbs';
import reviews from '../templates/movieCard/reviews.hbs';
import trailers from '../templates/movieCard/trailers.hbs';

import noPosterImg from '../images/no-movie.jpg';
import noActorImg from '../images/no-actor.jpg';

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
    tablinks[i].className = tablinks[i].className.replace(
      ' tablinks__active',
      '',
    );
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';

  target.className += ' tablinks__active';
}

export default function showMovieCard(id) {
  fetchApi
    .fetchMovieId(id)
    .then(data => {
      if (data.poster_path === null) {
        data.poster_path = noPosterImg;
      } else {
        data.poster_path = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
      }

      data.release_date = data.release_date.slice(0, 4);

      let str = data.genres
        .reduce((acc, el) => (acc = acc + el.name + ', '), '')
        .trim();
      data.allGenres = str.substring(0, str.length - 1);
      str = data.production_countries
        .reduce((acc, el) => (acc = acc + el.name + ', '), '')
        .trim();
      data.allCountries = str.substring(0, str.length - 1);

      refs.cardMovies.innerHTML = '';
      refs.cardMovies.insertAdjacentHTML('beforeend', movieMarkupCard(data));

      const movieMarkupTab = document.querySelector('.movie__markup__tab');

      movieMarkupTab.addEventListener('click', openTab);
      document.getElementById('defaultOpen').click();

      const actorsData = data.credits.cast.map(el => {
        if (el.profile_path === null) {
          el.profile_path = noActorImg;
        } else {
          el.profile_path = 'https://image.tmdb.org/t/p/w500' + el.profile_path;
        }
        return el;
      });
      addExtensions(actorsData, 'actors', actors);
      addExtensions(data.reviews.results, 'reviews', reviews);
      addExtensions(data.videos.results, 'trailers', trailers);

      window.scrollTo(0, 0);
    })
    .catch(error => console.log(error));
}

function addExtensions(dataExt, idExt, template) {
  if (dataExt.length === 0) {
    dataExt === false;
  }
  document
    .getElementById(idExt)
    .insertAdjacentHTML('beforeend', template(dataExt));
}

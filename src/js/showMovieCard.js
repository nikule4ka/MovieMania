import fetchApi from '../services/apiService';

import movieMarkupCard from '../templates/movieMarkupCard.hbs';
import actors from '../templates/movieCard/actors.hbs';
import reviews from '../templates/movieCard/reviews.hbs';
import trailers from '../templates/movieCard/trailers.hbs';

import noPosterImg from '../images/no-movie.jpg';
import noActorImg from '../images/no-actor.jpg';

import { filmStatus } from './updateUserData';
import { getStatusMovieById } from './getSetUserData';
import interests from './showUserInterest';

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

      data.allGenres = data.genres
        .reduce((acc, el) => (acc = [...acc, el.name]), [])
        .join(', ');

      data.allCountries = data.production_countries
        .reduce((acc, el) => (acc = [...acc, el.name]), [])
        .join(', ');

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

      const reviewsData = data.reviews.results.map(el => {
        const dateCreat = el.created_at;
        let newDate = '';

        if (dateCreat !== null) {
          const year = dateCreat.slice(0, 4);
          const month = dateCreat.slice(5, 7);
          const day = dateCreat.slice(8, 10);

          newDate = `${day} ${month} ${year}`;
        }
        el.created_at = newDate;

        return el;
      });
      addExtensions(reviewsData, 'reviews', reviews);

      addExtensions(data.videos.results, 'trailers', trailers);
      window.scrollTo(0, 0);

      return data;
    })
    .then(filmCard => {
      const statusListFilm = document.querySelectorAll('.status__film__js');

      statusListFilm.forEach(statusFilm =>
        statusFilm.addEventListener('click', filmStatus),
      );

      changeInterestsOnCard(filmCard);
    })
    .catch(error => console.log(error));
}

export function changeInterestsOnCard(card) {
  const statusMovieById = getStatusMovieById(card.id);

  card.favorites = statusMovieById['favorites'];
  card.watched = statusMovieById['watched'];
  card.watchedLater = statusMovieById['watchedLater'];

  interests.showInterestsOnCard(card);
}

function addExtensions(dataExt, idExt, template) {
  if (dataExt.length === 0) {
    dataExt === false;
  }
  document
    .getElementById(idExt)
    .insertAdjacentHTML('beforeend', template(dataExt));
}

import fetchApi from '../services/apiService';
import errorMessage from '../templates/errorMessage.hbs';
import pageLoader from '../templates/pageLoader.hbs';

import constData from './constData';
import pagination from './pagination';
import showMovie from './showMovieList';
import showModal from './showModal';
import { getStatusMovieById } from './getSetUserData';
import interests from './showUserInterest';

import noPosterImg from '../images/no-movie.jpg';

const refs = {
  paginationRef: document.getElementById('pagination'),
  listMovies: document.querySelector('.list_movies'),
};

refs.paginationRef.addEventListener('click', onPaginationsBtnClick);
let instance = '';

function onPaginationsBtnClick() {
  const currentPage = pagination.getCurrentPage();
  fetchApi.setPage(currentPage);
  const queryString = fetchApi.getQueryString();
  const param = fetchApi.getParam();

  switch (queryString) {
    case constData.queryString.BY_NAME:
      fetchApi.setLocation(`#/query/${param}/page/${currentPage}`);
      break;
    case constData.queryString.BY_GANRE:
      fetchApi.setLocation(`#/genres/${param}/page/${currentPage}`);
      break;
    case constData.queryString.FAVORITES:
      fetchApi.setLocation(`#/favorites/${currentPage}`);
      break;
    case constData.queryString.WATCHED:
      fetchApi.setLocation(`#/watched/${currentPage}`);
      break;
    case constData.queryString.WATCHED_LATER:
      fetchApi.setLocation(`#/wathedLater/${currentPage}`);
      break;
    default:
      fetchApi.setLocation(`#/page/${currentPage}`);
  }
}

function getMovie() {
  instance = showModal(pageLoader());
  window.scrollTo(0, 0);

  fetchApi
    .getMovieData()
    .then(({ results, total_results }) => {
      pagination.setTotalItems(Number(total_results));
      pagination.reset();
      pagination.movePageTo(fetchApi.getPage());

      results.map(el => {
        if (el.poster_path === null) {
          el.poster_path = noPosterImg;
        } else {
          el.poster_path = 'https://image.tmdb.org/t/p/w500' + el.poster_path;
        }

        el.release_date =
          el.release_date === undefined ? '' : el.release_date.slice(0, 4);

        return el;
      });

      showMovie(results);
      return results;
    })
    .then(filmInformation => {
      changeUserInterests(filmInformation);
    })
    .catch(error => {
      refs.listMovies.innerHTML = '';
      refs.listMovies.insertAdjacentHTML('beforeend', errorMessage(error));
    })
    .finally(() => {
      if (instance !== '') instance.close();
    });
}

function changeUserInterests(filmInformation) {
  filmInformation.map(el => {
    const statusMovieById = getStatusMovieById(el.id);

    el.favorites = statusMovieById['favorites'];
    el.watched = statusMovieById['watched'];
    el.watchedLater = statusMovieById['watchedLater'];

    return el;
  });

  interests.showInterests(filmInformation);
}

function mainInit(
  setQueryString = constData.queryString.POPULAR,
  page = 1,
  param = '',
) {
  fetchApi.setQueryString(setQueryString);
  fetchApi.setPage(page);
  fetchApi.setParam(param);

  pagination.movePageTo(page);

  getMovie();
}

export default { mainInit, getMovie, changeUserInterests };

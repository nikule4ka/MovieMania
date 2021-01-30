import fetchApi from '../services/apiService';
import сonstData from '../js/constData';
import pagination from '../js/pagination';

import showMovie from './showMovieList';

import noPosterImg from '../images/no-movie.jpg';

import { getStatusMovieById } from './getSetUserData';
import interests from './showUserInterest';
import CONST_DATA from '../js/constData';

const refs = {
  paginationRef: document.getElementById('pagination'),
};

refs.paginationRef.addEventListener('click', onPaginationsBtnClick);

function onPaginationsBtnClick() {
  const currentPage = pagination.getCurrentPage();
  fetchApi.setPage(currentPage);
  const queryString = fetchApi.getQueryString();
  const param = fetchApi.getParam();

  switch (queryString) {
    case сonstData.queryString.BY_NAME:
      fetchApi.setLocation(`#/query/${param}/page/${currentPage}`);
      break;
    case сonstData.queryString.BY_GANRE:
      fetchApi.setLocation(`#/genres/${param}/page/${currentPage}`);
      break;
    default:
      fetchApi.setLocation(`#/page/${currentPage}`);
  }

  getMovie();

  window.scrollTo(0, 0);
}

function getMovie() {
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
    .catch(error => console.log(error));
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
  setQueryString = сonstData.queryString.POPULAR,
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

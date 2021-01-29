import fetchApi from '../services/apiService';
import getConstData from '../js/constData';
import pagination from '../js/pagination';

import showMovie from './showMovieList';

import noPosterImg from '../images/no-movie.jpg';

const refs = {
  paginationRef: document.getElementById('pagination'),
};

refs.paginationRef.addEventListener('click', onPaginationsBtnClick);

function onPaginationsBtnClick() {
  const currentPage = pagination.getCurrentPage();
  fetchApi.setPage(currentPage);
  fetchApi.setLocation('#/page/' + currentPage);

  getMovie();

  window.scrollTo(0, 0);
}

function getMovie(param = '') {
  fetchApi.getMovieData(param).then(({ results, total_results }) => {
    pagination.setTotalItems(Number(total_results));
    // pagination.reset(total_results);
    // console.log(total_results);
    // console.log(pagination.totalItems);

    results.map(el => {
      if (el.poster_path === null) {
        el.poster_path = noPosterImg;
      } else {
        el.poster_path = 'https://image.tmdb.org/t/p/w500' + el.poster_path;
      }

      el.release_date = el.release_date.slice(0, 4);

      return el;
    });

    showMovie(results);
  });
}

function mainInit(id = 1) {
  fetchApi.setQueryString(getConstData.queryString.POPULAR);
  pagination.movePageTo(id);
  fetchApi.setPage(id);
  getMovie();
}

export default { mainInit, getMovie };

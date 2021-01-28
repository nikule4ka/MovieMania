import fetchApi from '../services/apiService';
import getConstData from '../js/constData';
import pagination from '../js/pagination';

import showMovie from './showMovieList';

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

function getMovie() {
  fetchApi.setQueryString(getConstData.queryString.POPULAR);
  fetchApi.getMovieData().then(({ results, total_results }) => {
    pagination.setTotalItems(total_results);

    showMovie(results);
  });
}

function mainInit(id = 1) {
  pagination.movePageTo(id);
  fetchApi.setPage(id);
  getMovie();
}
export default { mainInit, getMovie };

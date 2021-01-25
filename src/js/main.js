import fetchApi from '../services/apiService';

import showMovie from './showMovieList';
import loadMoreBtn from './loadMoreButton';

const refs = {
  btnViewMoreRef: document.querySelector('button[data-action="load more"]'),
};

refs.btnViewMoreRef.addEventListener('click', onPaginationsBtnClick);

function getMovie() {
  loadMoreBtn.disable();
  fetchApi.fetchTrending().then(({ results }) => {
    if (results.length === 0) loadMoreBtn.btnViewMoreOff();

    fetchApi.page += 1;
    showMovie(results);
    loadMoreBtn.enable();
  });
}

function onPaginationsBtnClick() {
  getMovie();
}

fetchApi.reset();
getMovie();

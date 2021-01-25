import fetchApi from '../services/apiService';
import showMovie from './showMovieList';

function getMovie() {
  fetchApi.fetchTrending().then(({ results }) => showMovie(results));
}

getMovie();

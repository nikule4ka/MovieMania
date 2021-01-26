import modalShow from './modalShow';
import fetchApi from '../services/apiService';
import movieMarkupCard from '../templates/movieMarkupCard.hbs';

export default function showMovieCard(id) {
  fetchApi.fetchMovieId(id).then(data => {
    const {
      title,
      id,
      original_title,
      genres,
      release_date,
      poster_path,
      vote_average,
      overview,
    } = data;
    modalShow(movieMarkupCard());
  });

  //alert('Карточка ' + id);
  // modalShow(`<p class="modalDiv">${id}</p>`);
}

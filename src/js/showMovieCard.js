import fetchApi from '../services/apiService';
import movieMarkupCard from '../templates/movieMarkupCard.hbs';

const refs = {
  cardMovies: document.querySelector('.main_card'),
};

export default function showMovieCard(id) {
  fetchApi.fetchMovieId(id).then(data => {
    console.log(data);

    refs.cardMovies.innerHTML = '';
    refs.cardMovies.insertAdjacentHTML('beforeend', movieMarkupCard(data));

    //showModal(movieMarkupCard());
  });
}

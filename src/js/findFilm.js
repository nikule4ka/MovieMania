import fetchApi from '../services/apiService';
import getConstData from './constData';
import getMovie from './main';
import Choices from 'choices.js';

const refs = {
  submitSearch: document.querySelector('.search__films'),
  getByNameRef: document.querySelector('.search_films_name'),
  getByGenresRef: document.querySelector('.search_films_genres'),
  inputNameRef: document.querySelector('.name'),
  choicesContainerRef: document.querySelector('.clear__choices'),
};

refs.getByNameRef.addEventListener('click', onFindByNameClick);
refs.getByGenresRef.addEventListener('click', onFindByGenresClick);
refs.submitSearch.addEventListener('submit', searchFilmByQuery);

function onFindByGenresClick(e) {
  if (refs.getByGenresRef.classList.contains('active__search')) {
    return;
  }

  refs.inputNameRef.classList.add('is-hidden');
  refs.choicesContainerRef.classList.remove('is-hidden');
  refs.getByGenresRef.classList.add('active__search');
  refs.getByNameRef.classList.remove('active__search');
  refs.choicesContainerRef.innerHTML =
    ' <select id="my-select" class="genres is-hidden" multiple type="search"></select > ';

  const choicesRef = document.querySelector('.genres');

  fetchApi
    .fetchGanres()
    .then(({ genres }) =>
      genres.map(genre => {
        console.log(genre.id);
        return { value: genre.id, label: genre.name };
      }),
    )
    .then(data => {
      choicesRef.choices = new Choices(choicesRef, {
        maxItemCount: 5,
        removeItemButton: true,
        choices: data,
      });
    });
}

function onFindByNameClick(e) {
  refs.inputNameRef.classList.remove('is-hidden');
  refs.choicesContainerRef.classList.add('is-hidden');
  refs.getByGenresRef.classList.remove('active__search');
  refs.getByNameRef.classList.add('active__search');
  refs.choicesContainerRef.innerHTML = '';
}

function searchFilmByQuery(e) {
  e.preventDefault();

  if (refs.getByNameRef.classList.contains('active__search')) {
    const query = refs.inputNameRef.value;
    if (query.trim() !== '') {
      fetchApi.setQueryString(getConstData.queryString.BY_NAME);
      getMovie.getMovie(refs.inputNameRef.value);
    }
    return;
  }

  if (refs.getByGenresRef.classList.contains('active__search')) {
    const getChoices = refs.choicesRef.querySelectorAll('option');

    const arrayChoices = Object.values(getChoices);

    const listGenre = arrayChoices.reduce((acc, choice) => {
      const genreValue = choice.attributes.value.value;
      const genres = [...acc, ...genreValue];
      return genres.join(',');
    }, []);

    arrayChoices.map(el => console.log(el.attributes.value.value));

    fetchApi.setQueryString(getConstData.queryString.BY_GANRE);
    getMovie.getMovie(listGenre);
    const clearChoices = document.querySelector('.choices__list--multiple');

    clearChoices.innerHTML = '';

    return;
  }
}

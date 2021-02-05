import fetchApi from '../services/apiService';
import inputChoice from './inputChoice';
import getLocalLanguage from './language-localstorage';
import constData from './constData';

import findHeaderRU from '../templates/header/findHeaderRU.hbs';
import findHeaderEN from '../templates/header/findHeaderEN.hbs';

let refs = {
  searchFilmsTitle: document.querySelector('.search__films__title'),
};

function showFindHeader() {
  const currentLanguageRu = getLocalLanguage() === constData.Languages.RUSSIAN;
  refs.searchFilmsTitle.innerHTML = '';
  let currentHbs = findHeaderEN();
  if (currentLanguageRu) {
    currentHbs = findHeaderRU();
  }
  refs.searchFilmsTitle.insertAdjacentHTML('beforeend', currentHbs);

  refs = {
    submitSearch: document.querySelector('.search__films'),
    getByNameRef: document.querySelector('.search_films_name'),
    getByGenresRef: document.querySelector('.search_films_genres'),
    getByActorsRef: document.querySelector('.search_films_actors'),
    searchFilmsBy: document.querySelector('.search__films_by'),
    searchGenres: document.querySelector('.search__genres'),
    btnSearchForm: document.querySelector('.btn__search_form'),
    searchString: document.querySelector('.search__string'),
    searchFilmsTitle: document.querySelector('.search__films__title'),
  };

  refs.getByNameRef.addEventListener('click', onFindByNameClick);
  refs.getByGenresRef.addEventListener('click', onFindByGenresClick);
  refs.getByActorsRef.addEventListener('click', onFindByActorsClick);
  refs.submitSearch.addEventListener('submit', searchFilmByQuery);
}

showFindHeader();

function createGanresList() {
  const selectRef = document.querySelector('[data-multi-select-plugin]');
  selectRef.innerHTML = '';

  fetchApi
    .fetchGanres()
    .then(({ genres }) =>
      genres.map(genre => {
        return { value: genre.id, label: genre.name };
      }),
    )
    .then(data => {
      data.forEach(el =>
        inputChoice.addOption('[data-multi-select-plugin]', el.label, el.value),
      );
    });
}

function onFindByGenresClick(e) {
  if (refs.getByGenresRef.classList.contains('active__search')) {
    return;
  }

  refs.searchFilmsBy.classList.add('is-hidden');
  refs.searchGenres.classList.remove('is-hidden');

  refs.getByNameRef.classList.remove('active__search');
  refs.getByGenresRef.classList.add('active__search');
  refs.getByActorsRef.classList.remove('active__search');

  createGanresList();
  refs.searchGenres.focus();
}

function onFindByNameClick(e) {
  refs.searchFilmsBy.classList.remove('is-hidden');
  refs.searchGenres.classList.add('is-hidden');

  refs.getByNameRef.classList.add('active__search');
  refs.getByGenresRef.classList.remove('active__search');
  refs.getByActorsRef.classList.remove('active__search');

  refs.searchString.focus();
}

function onFindByActorsClick(e) {
  refs.searchFilmsBy.classList.remove('is-hidden');
  refs.searchGenres.classList.add('is-hidden');

  refs.getByNameRef.classList.remove('active__search');
  refs.getByGenresRef.classList.remove('active__search');
  refs.getByActorsRef.classList.add('active__search');

  refs.searchString.focus();
}

function searchFilmByQuery(e) {
  e.preventDefault();

  if (refs.getByGenresRef.classList.contains('active__search')) {
    const getChoices = document.querySelectorAll('.selected-label');
    if (getChoices.length === 0) {
      return;
    }
    const listGenre = Array.from(getChoices)
      .reduce((acc, choice) => [...acc, choice.dataset.id], [])
      .join(',');

    fetchApi.setLocation(`#/genres/${listGenre}/page/1`);

    // const wrapper = refs.searchGenres;
    // const select = wrapper.querySelector('select');
    // const getChoicesRemove = wrapper.querySelectorAll('.selected-close');
    // getChoicesRemove.forEach(el => inputChoice.removeTokemEl(el));

    // const dropdown = wrapper.querySelector('.dropdown-icon');
    // dropdown.classList.toggle('active');
    // inputChoice.clearAutocompleteList(select);

    // const input_search = wrapper.querySelector('.selected-input');
    // const languageRu = getLocalLanguage() === constData.Languages.RUSSIAN;
    // input_search.setAttribute(
    //   'placeholder',
    //   languageRu ? constData.placeholder.RU : constData.placeholder.EN,
    // );

    refs.btnSearchForm.focus();
    return;
  }

  const query = refs.searchString.value.trim();
  if (query === '') {
    return;
  }

  if (refs.getByNameRef.classList.contains('active__search')) {
    fetchApi.setLocation(`#/query/${query}/page/1`);
    //refs.searchString.value = '';
    return;
  }

  if (refs.getByActorsRef.classList.contains('active__search')) {
    fetchApi.setLocation(`#/actors/${query}/page/1`);
    //refs.searchString.value = '';
    return;
  }
}

export default { createGanresList, showFindHeader };

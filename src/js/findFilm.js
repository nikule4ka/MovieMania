import fetchApi from '../services/apiService';
import inputChoice from './inputChoice';
import refs from './refs';
import getLocalLanguage from './language-localstorage';
import constData from './constData';

refs.getByNameRef.addEventListener('click', onFindByNameClick);
refs.getByGenresRef.addEventListener('click', onFindByGenresClick);
refs.submitSearch.addEventListener('submit', searchFilmByQuery);

export default function createGanresList() {
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

  refs.getByGenresRef.classList.add('active__search');
  refs.getByNameRef.classList.remove('active__search');

  createGanresList();
}

function onFindByNameClick(e) {
  refs.searchFilmsBy.classList.remove('is-hidden');
  refs.searchGenres.classList.add('is-hidden');

  refs.getByGenresRef.classList.remove('active__search');
  refs.getByNameRef.classList.add('active__search');
}

function searchFilmByQuery(e) {
  e.preventDefault();

  if (refs.getByNameRef.classList.contains('active__search')) {
    const inputNameRef = refs.searchFilmsBy.querySelector('.name');
    const query = inputNameRef.value.trim();
    if (query !== '') {
      fetchApi.setLocation(`#/query/${query}/page/1`);
      inputNameRef.value = '';
    }
    return;
  }

  if (refs.getByGenresRef.classList.contains('active__search')) {
    const getChoices = document.querySelectorAll('.selected-label');
    const listGenre = Array.from(getChoices)
      .reduce((acc, choice) => [...acc, choice.dataset.id], [])
      .join(',');

    fetchApi.setLocation(`#/genres/${listGenre}/page/1`);

    const wrapper = refs.searchGenres;
    const select = wrapper.querySelector('select');
    const getChoicesRemove = wrapper.querySelectorAll('.selected-close');
    getChoicesRemove.forEach(el => inputChoice.removeTokemEl(el));

    const dropdown = wrapper.querySelector('.dropdown-icon');
    dropdown.classList.toggle('active');
    inputChoice.clearAutocompleteList(select);

    const input_search = wrapper.querySelector('.selected-input');
    const languageRu = getLocalLanguage() === constData.Languages.RUSSIAN;
    input_search.setAttribute(
      'placeholder',
      languageRu ? constData.placeholder.RU : constData.placeholder.EN,
    );

    return;
  }
}

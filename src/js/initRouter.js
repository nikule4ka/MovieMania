import Router from './Router';
import main from './main';
import constData from './constData';
import showMovieCard from './showMovieCard';
import interests from './userFilmsByStatus';
import getLocalLanguage from './language-localstorage';
import inputChoice from './inputChoice';

const router = new Router({
  mode: 'hash',
  root: '/',
});

const mainList = document.querySelector('.main_list');
const mainCard = document.querySelector('.main_card');

function clearSearchString() {
  const searchString = document.querySelector('.search__string');
  searchString.value = '';

  const wrapper = document.querySelector('.search__genres');
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
}

function hideCard() {
  mainCard.classList.add('is-hidden');
  mainList.classList.remove('is-hidden');
}

router
  .add(/movie\/(.*)/, id => {
    mainList.classList.add('is-hidden');
    mainCard.classList.remove('is-hidden');
    showMovieCard(id);
  })
  .add(/query\/(.*)\/page\/(.*)/, (query, page) => {
    hideCard();
    main.mainInit(constData.queryString.BY_NAME, page, query);
  })
  .add(/actors\/(.*)\/page\/(.*)/, (query, page) => {
    hideCard();
    main.mainInit(constData.queryString.BY_ACTORS, page, query);
  })
  .add(/genres\/(.*)\/page\/(.*)/, (genre, page) => {
    hideCard();
    main.mainInit(constData.queryString.BY_GANRE, page, genre);
  })
  .add(/page\/(.*)/, page => {
    clearSearchString();
    hideCard();
    main.mainInit(constData.queryString.POPULAR, page);
  })
  .add(/favorites\/(.*)/, page => {
    clearSearchString();
    hideCard();
    interests.interestsInnit(constData.queryString.FAVORITES, page);
  })
  .add(/watched\/(.*)/, page => {
    clearSearchString();
    hideCard();
    interests.interestsInnit(constData.queryString.WATCHED, page);
  })
  .add(/watchedLater\/(.*)/, page => {
    clearSearchString();
    hideCard();
    interests.interestsInnit(constData.queryString.WATCHED_LATER, page);
  })
  .add('', () => {
    clearSearchString();
    hideCard();
    main.mainInit();
  });

constData.router = router;

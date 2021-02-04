import Router from './Router';
import main from './main';
import constData from './constData';
import showMovieCard from './showMovieCard';
import interests from './userFilmsByStatus';

const router = new Router({
  mode: 'hash',
  root: '/',
});

const mainList = document.querySelector('.main_list');
const mainCard = document.querySelector('.main_card');

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
    hideCard();
    main.mainInit(constData.queryString.POPULAR, page);
  })
  .add(/favorites\/(.*)/, page => {
    hideCard();
    interests.interestsInnit(constData.queryString.FAVORITES, page);
  })
  .add(/watched\/(.*)/, page => {
    hideCard();
    interests.interestsInnit(constData.queryString.WATCHED, page);
  })
  .add(/watchedLater\/(.*)/, page => {
    hideCard();
    interests.interestsInnit(constData.queryString.WATCHED_LATER, page);
  })
  .add('', () => {
    hideCard();
    main.mainInit();
  });

constData.router = router;

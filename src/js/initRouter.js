import Router from './Router';
import main from './main';
import constData from './constData';
import showMovieCard from './showMovieCard';

const router = new Router({
  mode: 'hash',
  root: '/',
});

const mainList = document.querySelector('.main_list');
const mainCard = document.querySelector('.main_card');

router
  .add(/movie\/(.*)/, id => {
    mainList.classList.add('is-hidden');
    mainCard.classList.remove('is-hidden');
    showMovieCard(id);
  })
  .add(/page\/(.*)/, id => {
    mainCard.classList.add('is-hidden');
    mainList.classList.remove('is-hidden');
    main.mainInit(id);
  })
  .add('', () => {
    mainCard.classList.add('is-hidden');
    mainList.classList.remove('is-hidden');
    main.mainInit();
  });

constData.router = router;

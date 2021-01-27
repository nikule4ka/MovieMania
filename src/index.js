import './scss/main.scss';
import Router from './js/Router';
import './js/header';
import main from './js/main';
import showMovieCard from './js/showMovieCard';
import './js/footer';
// import './js/preLoaderPage';
import './js/language-localstorage';
import './js/submitRegForm';
import './js/submitLogForm';
import './js/userLogOut';
import './js/checkUser';

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
  .add('', () => {
    mainCard.classList.add('is-hidden');
    mainList.classList.remove('is-hidden');
    main();
  });

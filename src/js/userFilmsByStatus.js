import constData from './constData';
import pagination from './pagination';
import fetchApi from '../services/apiService';
import getMovie from './showMovieList';
import interestsBtn from '../templates/header/interestsBtn.hbs';
import main from './main';
import refs from './refs';

function userFilmsList(e) {
  refs.wrapperMenuRef.classList.toggle('menu__list--animate');
  refs.userAccount.classList.toggle('menu__open');
  refs.wrapperMenuRef.innerHTML = '';
  const currentInteres = e.currentTarget.dataset.status;

  fetchApi.setLocation(`#/${currentInteres}/1`);
}

function interestsInnit(status, page) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  const allFIlms = constData.userData;
  let filterFilmsByStatus = [];
  if (allFIlms !== null) {
    filterFilmsByStatus = allFIlms.filter(el => el[status]);
  }

  const perPage = 20;
  const prevPage = page - 1;

  const filmsPerPage = filterFilmsByStatus.filter((index, el) => {
    return el < page * perPage && el >= prevPage * perPage;
  });

  fetchApi.setQueryString(status);
  fetchApi.setPage(page);

  pagination.setTotalItems(filterFilmsByStatus.length);
  pagination.reset();
  pagination.movePageTo(page);

  getMovie(filmsPerPage);

  const tabContainerRef = document.querySelector('.movie__interests__tab');

  if (tabContainerRef === null) {
    const listMovies = document.querySelector('.main_list');
    listMovies.insertAdjacentHTML('afterbegin', interestsBtn());
  }

  const interestsBtns = document.querySelectorAll(
    '.movie__interests__tablinks',
  );

  interestsBtns.forEach(interestBtn =>
    interestBtn.addEventListener('click', choisenInterest),
  );

  interestsBtns.forEach(el => {
    el.classList.remove('tablinks__active');
    if (el.dataset.status === status) {
      el.classList.toggle('tablinks__active');
    }
    el.children.forEach(child => {
      child.classList.remove('icon_active');
      if (child.dataset.status === status) {
        child.classList.toggle('icon_active');
      }
    });
  });

  main.changeUserInterests(filmsPerPage);
}

function choisenInterest(e) {
  e.preventDefault();

  const target = e.target;

  if (target.nodeName !== 'BUTTON' && target.nodeName !== 'I') {
    return;
  }

  const currentInteres = e.target.dataset.status;

  if (currentInteres === 'onMain') {
    fetchApi.setLocation(`#/`);
    return;
  }

  fetchApi.setLocation(`#/${currentInteres}/1`);
}

export default { userFilmsList, interestsInnit };

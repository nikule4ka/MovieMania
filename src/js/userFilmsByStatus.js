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
  window.scrollTo(0, 0);

  const allFIlms = constData.userData;
  const filterFilmsByStatus = allFIlms.filter(el => el[status]);

  const perPage = 20;
  const prevPage = page - 1;

  const filmsPerPage = filterFilmsByStatus.filter((index, el) => {
    if (page === 1) {
      return el < perPage;
    }
    return el < page * perPage && el >= prevPage * perPage;
  });

  fetchApi.setQueryString(status);
  fetchApi.setPage(page);

  pagination.setTotalItems(filterFilmsByStatus.length);
  pagination.reset();
  pagination.movePageTo(page);

  getMovie(filmsPerPage);
  //   const listMovies = document.querySelector('.main_list');
  //   listMovies.insertAdjacentHTML('afterbegin', interestsBtn());
  main.changeUserInterests(filmsPerPage);
}

export default { userFilmsList, interestsInnit };

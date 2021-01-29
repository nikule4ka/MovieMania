import getLanguage from '../js/language-localstorage';
import getConstData from '../js/constData';

const API_KEY = '?api_key=fb4eca5dd3545235e4fd6796c70d4d40';
const MAIN_URL = 'https://api.themoviedb.org/3/';
// https://api.themoviedb.org/3/trending/movie/day?api_key=fb4eca5dd3545235e4fd6796c70d4d40
// ЖАНРЫ;
// https://api.themoviedb.org/3/genre/movie/list?api_key=fb4eca5dd3545235e4fd6796c70d4d40

//api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&sort_by=popularity.desc&with_genres=Western&page=1
//api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&with_genres=14&sort_by=popularity.desc
//http://api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&with_genres=14,1&page=1

// получить сразу и видео и картинки к фильму
// https://api.themoviedb.org/3/movie/495764?api_key=fb4eca5dd3545235e4fd6796c70d4d40&append_to_response=videos,reviews,credits

//ссылка на картинку
//'https://image.tmdb.org/t/p/w500/путь'
//если нет картинки надо чтото поставить!!!!!

async function fetchTrending() {
  const LANGUAGE = `&language=${getLanguage()}`;
  const res = await fetch(
    `${MAIN_URL}movie/popular${API_KEY}${LANGUAGE}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  // console.log(res.json());
  return res.json();
}

async function fetchMovieByGanres() {
  // ganres - список id жанров через запятую без пробелов
  const LANGUAGE = `&language=${getLanguage()}`;

  const res = await fetch(
    `${MAIN_URL}discover/movie${API_KEY}${LANGUAGE}&with_genres=${this.param}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchSearchMovie() {
  const LANGUAGE = `&language=${getLanguage()}`;
  const res = await fetch(
    `${MAIN_URL}search/movie${API_KEY}${LANGUAGE}&query=${this.param}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
}

function getMovieData() {
  const queryString = getConstData.queryString;

  if (this.queryString === queryString.BY_NAME) {
    return this.fetchSearchMovie();
  }
  if (this.queryString === queryString.BY_GANRE) {
    return this.fetchMovieByGanres();
  }
  if (this.queryString === queryString.POPULAR) {
    return this.fetchTrending();
  }

  return null;
}

async function fetchGanres() {
  const LANGUAGE = `&language=${getLanguage()}`;
  const res = await fetch(`${MAIN_URL}genre/movie/list${API_KEY}${LANGUAGE}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchMovieId(id) {
  const LANGUAGE = `&language=${getLanguage()}`;
  const res = await fetch(
    `${MAIN_URL}movie/${id}${API_KEY}${LANGUAGE}&append_to_response=videos,reviews,credits`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchVideosId(id) {
  const LANGUAGE = `&language=${getLanguage()}`;
  const res = await fetch(`${MAIN_URL}movie/${id}/videos${API_KEY}${LANGUAGE}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchCreditsId(id) {
  const LANGUAGE = `&language=${getLanguage()}`;
  const res = await fetch(
    `${MAIN_URL}movie/${id}/credits${API_KEY}${LANGUAGE}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchReviewsId(id) {
  const LANGUAGE = `&language=${getLanguage()}`;
  const res = await fetch(
    `${MAIN_URL}movie/${id}/reviews${API_KEY}${LANGUAGE}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

const fetchApi = {
  page: 1,
  queryString: '',
  param: '',
  fetchTrending, //популярные (1 страница)
  fetchSearchMovie, //поиск по названия (нужно передавать название)
  fetchMovieByGanres,
  //**список фильмов согласно выбраных жанров(айди жанров через запятую)*/
  getMovieData,

  fetchMovieId, //получить фильм по id
  fetchCreditsId, //список актеров (для получение нужен id фильма)
  fetchReviewsId, //обзоры (для получение нужен id фильма)
  fetchVideosId, //трейлеры (для получение нужен id фильма)
  fetchGanres, //полный список жанров

  reset() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  setPage(currentPage) {
    this.page = currentPage;
  },
  getPage() {
    return this.page;
  },
  setQueryString(newQueryString) {
    this.queryString = newQueryString;
  },
  getQueryString() {
    return this.queryString;
  },
  getParam() {
    return this.param;
  },
  setParam(param) {
    this.param = param;
  },
  setLocation(curLoc) {
    location.href = curLoc;
    location.hash = curLoc;
  },
};

export default fetchApi;

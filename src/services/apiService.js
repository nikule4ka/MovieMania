import getLanguage from '../js/language-localstorage';
const LANGUAGE = `&language=${getLanguage()}`;
const API_KEY = '?api_key=fb4eca5dd3545235e4fd6796c70d4d40';
const MAIN_URL = 'https://api.themoviedb.org/3/';
// https://api.themoviedb.org/3/trending/movie/day?api_key=fb4eca5dd3545235e4fd6796c70d4d40
// ЖАНРЫ;
// https://api.themoviedb.org/3/genre/movie/list?api_key=fb4eca5dd3545235e4fd6796c70d4d40

//api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&sort_by=popularity.desc&with_genres=Western&page=1
//api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&with_genres=14&sort_by=popularity.desc
//http://api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&with_genres=14,1&page=1

// получить сразу и видео и картинки к фильму
// https://api.themoviedb.org/3/movie/157336?api_key=fb4eca5dd3545235e4fd6796c70d4d40&append_to_response=videos,images

//ссылка на картинку
//'https://image.tmdb.org/t/p/w500/путь'
//если нет картинки надо чтото поставить!!!!!

async function fetchTrending() {
  const res = await fetch(
    `${MAIN_URL}movie/popular${API_KEY}${LANGUAGE}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  // console.log(res.json());
  return res.json();
}

async function fetchGanres() {
  const res = await fetch(`${MAIN_URL}genre/movie/list${API_KEY}${LANGUAGE}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchMovieByGanres({ ganres }) {
  // ganres - список id жанров через запятую без пробелов

  const res = await fetch(
    `${MAIN_URL}discover/movie${API_KEY}${LANGUAGE}&with_genres=${ganres}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchSearchMovie({ queryKey }) {
  const query = queryKey[1];
  if (query === '') {
    return '';
  }
  const res = await fetch(
    `${MAIN_URL}search/movie${API_KEY}${LANGUAGE}&query=${query}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
}

async function fetchMovieId({ queryKey }) {
  const id = queryKey[1];
  const res = await fetch(`${MAIN_URL}movie/${id}${API_KEY}${LANGUAGE}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchVideosId({ queryKey }) {
  const id = queryKey[1];
  const res = await fetch(`${MAIN_URL}movie/${id}/videos${API_KEY}${LANGUAGE}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchCreditsId({ queryKey }) {
  const id = queryKey[1];
  const res = await fetch(
    `${MAIN_URL}movie/${id}/credits${API_KEY}${LANGUAGE}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchReviewsId({ queryKey }) {
  const id = queryKey[1];
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
  fetchTrending, //популярные (1 страница)
  fetchMovieId, //получить фильм по id
  fetchCreditsId, //список актеров (для получение нужен id фильма)
  fetchReviewsId, //обзоры (для получение нужен id фильма)
  fetchSearchMovie, //поиск по названия (нужно передавать название)
  fetchVideosId, //трейлеры (для получение нужен id фильма)
  fetchGanres, //полный список жанров
  fetchMovieByGanres,
  //**список фильмов согласно выбраных жанров(айди жанровчерез запятую)*/
  reset() {
    this.page = 1;
  },
};

export default fetchApi;

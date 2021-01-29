import fetchApi from '../services/apiService';

const refs = {
  mainLink: document.querySelector('.mainLink'),
  headerLogoLink: document.querySelector('.header-logo-link'),
};

refs.mainLink.addEventListener('click', onClickMainLink);
refs.headerLogoLink.addEventListener('click', onClickMainLink);

function onClickMainLink(e) {
  e.preventDefault();
  fetchApi.setLocation('#/');
}

import refs from './refs';
import constData from './constData';

refs.language.addEventListener('click', ChangeLanguage);

removeClassForLanguage();
setClassForLanguage();

function setClassForLanguage() {
  const savedTheme = localStorage.getItem('language');

  if (savedTheme === refs.Languages.RUSSIAN) {
    refs.languageRu.classList.add('active__language');
    refs.language.classList.add(refs.Languages.RUSSIAN);
  }
  if (savedTheme === refs.Languages.ENGLISH) {
    refs.languageEn.classList.add('active__language');
    refs.language.classList.add(refs.Languages.ENGLISH);
  }

  if (savedTheme === null) {
    refs.languageRu.classList.add('active__language');
    refs.language.classList.add(refs.Languages.RUSSIAN);
    localStorage.setItem('language', refs.Languages.RUSSIAN);
  }
}

function removeClassForLanguage() {
  refs.languageEn.classList.remove('active__language');
  refs.languageRu.classList.remove('active__language');
  refs.language.classList.remove(refs.Languages.RUSSIAN);
  refs.language.classList.remove(refs.Languages.ENGLISH);
}

function ChangeLanguage(e) {
  let currentLanguage;

  if(e.target.tagName !== 'P') {
    return
  }

  if(e.target.classList.contains('active__language')) {
    console.log('click')
    return;
  }

  if (!e.target.classList.contains('active__language')) {
    removeClassForLanguage();
    e.target.classList.add('active__language');
    currentLanguage = e.target.dataset.lang;
  }

  // if (refs.language.classList.contains(refs.Languages.ENGLISH)) {
  //   removeClassForLanguage();
  //   refs.languageEn.classList.add('active__language');
  //   currentLanguage = refs.Languages.RUSSIAN;
  // }

  refs.language.classList.add(currentLanguage); 
  localStorage.setItem('language', currentLanguage);
  constData.router.render();
  getLocalLanguage();
}

export default function getLocalLanguage() {
  const savedTheme = localStorage.getItem('language');
  return savedTheme;
}

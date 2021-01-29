import refs from './refs';
import constData from './constData';

refs.language.addEventListener('click', ChangeLanguage);

setClassForLanguage();

function setClassForLanguage() {
  const savedTheme = localStorage.getItem('language');
  console.log(savedTheme);
  if (savedTheme === refs.Languages.RUSSIAN) {
    refs.languageEn.classList.add('hidden');
    refs.language.classList.add(refs.Languages.RUSSIAN);
  }
  if (savedTheme === refs.Languages.ENGLISH) {
    refs.languageRu.classList.add('hidden');
    refs.language.classList.add(refs.Languages.ENGLISH);
  }

  if (savedTheme === null) {
    refs.languageEn.classList.add('hidden');
    refs.language.classList.add(refs.Languages.RUSSIAN);
    localStorage.setItem('language', refs.Languages.RUSSIAN);
  }
}

function removeClassForLanguage() {
  refs.languageEn.classList.remove('hidden');
  refs.languageRu.classList.remove('hidden');
  refs.language.classList.remove(refs.Languages.RUSSIAN);
  refs.language.classList.remove(refs.Languages.ENGLISH);
}

function ChangeLanguage() {
  let currentLanguage;

  if (refs.language.classList.contains(refs.Languages.RUSSIAN)) {
    removeClassForLanguage();
    refs.languageRu.classList.add('hidden');
    currentLanguage = refs.Languages.ENGLISH;
  }

  if (refs.language.classList.contains(refs.Languages.ENGLISH)) {
    removeClassForLanguage();
    refs.languageEn.classList.add('hidden');
    currentLanguage = refs.Languages.RUSSIAN;
  }

  refs.language.classList.add(currentLanguage);
  localStorage.setItem('language', currentLanguage);
  constData.router.render();
  getLocalLanguage();
}

export default function getLocalLanguage() {
  const savedTheme = localStorage.getItem('language');
  return savedTheme;
}

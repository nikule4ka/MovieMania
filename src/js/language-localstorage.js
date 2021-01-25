import refs from './refs';

refs.language.addEventListener('click', ChangeLanguage);

console.dir(refs.languageEn.classList.contains('hidden'));
console.dir(refs.languageRu);

const Language = {
  RUSSIAN: 'ru_RU',
  ENGLISH: 'en_EN',
};

setClassForLanguage();

function setClassForLanguage() {
  const savedTheme = localStorage.getItem('language');
  if (savedTheme === Language.RUSSIAN) {
    refs.languageEn.classList.add('hidden');
    refs.language.classList.add(Language.RUSSIAN);
  }
  if (savedTheme === Language.ENGLISH) {
    refs.languageRu.classList.add('hidden');
    refs.language.classList.add(Language.ENGLISH);
  }
}

function removeClassForLanguage() {
  refs.languageEn.classList.remove('hidden');
  refs.languageRu.classList.remove('hidden');
  refs.language.classList.remove(Language.RUSSIAN);
  refs.language.classList.remove(Language.ENGLISH);
}

function ChangeLanguage() {
  if (refs.language.classList.contains(Language.RUSSIAN)) {
    removeClassForLanguage();
    refs.languageRu.classList.add('hidden');
    refs.language.classList.add(Language.ENGLISH);
    localStorage.setItem('language', Language.ENGLISH);
    return;
  }

  if (refs.language.classList.contains(Language.ENGLISH)) {
    removeClassForLanguage();
    refs.languageEn.classList.add('hidden');
    refs.language.classList.add(Language.RUSSIAN);
    localStorage.setItem('language', Language.RUSSIAN);
    return;
  }
}

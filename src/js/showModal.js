import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let instance = '';

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    instance.close();
  }
}

function onShowModal() {
  window.addEventListener('keydown', onEscKeyPress);
}

export default function modalShow(html) {
  console.log(html);
  instance = basicLightbox.create(html, {
    onShow: () => onShowModal(),
    onClose: window.removeEventListener('keydown', onEscKeyPress),
  });
  instance.show();
  return instance;
}

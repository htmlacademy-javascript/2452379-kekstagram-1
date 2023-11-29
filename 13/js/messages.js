import { onEscKeydownDo, onOverElementBoundsClickDo } from './utils.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const MessageTemplates = {
  ERROR: errorMessageTemplate,
  SUCCESS: successMessageTemplate,
};

let shownMessage = null;

const onEscKeydown = onEscKeydownDo(closeMessage);
const onOverElementBoundsClick = onOverElementBoundsClickDo(closeMessage, '.error__inner, .success__inner');

function closeMessage() {
  shownMessage.remove();
  shownMessage = null;
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOverElementBoundsClick);
}

const showMessage = (message, type) => {
  shownMessage = MessageTemplates[type].cloneNode(true);
  shownMessage.querySelector('h2').textContent = message;
  shownMessage
    .querySelector('button')
    .addEventListener('click', closeMessage);
  document.body.insertAdjacentElement('beforeend', shownMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOverElementBoundsClick);
};


export { showMessage };

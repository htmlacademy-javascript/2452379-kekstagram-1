import { initPictureEditor, destroyPictureEditor } from './pictureeditor.js';
import { onEscKeydownDo } from './utils.js';

const MAX_DESCRIPTION_SIZE = 140;
const MAX_HASHTAGS_COUNT = 5;
const MIN_HASHTAG_LENGTH = 1;
const MAX_HASHTAG_LENGTH = 19;

const uploadPictureForm = document.querySelector('#upload-select-image');
const pictureInput = uploadPictureForm.querySelector('#upload-file');
const pictureHashtags = uploadPictureForm.querySelector('.text__hashtags');
const pictureDescription = uploadPictureForm.querySelector('.text__description');
const closeButton = uploadPictureForm.querySelector('#upload-cancel');

const hashtagRegExp = new RegExp(`^#[a-zа-яё0-9]{${MIN_HASHTAG_LENGTH},${MAX_HASHTAG_LENGTH}}$`, 'i');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
};
const pristine = new Pristine(uploadPictureForm, pristineConfig);
pristine.validate();


const onEscKeydown = onEscKeydownDo(onCloseUploadPictureFormClick, (evt) => evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA');
function onPictureInput() {
  uploadPictureForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPictureForm.querySelector('.img-upload__preview img').src = pictureInput.value;

  document.addEventListener('keydown', onEscKeydown);

  initPictureEditor();
}
function onCloseUploadPictureFormClick() {
  uploadPictureForm.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureInput.value = '';
  pictureHashtags.value = '';
  pictureDescription.value = '';

  document.removeEventListener('keydown', onEscKeydown);

  destroyPictureEditor();
}

const validateHashtags = (value) => {
  if (!value.length) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    pristine.addError(pictureHashtags, `Не более ${MAX_HASHTAGS_COUNT} хештегов`);
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtags[i]) {
      continue;
    }
    if (hashtags[i].lastIndexOf('#') !== 0) {
      pristine.addError(pictureHashtags, 'Хештеги начинаются с # и разеляются пробелами');
      return false;
    }
    if (!hashtagRegExp.test(hashtags[i])) {
      pristine.addError(pictureHashtags, `Длина хештега ${MIN_HASHTAG_LENGTH}-${MAX_HASHTAG_LENGTH}. Нельзя использовать спецсимволы/пунктуацию/эмодзи`);
      return false;
    }
    if (hashtags.some((item, index) => item === hashtags[i] && index !== i)) {
      pristine.addError(pictureHashtags, 'Хештеги не могут повторяться');
      return false;
    }
  }

  return true;
};
const validateDescription = (value) => value.length < MAX_DESCRIPTION_SIZE;
const getHashtagsErrorText = () => {
  const errors = pristine.getErrors(pictureHashtags);
  return errors[errors.length - 1];
};
const getDescriptionErrorText = `Не более ${MAX_DESCRIPTION_SIZE} символов`;

pristine.addValidator(pictureHashtags, validateHashtags, getHashtagsErrorText);
pristine.addValidator(pictureDescription, validateDescription, getDescriptionErrorText);

pictureInput.addEventListener('input', onPictureInput);
closeButton.addEventListener('click', onCloseUploadPictureFormClick);

uploadPictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

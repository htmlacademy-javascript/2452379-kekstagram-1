import { initPictureEditor, destroyPictureEditor } from './picture-editor.js';
import { showMessage } from './messages.js';
import { onEscKeydownDo } from './utils.js';
import { sendData } from './api.js';
const FILE_TYPES = [ 'jpg', 'jpeg', 'png' ];
const MAX_DESCRIPTION_SIZE = 140;
const MAX_HASHTAGS_COUNT = 5;
const MIN_HASHTAG_LENGTH = 1;
const MAX_HASHTAG_LENGTH = 19;

const uploadPictureForm = document.querySelector('#upload-select-image');
const pictureInput = uploadPictureForm.querySelector('#upload-file');
const pictureHashtags = uploadPictureForm.querySelector('.text__hashtags');
const pictureDescription = uploadPictureForm.querySelector('.text__description');
const closeButton = uploadPictureForm.querySelector('#upload-cancel');
const uploadButton = uploadPictureForm.querySelector('#upload-submit');

const hashtagRegExp = new RegExp(`^#[a-zа-яё0-9]{${MIN_HASHTAG_LENGTH},${MAX_HASHTAG_LENGTH}}$`, 'i');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
};
const pristine = new Pristine(uploadPictureForm, pristineConfig);
pristine.validate();


const onEscKeydown = onEscKeydownDo(closeUploadForm, (evt) => evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA');

const onPictureInput = () => {
  const file = pictureInput.files[0], fileName = file.name.toLowerCase();
  if (!FILE_TYPES.some((ft) => fileName.endsWith(ft))) {
    showMessage('Неверный тип файла', 'ERROR');
    return;
  }
  const fileURL = URL.createObjectURL(file);

  uploadPictureForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPictureForm.querySelector('.img-upload__preview img').src = fileURL;

  document.addEventListener('keydown', onEscKeydown);

  initPictureEditor(fileURL);
};

function closeUploadForm() {
  uploadPictureForm.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureInput.value = '';
  pictureHashtags.value = '';
  pictureDescription.value = '';

  document.removeEventListener('keydown', onEscKeydown);

  destroyPictureEditor();
}

const validateHashtags = (value) => {
  const inputData = value.toLowerCase().trim();

  if (!inputData) {
    return true;
  }

  const hashtags = inputData.split(/\s+/);

  if (hashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: hashtags.length > MAX_HASHTAGS_COUNT,
      error: `Не более ${MAX_HASHTAGS_COUNT} хештегов`
    },
    {
      check: hashtags.some((hashtag) => hashtag.lastIndexOf('#') !== 0),
      error: 'Хештеги начинаются с # и разеляются пробелами'
    },
    {
      check: hashtags.some((hashtag) => !hashtagRegExp.test(hashtag)),
      error: `Длина хештега ${MIN_HASHTAG_LENGTH}-${MAX_HASHTAG_LENGTH}. Нельзя использовать спецсимволы/пунктуацию/эмодзи`
    },
    {
      check: hashtags.some((item, index, array) => array.includes(item, index + 1)),
      error: 'Хештеги не могут повторяться'
    }
  ];

  return rules.every((rule) => {
    if (rule.check) {
      pristine.addError(pictureHashtags, rule.error);
      return false;
    }
    return true;
  });
};
const validateDescription = (value) => value.length < MAX_DESCRIPTION_SIZE;
const getHashtagsErrorText = () => {
  const errors = pristine.getErrors(pictureHashtags);
  return pristine.getErrors(pictureHashtags)[errors.length - 1];
};
const getDescriptionErrorText = `Не более ${MAX_DESCRIPTION_SIZE} символов`;

pristine.addValidator(pictureHashtags, validateHashtags, getHashtagsErrorText);
pristine.addValidator(pictureDescription, validateDescription, getDescriptionErrorText);

pictureInput.addEventListener('input', onPictureInput);
closeButton.addEventListener('click', closeUploadForm);

uploadPictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData(evt.target);
    uploadButton.disabled = true;
    sendData(() => {
      closeUploadForm();
      showMessage('Изображение успешно загружено', 'SUCCESS');
      uploadButton.disabled = false;
    }, () => showMessage('Ошибка загрузки файла', 'ERROR'), formData);
  }
});

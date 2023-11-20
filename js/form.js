import { onEscKeydownDo } from './utils.js';

const MAX_DESCRIPTION_SIZE = 140;

const uploadPictureForm = document.querySelector('#upload-select-image');
const pictureInput = uploadPictureForm.querySelector('#upload-file');
const picturePreview = uploadPictureForm.querySelector('.img-upload__preview img');
const pictureFieldsContainer = uploadPictureForm.querySelector('.img-upload__text');
const pictureHashtags = pictureFieldsContainer.querySelector('.text__hashtags');
const pictureDescription = pictureFieldsContainer.querySelector('.text__description');
const closeButton = uploadPictureForm.querySelector('#upload-cancel');

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
};
const pristine = new Pristine(uploadPictureForm, pristineConfig);


const onEscKeydown = onEscKeydownDo(onCloseUploadPictureFormClick);
function onPictureInput() {
  uploadPictureForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  picturePreview.src = pictureInput.value;

  document.addEventListener('keydown', onEscKeydown);
}
function onCloseUploadPictureFormClick() {
  uploadPictureForm.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureInput.value = '';
  pictureHashtags.value = '';
  pictureDescription.value = '';

  document.removeEventListener('keydown', onEscKeydown);
}
function onFieldFocusin() {
  document.removeEventListener('keydown', onEscKeydown);
}
function onFieldFocusout() {
  document.addEventListener('keydown', onEscKeydown);
}

const validateHashtags = (value) => {
  if (!value.length) {
    return true;
  }

  const hashtags = value.trim().split(' ').filter((item) => item);

  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i]
      && (!(hashtags[i].lastIndexOf('#') === 0
      && hashtagRegex.test(hashtags[i])
      && !hashtags.some((item, index) => item === hashtags[i] && index !== i)))) {
      return false;
    }
  }

  return true;
};
const validateDescription = (value) => value.length < MAX_DESCRIPTION_SIZE;

pristine.addValidator(pictureDescription, validateDescription, 'huynya');
pristine.addValidator(pictureHashtags, validateHashtags, 'huynya dvajdi');

pictureInput.addEventListener('input', onPictureInput);
closeButton.addEventListener('click', onCloseUploadPictureFormClick);

pictureFieldsContainer.addEventListener('focusin', onFieldFocusin);
pictureFieldsContainer.addEventListener('focusout', onFieldFocusout);

uploadPictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});


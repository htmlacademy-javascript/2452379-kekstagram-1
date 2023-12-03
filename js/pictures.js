import { openBigPicture } from './gallery.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const renderedPictures = document.getElementsByClassName('picture');

const renderPicture = (picture) => {
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  newPicture.addEventListener('click', (evt) => {
    evt.preventDefault();

    openBigPicture(picture);
  });

  return newPicture;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(renderPicture(picture));
  });

  [...renderedPictures].forEach((picture) => picture.remove());
  picturesContainer.append(fragment);
};

export { renderPictures };

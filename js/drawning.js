import { generatedData } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

generatedData.forEach((item) => {
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector('.picture__img').src = item.url;
  newPicture.querySelector('.picture__likes').textContent = item.likes;
  newPicture.querySelector('.picture__comments').textContent = item.comments.length;

  fragment.append(newPicture);
});

picturesContainer.append(fragment);

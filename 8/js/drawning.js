import { generatedPictures, generatePicturesFragement, generateCommentsFragment } from './data.js';


const picturesContainer = document.querySelector('.pictures');
const picturesFragment = generatePicturesFragement(generatedPictures);

picturesContainer.append(picturesFragment);

const bigPicture = document.querySelector('.big-picture');

const drawBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  const commentsContainer = bigPicture.querySelector('.social__comments');
  const commentsFragment = generateCommentsFragment(photo.comments);

  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
};

export { picturesContainer, bigPicture, drawBigPicture };

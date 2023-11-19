import { isEsc } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');

const onKeydown = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeydown);
}

const generateCommentsFragment = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);

    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    fragment.append(newComment);
  });

  return fragment;
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

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

  document.addEventListener('keydown', onKeydown);
};

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };

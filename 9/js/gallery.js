import { isEsc } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');
const loadCommentsButton = document.querySelector('.comments-loader');

const onEscKeydown = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    onCloseBigPictureClick();
  }
};

function onCloseBigPictureClick() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

const updateCommentsCount = () => {
  const commentsCount = commentsContainer.children.length;
  const openedCommentsCount = commentsCount - commentsContainer.querySelectorAll('.social__comment.hidden').length;
  const updated = `${openedCommentsCount} из <span class="comments-count">${commentsCount}</span> комментариев`;

  bigPicture.querySelector('.social__comment-count').innerHTML = updated;

  if (openedCommentsCount === commentsCount) {
    loadCommentsButton.classList.add('hidden');
  }
};

function onLoadCommentsClick() {
  const hiddenComments = commentsContainer.querySelectorAll('.social__comment.hidden');
  const count = hiddenComments.length > 5 ? 5 : hiddenComments.length;

  for (let i = 0; i < count; i++) {
    hiddenComments[i].classList.remove('hidden');
  }

  updateCommentsCount();
}

const generateCommentsFragment = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment, index) => {
    const newComment = commentTemplate.cloneNode(true);

    if (index + 1 > 5) {
      newComment.classList.add('hidden');
    }

    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    fragment.append(newComment);
  });

  return fragment;
};

const openComments = (comments) => {
  const commentsFragment = generateCommentsFragment(comments);

  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');

  openComments(photo.comments);
  updateCommentsCount();

  document.addEventListener('keydown', onEscKeydown);
};

closeButton.addEventListener('click', onCloseBigPictureClick);
loadCommentsButton.addEventListener('click', onLoadCommentsClick);

export { openBigPicture };

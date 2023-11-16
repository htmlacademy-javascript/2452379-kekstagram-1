import { picturesContainer, bigPicture, drawBigPicture } from './drawning.js';
import { generatedPictures } from './data.js';
import { getPhotoByUrl, isEsc } from './utils.js';


const onKeydown = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onKeydown);
}
function openBigPicture(photo) {
  drawBigPicture(photo);
  document.addEventListener('keydown', onKeydown);
}

const closeButton = document.querySelector('.big-picture__cancel');
closeButton.addEventListener('click', closeBigPicture);


picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    const photo = getPhotoByUrl(generatedPictures, evt.target.src);

    openBigPicture(photo);
  }
});


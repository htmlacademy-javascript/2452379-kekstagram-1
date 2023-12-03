import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { showMessage } from './messages.js';
import { initGalleryFilters, filterPictures } from './gallery-filters.js';
import { debounce } from './utils.js';
import './form.js';

const RENDER_DELAY = 500;

let loadedPictures = null;

const onFilterClick = () => {
  if (loadedPictures) {
    const filteredPictures = filterPictures(loadedPictures);
    renderPictures(filteredPictures);
  }
};

getData((pictures) => {
  loadedPictures = pictures;
  initGalleryFilters(debounce(onFilterClick, RENDER_DELAY));
  renderPictures(pictures);
},
() => showMessage('Не удалось загрузить данные', 'ERROR'));

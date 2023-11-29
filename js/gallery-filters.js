const RANDOM_FILTER_COUNT = 10;

const filters = document.querySelector('.img-filters');
const FilterMethods = {
  'filter-default': (pictures) => pictures,
  'filter-random': (pictures) => {
    for (let i = pictures.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
    }

    return pictures.slice(0, RANDOM_FILTER_COUNT);
  },
  'filter-discussed': (pictures) => pictures.sort((picA, picB) => picB.comments.length - picA.comments.length)
};

let currentFilter = 'filter-default';

const changeFilter = (newFilter) => {
  filters
    .querySelector(`#${currentFilter}`)
    .classList.remove('img-filters__button--active');
  filters
    .querySelector(`#${newFilter}`)
    .classList.add('img-filters__button--active');

  currentFilter = newFilter;
};

const filterPictures = (pictures) => FilterMethods[currentFilter](pictures.slice());

const initGalleryFilters = (cb) => {
  filters.classList.remove('img-filters--inactive');

  filters.querySelector('.img-filters__form').addEventListener('click', (evt) => {
    if (evt.target.id.startsWith('filter-')) {
      changeFilter(evt.target.id);
      cb();
    }
  });
};

export { initGalleryFilters, filterPictures };

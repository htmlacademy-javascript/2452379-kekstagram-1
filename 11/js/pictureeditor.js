const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SLIDER_OPTIONS = {
  'chrome': {
    start: 1,
    range: {
      'min': 0,
      'max': 1
    },
    step: 0.1
  },
  'sepia': {
    start: 1,
    range: {
      'min': 0,
      'max': 1
    },
    step: 0.1
  },
  'marvin': {
    start: 100,
    range: {
      'min': 0,
      'max': 100
    },
    step: 1
  },
  'phobos': {
    start: 3,
    range: {
      'min': 0,
      'max': 3
    },
    step: 0.1
  },
  'heat': {
    start: 3,
    range: {
      'min': 1,
      'max': 3
    },
    step: 0.1
  },
};

const picturePreview = document.querySelector('.img-upload__preview img');
const scale = document.querySelector('.scale__control--value');
const scaleDecBtn = document.querySelector('.scale__control--smaller');
const scaleIncBtn = document.querySelector('.scale__control--bigger');
const effectSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

const getScaleValue = () => +scale.value.replace('%', '');
const setScaleValue = (value) => {
  scale.value = `${value}%`;
};
function updatePreview() {
  picturePreview.style.transform = `scale(${getScaleValue() / 100})`;
}

function onScaleDecClick() {
  const afterScale = getScaleValue() - SCALE_STEP;
  if (afterScale >= SCALE_MIN) {
    setScaleValue(afterScale);
    updatePreview();
  }
}
function onScaleIncClick() {
  const afterScale = getScaleValue() + SCALE_STEP;
  if (afterScale <= SCALE_MAX) {
    setScaleValue(afterScale);
    updatePreview();
  }
}
function onSliderUpdate() {
  switch (effectsList.querySelector(':checked').value) {
    case 'chrome':
      picturePreview.style.filter = `grayscale(${effectSlider.noUiSlider.get()})`;
      break;
    case 'sepia':
      picturePreview.style.filter = `sepia(${effectSlider.noUiSlider.get()})`;
      break;
    case 'marvin':
      picturePreview.style.filter = `invert(${effectSlider.noUiSlider.get()}%)`;
      break;
    case 'phobos':
      picturePreview.style.filter = `blur(${effectSlider.noUiSlider.get()}px)`;
      break;
    case 'heat':
      picturePreview.style.filter = `brightness(${effectSlider.noUiSlider.get()})`;
      break;
  }

  document.querySelector('.effect-level__value').value = effectSlider.noUiSlider.get();
}
function onEffectChange(evt) {
  picturePreview.classList = `effects__preview--${evt.target.value}`;
  if (evt.target.value === 'none') {
    picturePreview.style.filter = '';
    effectSlider.parentElement.classList.add('hidden');
  } else {
    effectSlider.parentElement.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions(SLIDER_OPTIONS[evt.target.value]);
  }
}

const initPictureEditor = () => {
  noUiSlider.create(effectSlider, { start: 0, range: { min: 0, max: 1 }, connect: 'lower' });
  effectSlider.parentElement.classList.add('hidden');
  setScaleValue(100);

  scaleDecBtn.addEventListener('click', onScaleDecClick);
  scaleIncBtn.addEventListener('click', onScaleIncClick);
  effectsList.addEventListener('change', onEffectChange);
  effectSlider.noUiSlider.on('update', onSliderUpdate);
};
const destroyPictureEditor = () => {
  scaleDecBtn.removeEventListener('click', onScaleDecClick);
  scaleIncBtn.removeEventListener('click', onScaleIncClick);
  effectsList.removeEventListener('change', onEffectChange);

  effectSlider.noUiSlider.destroy();
};


export { initPictureEditor, destroyPictureEditor };

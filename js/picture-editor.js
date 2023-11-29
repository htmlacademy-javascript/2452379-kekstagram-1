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

const pictureForm = document.querySelector('#upload-select-image');
const picturePreview = pictureForm.querySelector('.img-upload__preview img');
const scale = pictureForm.querySelector('.scale__control--value');
const scaleDecBtn = pictureForm.querySelector('.scale__control--smaller');
const scaleIncBtn = pictureForm.querySelector('.scale__control--bigger');
const effectSlider = pictureForm.querySelector('.effect-level__slider');
const effectsList = pictureForm.querySelector('.effects__list');

const getScaleValue = () => parseInt(scale.value, 10);
const setScaleValue = (value) => {
  scale.value = `${value}%`;
  picturePreview.style.transform = `scale(${getScaleValue() / 100})`;
};

const changePreviewEffect = (() => {
  let currentEffect = 'effects__preview--none';
  return (newEffect) => {
    picturePreview.classList.remove(currentEffect);
    picturePreview.classList.add(newEffect);
    currentEffect = newEffect;
  };
})();

function onScaleClick(evt) {
  const flag = evt.target.classList.contains('scale__control--bigger');
  const afterScale = flag ? getScaleValue() + SCALE_STEP : getScaleValue() - SCALE_STEP;
  if (afterScale >= SCALE_MIN && afterScale <= SCALE_MAX) {
    setScaleValue(afterScale);
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

  pictureForm.querySelector('.effect-level__value').value = effectSlider.noUiSlider.get();
}
function onEffectChange(evt) {
  changePreviewEffect(`effects__preview--${evt.target.value}`);
  if (evt.target.value === 'none') {
    picturePreview.style.filter = '';
    effectSlider.parentElement.classList.add('hidden');
  } else {
    effectSlider.parentElement.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions(SLIDER_OPTIONS[evt.target.value]);
  }
}

const initPictureEditor = (fileURL) => {
  noUiSlider.create(effectSlider, { start: 0, range: { min: 0, max: 1 }, connect: 'lower' });
  effectSlider.parentElement.classList.add('hidden');
  setScaleValue(100);

  effectsList.querySelectorAll('.effects__preview').forEach((preview) => {
    preview.style.backgroundImage = `url("${fileURL}")`;
  });

  scaleDecBtn.addEventListener('click', onScaleClick);
  scaleIncBtn.addEventListener('click', onScaleClick);
  effectsList.addEventListener('change', onEffectChange);
  effectSlider.noUiSlider.on('update', onSliderUpdate);
};
const destroyPictureEditor = () => {
  setScaleValue(100);
  picturePreview.style.filter = '';
  changePreviewEffect('effects__preview--none');
  scaleDecBtn.removeEventListener('click', onScaleClick);
  scaleIncBtn.removeEventListener('click', onScaleClick);
  effectsList.removeEventListener('change', onEffectChange);

  effectSlider.noUiSlider.destroy();
};


export { initPictureEditor, destroyPictureEditor };

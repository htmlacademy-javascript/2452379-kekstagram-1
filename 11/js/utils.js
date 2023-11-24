const generateRandomInteger = function(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = function(arr, min = 0, max = arr.length - 1) {
  return arr[generateRandomInteger(min, max)];
};

const isEsc = (evt) => evt.key === 'Escape';

const onEscKeydownDo = (cb, exp = null) => ((evt) => {
  if (isEsc(evt) && (exp ? exp(evt) : true)) {
    evt.preventDefault();
    cb();
  }
});

export { getRandomArrayElement, generateRandomInteger, isEsc, onEscKeydownDo };

const isPolyndrom = (str) => {
  str = String(str).replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str.at(i) !== str.at(-(i + 1))) {
      return false;
    }
  }

  return true;
};

const getAllNumbers = (str) => {
  let result = '';
  str = String(str).replaceAll(' ', '');

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i], 10))) {
      result += str[i];
    }
  }

  return parseInt(result, 10);
};

const pushString = (str, maxLength, pushStr) => {
  const availableLength = maxLength - str.length;

  if (availableLength <= 0) {
    return str;
  }

  const stringToAdd = pushStr.repeat(Math.floor(availableLength / pushStr.length)) + pushStr.substring(0, availableLength % pushStr.length);

  return stringToAdd + str;
};

const isLessOrEqual = (str, maxLength) => str.length <= maxLength;

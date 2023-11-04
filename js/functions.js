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


let funcResult = isPolyndrom(1331);
window.console.log(funcResult);
funcResult = isPolyndrom('Кекс');
window.console.log(funcResult);
funcResult = isPolyndrom('Лёша на полке клопа нашёл ');
window.console.log(funcResult);


funcResult = getAllNumbers('Лёша на 2полке клопа нашёл 1');
window.console.log(funcResult);
funcResult = getAllNumbers('Лёша на полке клопа нашёл ');
window.console.log(funcResult);
funcResult = getAllNumbers(-25.33727);
window.console.log(funcResult);


funcResult = pushString('1', 4, '0');
window.console.log(funcResult);
funcResult = pushString('q', 4, 'werty');
window.console.log(funcResult);
funcResult = pushString('qwerty', 4, '0');
window.console.log(funcResult);


funcResult = isLessOrEqual('проверяемая строка', 20);
window.console.log(funcResult);
funcResult = isLessOrEqual('проверяемая строка', 18);
window.console.log(funcResult);
funcResult = isLessOrEqual('проверяемая строка', 10);
window.console.log(funcResult);

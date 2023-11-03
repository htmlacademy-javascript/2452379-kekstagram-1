const stringFunctions = {
  isPolyndrom: (str) => {
    str = String(str).replaceAll(' ', '').toLowerCase();

    for (let i = 0; i < Math.floor(str.length / 2); i++) {
      if (str.at(i) !== str.at(-(i + 1))) {
        return false;
      }
    }

    return true;
  },
  getAllNumbers: (str) => {
    let result = '';
    str = String(str).replaceAll(' ', '');

    for (let i = 0; i < str.length; i++) {
      if (!isNaN(parseInt(str[i], 10))) {
        result += str[i];
      }
    }

    return parseInt(result, 10);
  },
  pushString: (str, maxLength, pushStr) => {
    const availableLength = maxLength - str.length;

    if (availableLength <= 0) {
      return str;
    }

    const stringToAdd = pushStr.repeat(Math.floor(availableLength / pushStr.length)) + pushStr.substring(0, availableLength % pushStr.length);

    //for (let i = 0; i < availableLength; i++) {
    //  stringToAdd += pushStr[i % pushStr.length];
    //}

    return stringToAdd + str;
  },
  isLessOrEqual: (str, maxLength) => str.length <= maxLength
};

let result = stringFunctions.isPolyndrom(1331);
window.console.log(result);
result = stringFunctions.isPolyndrom('Кекс');
window.console.log(result);
result = stringFunctions.isPolyndrom('Лёша на полке клопа нашёл ');
window.console.log(result);


result = stringFunctions.getAllNumbers('Лёша на 2полке клопа нашёл 1');
window.console.log(result);
result = stringFunctions.getAllNumbers('Лёша на полке клопа нашёл ');
window.console.log(result);
result = stringFunctions.getAllNumbers(-25.33727);
window.console.log(result);


result = stringFunctions.pushString('1', 4, '0');
window.console.log(result);
result = stringFunctions.pushString('q', 4, 'werty');
window.console.log(result);
result = stringFunctions.pushString('qwerty', 4, '0');
window.console.log(result);


result = stringFunctions.isLessOrEqual('проверяемая строка', 20);
window.console.log(result);
result = stringFunctions.isLessOrEqual('проверяемая строка', 18);
window.console.log(result);
result = stringFunctions.isLessOrEqual('проверяемая строка', 10);
window.console.log(result);

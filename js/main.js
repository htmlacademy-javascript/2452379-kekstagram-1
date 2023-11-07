import { generateDescription, generateComment } from './data.js';
import { generateRandomInteger } from './utils.js';


const photoDescriptions = Array.from({length: 25}, generateDescription);
photoDescriptions.forEach((item) => {
  item.comments = Array.from({length: generateRandomInteger(0, 5)}, generateComment);
});

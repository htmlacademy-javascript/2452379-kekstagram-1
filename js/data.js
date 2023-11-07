import { getRandomArrayElement, generateRandomInteger } from './utils.js';

const MIN_DESCTIPTION_ID = 1;
const MAX_DESCRIPTON_ID = 25;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 25;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const messageTemplates = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const nameTemplates = [
  'Олег',
  'Олег1',
  'Олег О',
  'Огел',
  'Лего',
  'Лоег',
];

const generatePhotoDescription = function(minID, maxID) {
  let availableID = minID;
  return function() {
    if (availableID > maxID) {
      return null;
    }

    const result = {
      id: availableID,
      url: `photos/${availableID}.jpg`,
      description: 'Тестовое описание',
      likes: generateRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: []
    };
    availableID++;

    return result;
  };
};


const generateRandomAvatar = function(min, max) {
  return `img/avatar-${generateRandomInteger(min, max)}.svg`;
};

const generatePhotoComments = function(minID, maxID) {
  const usedIDs = [];
  let availableID = minID;

  return function() {
    if (usedIDs.length >= maxID) {
      return null;
    }

    while(usedIDs.includes(availableID)) {
      availableID = generateRandomInteger(minID, maxID);
    }

    usedIDs.push(availableID);

    return {
      id: availableID,
      avatar: generateRandomAvatar(MIN_AVATAR_ID, MAX_AVATAR_ID),
      message: getRandomArrayElement(messageTemplates),
      name: getRandomArrayElement(nameTemplates)
    };
  };
};


const generateDescription = generatePhotoDescription(MIN_DESCTIPTION_ID, MAX_DESCRIPTON_ID);
const generateComment = generatePhotoComments(MIN_COMMENT_ID, MAX_COMMENT_ID);

const generatedData = Array.from({length: 25}, generateDescription);
generatedData.forEach((item) => {
  item.comments = Array.from({length: generateRandomInteger(0, 5)}, generateComment);
});

export { generatedData };

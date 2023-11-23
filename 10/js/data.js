import { getRandomArrayElement, generateRandomInteger } from './utils.js';

const MAX_PICTURE_ID = 25;
const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 20;
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

const generateRandomAvatar = (min, max) => `img/avatar-${generateRandomInteger(min, max)}.svg`;

const generateComment = (index) => ({
  id: index,
  avatar: generateRandomAvatar(MIN_AVATAR_ID, MAX_AVATAR_ID),
  message: getRandomArrayElement(messageTemplates),
  name: getRandomArrayElement(nameTemplates)
});

const generatePicture = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: 'Тестовое описание',
  likes: generateRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({length: generateRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)}, (_, idx) => generateComment(idx))
});

const pictures = Array.from({length: MAX_PICTURE_ID}, (_, index) => generatePicture(index));

export { pictures };

const START_DESCTIPTION_ID = 1;
const MAX_DESCRIPTON_ID = 25;
const START_COMMENT_ID = 1;
const MAX_COMMENT_ID = 25;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

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


function generatePhotoDescription(startID, maxID) {
  let availableID = startID;
  return function() {
    if (availableID > maxID) {
      return null;
    }

    const result = {
      id: availableID,
      url: `photos/${availableID}.jpg`,
      description: 'Тестовое описание',
      likes: generateRandomInteger(15, 200),
      comments: []
    };
    availableID++;

    return result;
  };
}

function generatePhotoComments(startID, maxID) {
  const usedIDs = [];
  let availableID = startID;

  return function() {
    if (usedIDs.length >= maxID) {
      return null;
    }

    while(usedIDs.includes(availableID)) {
      availableID = generateRandomInteger(startID, maxID);
    }

    usedIDs.push(availableID);

    return {
      id: availableID,
      avatar: generateRandomAvatar(MIN_AVATAR_ID, MAX_AVATAR_ID),
      message: generateRandomMessage(),
      name: generateRandomName()
    };
  };
}


function generateRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}
function generateRandomAvatar(min, max) {
  return `img/avatar-${generateRandomInteger(min, max)}.svg`;
}
function generateRandomMessage() {
  return messageTemplates[generateRandomInteger(0, messageTemplates.length - 1)];
}
function generateRandomName() {
  return nameTemplates[generateRandomInteger(0, nameTemplates.length - 1)];
}


const generateDescription = generatePhotoDescription(START_DESCTIPTION_ID, MAX_DESCRIPTON_ID);
const generateComment = generatePhotoComments(START_COMMENT_ID, MAX_COMMENT_ID);


const photoDescriptions = Array.from({length: 25}, generateDescription);
photoDescriptions.forEach((item) => {
  item.comments = Array.from({length: generateRandomInteger(0, 5)}, generateComment);
});


console.log(photoDescriptions);

'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomLodges() {
  var randomLodges = {
    author: {
      avatar: LODGES_AVATAR.pop()
    },
    offer: {
      title: TITLE_VARIATION.pop(),
      address: 'x, y',
      price: getRandomInt(1000, 1000001),
      type: TYPE_VARIATION[getRandomInt(0, 3)],
      rooms: getRandomInt(1, 6),
      guests: getRandomInt(1, 11),
      checkin: CHECK_TIME[getRandomInt(0, 4)],
      checkout: CHECK_TIME[getRandomInt(0, 4)],
      features: FEATURES,
      description: '',
      photos: PHOTOS
    },
    location: {
      x: getRandomInt(300, 901) + 'px',
      y: getRandomInt(100, 501) + 'px'
    }
  };
  return randomLodges;
}

function getLodges(countLodges) {
  var lodges = [];
  for (var i = 0; i < countLodges; i++) {
    lodges.push(getRandomLodges());
  }
  return lodges;
}

var TITLE_VARIATION = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
TITLE_VARIATION = shuffle(TITLE_VARIATION);
var LODGES_AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];
LODGES_AVATAR = shuffle(LODGES_AVATAR);
var TYPE_VARIATION = ['flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [];
var LODGES = getLodges(8);

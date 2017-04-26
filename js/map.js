'use strict';

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
var PHOTOS = [
  'http://placehold.it/52x42',
  'http://placehold.it/52x42',
  'http://placehold.it/52x42',
  'http://placehold.it/52x42',
  'http://placehold.it/52x42'
];

// рандомное число
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// перемешивает массив
function shuffle(arr) {
  var i;
  var j;
  var temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// переменные смешанных массивов
var lodgesAvatar = shuffle(LODGES_AVATAR);
var titleVariation = shuffle(TITLE_VARIATION);
var features= shuffle(FEATURES);

//создаем рандомные места
function getRandomLodges() {
  var randomLodges = {
    author: {
      avatar: lodgesAvatar.pop()
    },
    offer: {
      title: titleVariation.pop(),
      address: '',
      price: getRandomInt(1000, 1000001),
      type: getTypeVariation(),
      rooms: getRandomInt(1, 6),
      guests: getRandomInt(1, 11),
      checkin: CHECK_TIME[getRandomInt(0, 3)],
      checkout: CHECK_TIME[getRandomInt(0, 3)],
      features: getSomeFeatures(),
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

// подпись о виде жилья
function getTypeVariation(type) {
  var randomTypeVariation = TYPE_VARIATION[getRandomInt(0, 3)];
  if (randomTypeVariation === 'flat') {
    type = 'Квартира.';
  } else if (randomTypeVariation === 'house'){
    type = 'Дом.';
  } else {
    type = 'Бунгало.';
  }
  return type;
}

// ништяки жилья
function getSomeFeatures() {
  var someFeatures= features.slice(0, getRandomInt(0, FEATURES.length));
  return someFeatures;
}

// рисую метку
function htmlToElement(pin) {
  var template = document.createElement('template');
  template.innerHTML = pin;
  return template.content.firstChild;
}

function renderLodgePin(lodgePin) {
  var lodgeElement = htmlToElement('<div class="pin" style="left: 500px; top: 100px"><img src="img/avatars/user01.png" class="rounded" width="40" height="40"></div>');
  lodgeElement.querySelector('.rounded').src = lodgePin.author.avatar;
  lodgeElement.style.left = lodgePin.location.x;
  lodgeElement.style.top = lodgePin.location.y;

  return lodgeElement;
}

var LODGES = getLodges(8);
var similarLodgeElement = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();
for (var i = 0; i < LODGES.length; i++) {
  fragment.appendChild(renderLodgePin(LODGES[i]));
}
similarLodgeElement.appendChild(fragment);

// нахожу template и место куда буду вставлять его копию
var similarLodgeTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');

// копирую template и вставляю в него новые данные
var renderLodgeInfo = function (info) {
  var lodgeInfo = similarLodgeTemplate.cloneNode(true);

  lodgeInfo.querySelector('.lodge__title').textContent = info.offer.title;
  lodgeInfo.querySelector('.lodge__address').textContent = info.location.x + ', ' + info.location.y;
  lodgeInfo.querySelector('.lodge__price').textContent = info.offer.price + ' руб/ночь';
  lodgeInfo.querySelector('.lodge__type').textContent = info.offer.type;
  lodgeInfo.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + info.offer.guests + ' гостей в ' + info.offer.rooms + ' комнатах';
  lodgeInfo.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout;
  lodgeInfo.querySelector('.lodge__features').textContent = info.offer.features;
  lodgeInfo.querySelector('.lodge__description').textContent = info.offer.description;
  offerDialog.querySelector('.ava').src = info.author.avatar;

  return lodgeInfo;
};

// вставляю данные на место панели в html документе
offerDialog.removeChild(dialogPanel);
offerDialog.appendChild(renderLodgeInfo(LODGES[0]));

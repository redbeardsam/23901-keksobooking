'use strict';

var similarLodgeElement = document.querySelector('.tokyo__pin-map');
var similarLodgeTemplate = document.querySelector('#lodge-template').content;

var TITLE_VAR = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_VAR = ['flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_VAR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
FEATURES_VAR.length = getRandomInt(0, FEATURES_VAR.length);

var lodges = [
  {
    author: {
      avatar:'img/avatars/user01.png'
    },
    location: {
      x: getRandomInt(300, 901) + 'px',
      y: getRandomInt(100, 501) + 'px'
    }
  },
  {
    author: {
      avatar:'img/avatars/user02.png'
    },
    location: {
      x: getRandomInt(300, 901) + 'px',
      y: getRandomInt(100, 501) + 'px'
    }
  },
  /*{
    author: {
      avatar:'img/avatars/user02.png'
    },
    offer: {
      title: TITLE_VAR[getRandomInt(0, 8)],
      address: 'location.x, location.y',
      price: getRandomInt(1000, 1000001),
      type: TYPE_VAR[getRandomInt(0, 3)],
      rooms: getRandomInt(1, 6),
      guests: getRandomInt(1, 11),
      checkin: CHECK_TIME[getRandomInt(0, 4)],
      checkout: CHECK_TIME[getRandomInt(0, 4)],
      features: FEATURES_VAR,
      description: '',
      photos: PHOTOS
    },
    location: {
      x: getRandomInt(300, 901) + 'px',
      y: getRandomInt(100, 501) + 'px'
    }
  }*/
];

var d1 = document.getElementById('lodge-template');
d1.insertAdjacentHTML('beforebegin', '<div class="pin lodges" style="left: 500px; top: 100px"><img src="img/avatars/user01.png" class="rounded ava" width="40" height="40"></div>');

var renderLodge = function (lodge) {
  var lodgeElement = similarLodgeTemplate.cloneNode(true);
  document.querySelector('.ava').src = lodge.author.avatar;
  document.querySelector('.lodges').style.left = lodge.location.x;
  document.querySelector('.lodges').style.top = lodge.location.y;

  return lodgeElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < lodges.length; i++) {
  fragment.appendChild(renderLodge(lodges[i]));
}
similarLodgeElement.appendChild(fragment);

'use strict';

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

var similarLodgeElement = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();
for (var i = 0; i < LODGES.length; i++) {
  fragment.appendChild(renderLodgePin(LODGES[i]));
}
similarLodgeElement.appendChild(fragment);

// вписываю информацию

function renderLodgeInfo(info){
  var lodgeInfo = htmlToElement('<div class="dialog__panel"><h3 class="lodge__title"></h3><p class="lodge__address"></p><h3 class="lodge__price"></h3><h4 class="lodge__type"></h4><p class="lodge__rooms-and-guests"></p><p class="lodge__checkin-time"></p><div class="lodge__features"></div><p class="lodge__description"></p><div class="lodge__photos"></div></div>');
  lodgeInfo.querySelector('.lodge__title').textContent = info.offer.title;

  return lodgeInfo;
}

var similarLodgeInfo = document.querySelector('#lodge-template');
var dialog = similarLodgeInfo.querySelector('.dialog__panel');
similarLodgeInfo.removeChild(dialog);
fragment.appendChild(renderLodgeInfo(LODGES[i]));
similarLodgeInfo.appendChild(fragment);

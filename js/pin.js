'use strict';

// Модуль метки на карте
window.pin = (function () {
  // Главная метка
  var MAP_PIN_MAIN = window.map.MAP.querySelector('.map__pin--main');
  // Размеры главной метки в пикселях
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 84;
  // Шаблон метки объявления
  var PIN_TEMPLATE = document.querySelector('#pin').content;

  // Создаёт метку по шаблону на основе переданных данных
  var createPin = function (pinData, template) {
    var mapPin = template.querySelector('.map__pin').cloneNode(true);
    var mapPinX = pinData.location.x - (mapPin.offsetWidth / 2);
    var mapPinY = pinData.location.y - mapPin.offsetHeight;
    mapPin.style = 'left: ' + mapPinX + 'px; top: ' + mapPinY + 'px;';

    var img = mapPin.querySelector('img');
    img.src = pinData.author.avatar;
    img.alt = pinData.offer.title;

    // Вешаем на метку обработчик клика, открывающий карточку объявления
    mapPin.addEventListener('click', function () {
      window.card.advertCard.openAdvertCard(pinData);
    });

    return mapPin;
  };

  // Создаёт массив меток в соответствии с данными
  var createPins = function () {
    var pins = [];
    for (var i = 0; i < window.data.advertsData.length; i++) {
      var pin = window.pin.createPin(window.data.advertsData[i], window.pin.PIN_TEMPLATE);
      pins.push(pin);
    }
    return pins;
  };

  // Определение координаты главной метки
  var getPinCoords = function () {
    var coords = {};
    if (!window.page.isActive) {
      coords.x = MAP_PIN_MAIN.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
      coords.y = MAP_PIN_MAIN.offsetTop + MAP_PIN_MAIN_WIDTH / 2;
    } else {
      coords.x = MAP_PIN_MAIN.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
      coords.y = MAP_PIN_MAIN.offsetTop + MAP_PIN_MAIN_HEIGHT;
    }
    return coords;
  };

  var pins = createPins();

  return {
    MAP_PIN_MAIN: MAP_PIN_MAIN,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    createPin: createPin,
    createPins: createPins,
    getPinCoords: getPinCoords,
    pins: pins,
  };
})();

'use strict';

// Модуль метки на карте
window.pin = (function () {
  // Главная метка
  var MAP_PIN_MAIN = window.map.MAP.querySelector('.map__pin--main');
  // Размеры главной метки в пикселях
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 84;
  // Активна ли главная метка
  var isMapPinMainActive = false;
  // Шаблон метки объявления
  var PIN_TEMPLATE = document.querySelector('#pin').content;

  // Создаёт метку по шаблону на основе переданных данных
  var createPin = function (data) {
    var pin = PIN_TEMPLATE.querySelector('.map__pin').cloneNode(true);
    var pinX = data.location.x - (pin.offsetWidth / 2);
    var pinY = data.location.y - pin.offsetHeight;
    pin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

    var img = pin.querySelector('img');
    img.src = data.author.avatar;
    img.alt = data.offer.title;

    // Вешаем на метку обработчик клика, открывающий карточку объявления
    pin.addEventListener('click', function () {
      window.map.renderCard(data);
    });

    return pin;
  };

  // Создаёт массив меток в соответствии с данными
  var createPins = function () {
    var pins = [];
    for (var i = 0; i < window.data.advertsData.length; i++) {
      var pin = createPin(window.data.advertsData[i]);
      pins.push(pin);
    }
    return pins;
  };

  // Определение координаты главной метки
  var getPinCoords = function () {
    var coords = {};
    if (!isMapPinMainActive) {
      coords.x = MAP_PIN_MAIN.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
      coords.y = MAP_PIN_MAIN.offsetTop + MAP_PIN_MAIN_WIDTH / 2;
    } else {
      coords.x = MAP_PIN_MAIN.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
      coords.y = MAP_PIN_MAIN.offsetTop + MAP_PIN_MAIN_HEIGHT;
    }
    return coords;
  };

  var pins = createPins();

  // Вешаем обработчики на главную метку
  MAP_PIN_MAIN.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.page.activate();
      isMapPinMainActive = true;
      window.advertForm.setAddressValue();
    }
  });
  MAP_PIN_MAIN.addEventListener('click', function () {
    window.page.activate();
    isMapPinMainActive = true;
    window.advertForm.setAddressValue();
  });

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

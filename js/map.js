'use strict';

// Модуль карты с объявлениями
window.map = (function () {
  // Карта
  var MAP = document.querySelector('.map');
  // Секция с метками
  var MAP_PINS = MAP.querySelector('.map__pins');
  // Ширина секции с метками в пикселях
  var MAP_PINS_WIDTH = 1200;
  // Верхняя граница секции с метками в пикселях
  var MAP_PINS_TOP = 130;
  // Нижняя граница секции с метками в пикселях
  var MAP_PINS_BOTTOM = 630;

  // Отрисовывает метки на карте
  var renderPins = function (data) {
    var mapPinFragment = document.createDocumentFragment();
    var pins = window.pin.createPins(data);
    for (var i = 0; i < pins.length; i++) {
      mapPinFragment.appendChild(pins[i]);
    }

    MAP_PINS.appendChild(mapPinFragment);
  };

  // Убирает затенение с карты
  var uncoverMap = function () {
    MAP.classList.remove('map--faded');
  };

  // Затененяет карту
  var coverMap = function () {
    MAP.classList.add('map--faded');
  };

  // Отрисовывает карточку объявления
  var renderCard = function (data) {
    var card = window.card.createCard(data);
    MAP_PINS.insertAdjacentElement('afterend', card);
  };

  // Проверяет переданные координаты объекта на карте и возвращает предельно допустимые
  var checkCoords = function (x, y) {
    var resCoords = {};
    if (x <= 0) {
      resCoords.x = 0;
    } else if (x >= MAP_PINS_WIDTH) {
      resCoords.x = MAP_PINS_WIDTH;
    } else {
      resCoords.x = x;
    }
    if (y <= MAP_PINS_TOP) {
      resCoords.y = MAP_PINS_TOP;
    } else if (y >= MAP_PINS_BOTTOM) {
      resCoords.y = MAP_PINS_BOTTOM;
    } else {
      resCoords.y = y;
    }
    return resCoords;
  };

  return {
    MAP: MAP,
    MAP_PINS: MAP_PINS,
    renderPins: renderPins,
    uncoverMap: uncoverMap,
    coverMap: coverMap,
    renderCard: renderCard,
    checkCoords: checkCoords,
  };
})();

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
  // Центральная точка секции с метками в пикселях
  var MAP_PINS_CENTER = {
    x: 603,
    y: 409
  };

  // Отрисовывает метки на карте
  var renderPinsOnMap = function (data) {
    var mapPinFragment = document.createDocumentFragment();
    // var pins = window.pin.getPins();
    // if (pins.length === 0) {
    //   pins = window.pin.createPins(data);
    // }
    var pins = window.pin.createPins(data);
    for (var i = 0; i < pins.length; i++) {
      mapPinFragment.appendChild(pins[i]);
    }

    MAP_PINS.appendChild(mapPinFragment);
  };

  // Убирает метки с карты
  var removePinsFromMap = function () {
    window.pin.removePins();
  };

  // Обновляет метки на карте
  var updatePinsOnMap = function (data) {
    removePinsFromMap();
    removeCardFromMap();
    renderPinsOnMap(data);
  };

  // Убирает затенение с карты
  var uncoverMap = function () {
    MAP.classList.remove('map--faded');
    window.pin.activateMainPin();
  };

  // Затененяет карту
  var coverMap = function () {
    MAP.classList.add('map--faded');
    window.pin.deactivateMainPin();
  };

  // Отрисовывает карточку объявления на карте
  var renderCardOnMap = function (data) {
    var card = window.card.createCard(data);
    MAP_PINS.insertAdjacentElement('afterend', card);
  };

  // Убирает карточку объявления с карты
  var removeCardFromMap = function () {
    window.card.removeCard();
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

  // Центрирует главную метку
  var centerMainPin = function () {
    window.pin.moveMainPin(MAP_PINS_CENTER.x, MAP_PINS_CENTER.y);
  };

  // Сбрасывает карту
  var resetMap = function () {
    // Затеняем карту
    coverMap();
    // Удаляем открытую карточку
    removeCardFromMap();
    // Удаляем метки
    removePinsFromMap();
    // Центрируем главную метку
    centerMainPin();
  };

  return {
    MAP: MAP,
    updatePinsOnMap: updatePinsOnMap,
    uncoverMap: uncoverMap,
    renderCardOnMap: renderCardOnMap,
    checkCoords: checkCoords,
    resetMap: resetMap,
  };
})();

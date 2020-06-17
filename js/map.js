'use strict';

// Модуль карты с объявлениями
window.map = (function () {
  // Карта
  var MAP = document.querySelector('.map');
  // Секция с метками
  var MAP_PINS = MAP.querySelector('.map__pins');

  // Отрисовывает метки на карте
  var renderPins = function () {
    var mapPinFragment = document.createDocumentFragment();
    for (var i = 0; i < window.pin.pins.length; i++) {
      mapPinFragment.appendChild(window.pin.pins[i]);
    }

    MAP_PINS.appendChild(mapPinFragment);
  };

  return {
    MAP: MAP,
    renderPins: renderPins,
  };
})();

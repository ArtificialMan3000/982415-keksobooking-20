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
    var pins = window.pin.createPins();
    for (var i = 0; i < pins.length; i++) {
      mapPinFragment.appendChild(window.pin.pins[i]);
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
  // var firstAdvertData = window.data.advertsData[0];
  // Создаём карточку объявления
  // advertCard.openAdvertCard(firstAdvertData);

  return {
    MAP: MAP,
    renderPins: renderPins,
    uncoverMap: uncoverMap,
    coverMap: coverMap,
    renderCard: renderCard,
  };
})();

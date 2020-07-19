'use strict';

// Модуль фильтров объявлений
window.filters = (function () {
  // Форма фильтров
  var MAP_FILTERS = document.querySelector('.map__filters');
  // Фильтры
  var Filters = {
    TYPE: MAP_FILTERS.querySelector('#housing-type'),
    PRICE: MAP_FILTERS.querySelector('#housing-price'),
    ROOMS: MAP_FILTERS.querySelector('#housing-rooms'),
    GUESTS: MAP_FILTERS.querySelector('#housing-guests'),
    FEATURES: MAP_FILTERS.querySelectorAll('#housing-features input')
  };
  // Диапазоны цен
  var PRICE_RANGES = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };
  // Количество показываемых объявлений
  var ADVERTS_LIMIT = 5;

  // Отключает фильтры
  var disableFilters = function () {
    window.util.toggleForm(MAP_FILTERS, true);
    removeFiltersHandlers();
  };

  // Включает фильтры
  var enableFilters = function () {
    window.util.toggleForm(MAP_FILTERS, false);
    setFiltersHandlers();
  };

  // Очищает фильтры
  var resetFilters = function () {
    MAP_FILTERS.reset();
    disableFilters();
  };

  // Ограничивает количество показываемых объявлений
  var limitAdverts = function (data) {
    return data.slice(0, ADVERTS_LIMIT);
  };

  // Применяет фильтры к показываемым объявлениям
  var applyFilters = function (data) {
    var filteredData = data;
    var type = Filters.TYPE.value;
    var priceRange = Filters.PRICE.value;
    var rooms = Filters.ROOMS.value;
    var guests = Filters.GUESTS.value;
    var features = Array.from(Filters.FEATURES)
      .filter(function (featureElem) {
        return featureElem.checked === true;
      })
      .map(function (featureElem) {
        return featureElem.value;
      });
    filteredData = data.filter(function (elem) {
      if (type !== 'any' && type !== elem.offer.type) {
        return false;
      }
      if (priceRange !== 'any' &&
          (PRICE_RANGES[priceRange].min > elem.offer.price || PRICE_RANGES[priceRange].max < elem.offer.price)) {
        return false;
      }
      if (rooms !== 'any' && Number(rooms) !== elem.offer.rooms) {
        return false;
      }
      if (guests !== 'any' && Number(guests) !== elem.offer.guests) {
        return false;
      }
      if (features.length > 0) {
        for (var i = 0; i < features.length; i++) {
          if (elem.offer.features.indexOf(features[i]) < 0) {
            return false;
          }
        }
      }
      return true;
    });
    filteredData = limitAdverts(filteredData);
    window.map.updatePinsOnMap(filteredData);
  };

  // Обработчик изменения фильтров
  var filterChangeHandler = function () {
    applyFilters(window.data.getAdvertData());
  };

  // Устанавливает обработчики на изменение фильтров
  var setFiltersHandlers = function () {
    Filters.TYPE.addEventListener('change', filterChangeHandler);
    Filters.PRICE.addEventListener('change', filterChangeHandler);
    Filters.ROOMS.addEventListener('change', filterChangeHandler);
    Filters.GUESTS.addEventListener('change', filterChangeHandler);
    Filters.FEATURES.forEach(function (elem) {
      elem.addEventListener('change', filterChangeHandler);
    });
  };

  // Удаляет обработчики изменения фильтров
  var removeFiltersHandlers = function () {
    Filters.TYPE.removeEventListener('change', filterChangeHandler);
    Filters.PRICE.removeEventListener('change', filterChangeHandler);
    Filters.ROOMS.removeEventListener('change', filterChangeHandler);
    Filters.GUESTS.removeEventListener('change', filterChangeHandler);
    Filters.FEATURES.forEach(function (elem) {
      elem.removeEventListener('change', filterChangeHandler);
    });
  };

  return {
    disableFilters: disableFilters,
    enableFilters: enableFilters,
    resetFilters: resetFilters,
    applyFilters: applyFilters
  };
})();

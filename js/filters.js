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

  // Фильтрует по типу объявления
  var filterByType = function (advert) {
    var type = Filters.TYPE.value;
    return !(type !== 'any' && type !== advert.offer.type);
  };

  // Фильтрует по цене
  var filterByPrice = function (advert) {
    var priceRange = Filters.PRICE.value;
    return !(priceRange !== 'any' &&
    (PRICE_RANGES[priceRange].min > advert.offer.price || PRICE_RANGES[priceRange].max < advert.offer.price));
  };

  // Фильтрует по количеству комнат
  var filterByRooms = function (advert) {
    var rooms = Filters.ROOMS.value;
    return !(rooms !== 'any' && Number(rooms) !== advert.offer.rooms);
  };

  // Фильтрует по количеству гостей
  var filterByGuests = function (advert) {
    var guests = Filters.GUESTS.value;
    return !(guests !== 'any' && Number(guests) !== advert.offer.guests);
  };

  // Фильтрует по удобствам
  var filterByFeatures = function (advert, features) {
    if (features.length > 0) {
      for (var i = 0; i < features.length; i++) {
        if (advert.offer.features.indexOf(features[i]) < 0) {
          return false;
        }
      }
    }
    return true;
  };

  // Применяет фильтры к показываемым объявлениям
  var applyFilters = function (data) {
    var features = Array.from(Filters.FEATURES)
      .filter(function (featureElem) {
        return featureElem.checked === true;
      })
      .map(function (featureElem) {
        return featureElem.value;
      });
    var filteredData = [];
    // Используется цикл for, т.к. метод filter нельзя прервать
    for (var i = 0; i < data.length; i++) {
      if (
        filterByType(data[i]) &&
        filterByPrice(data[i]) &&
        filterByRooms(data[i]) &&
        filterByGuests(data[i]) &&
        filterByFeatures(data[i], features)
      ) {
        filteredData.push(data[i]);
      }
      if (filteredData.length >= ADVERTS_LIMIT) {
        break;
      }
    }
    window.map.updatePinsOnMap(filteredData);
  };

  // Обработчик изменения фильтров
  var filterChangeHandler = window.debounce.removeDebounce(function () {
    var advertData = window.data.getAdvertData();
    applyFilters(advertData);
  });

  // Устанавливает обработчики на изменение фильтров
  var setFiltersHandlers = function () {
    Filters.TYPE.addEventListener('change', filterChangeHandler);
    Filters.PRICE.addEventListener('change', filterChangeHandler);
    Filters.ROOMS.addEventListener('change', filterChangeHandler);
    Filters.GUESTS.addEventListener('change', filterChangeHandler);
    Filters.FEATURES.forEach(function (element) {
      element.addEventListener('change', filterChangeHandler);
    });
  };

  // Удаляет обработчики изменения фильтров
  var removeFiltersHandlers = function () {
    Filters.TYPE.removeEventListener('change', filterChangeHandler);
    Filters.PRICE.removeEventListener('change', filterChangeHandler);
    Filters.ROOMS.removeEventListener('change', filterChangeHandler);
    Filters.GUESTS.removeEventListener('change', filterChangeHandler);
    Filters.FEATURES.forEach(function (element) {
      element.removeEventListener('change', filterChangeHandler);
    });
  };

  return {
    disableFilters: disableFilters,
    enableFilters: enableFilters,
    resetFilters: resetFilters,
    applyFilters: applyFilters
  };
})();

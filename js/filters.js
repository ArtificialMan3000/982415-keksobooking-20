'use strict';

// Модуль фильтров объявлений
window.filters = (function () {
  // Фильтры
  var MAP_FILTERS = document.querySelector('.map__filters');
  // Фильтр типа жилья
  var TYPE_FILTER = MAP_FILTERS.querySelector('#housing-type');
  // Фильтр цены
  // var PRICE_FILTER = MAP_FILTERS.querySelector('#housing-price');
  // Фильтр количества комнат
  // var ROOMS_FILTER = MAP_FILTERS.querySelector('#housing-rooms');
  // Фильтр количества гостей
  // var GUESTS_FILTER = MAP_FILTERS.querySelector('#housing-guests');
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
    var type = TYPE_FILTER.value;
    var filteredData = data;
    if (type !== 'any') {
      filteredData = data.filter(function (elem) {
        return elem.offer.type === type;
      });
    }
    filteredData = limitAdverts(filteredData);
    window.map.updatePinsOnMap(filteredData);
  };

  // Обработчик изменения фильтров
  var filterChangeHandler = function () {
    applyFilters(window.data.getAdvertData());
  };

  // Устанавливает обработчики на изменение фильтров
  var setFiltersHandlers = function () {
    TYPE_FILTER.addEventListener('change', filterChangeHandler);
  };

  // Удаляет обработчики изменения фильтров
  var removeFiltersHandlers = function () {
    TYPE_FILTER.removeEventListener('change', filterChangeHandler);
  };

  return {
    disableFilters: disableFilters,
    enableFilters: enableFilters,
    resetFilters: resetFilters,
    applyFilters: applyFilters
  };
})();

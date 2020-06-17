'use strict';

// Модуль фильтров объявлений
window.filters = (function () {
  // Фильтры
  var MAP_FILTERS = document.querySelector('.map__filters');

  // Отключает фильтры
  var disableFilters = function () {
    window.util.toggleForm(MAP_FILTERS, true);
  };

  // Включает фильтры
  var enableFilters = function () {
    window.util.toggleForm(MAP_FILTERS, false);
  };

  return {
    disableFilters: disableFilters,
    enableFilters: enableFilters,
  };
})();

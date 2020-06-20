'use strict';

// Управляет активностью страницы
window.page = (function () {
  // Активна ли страница
  // var isPageActive = false;
  // Деактивирует страницу
  var deactivate = function () {
    // Блокируем поля формы и фильтров
    window.advertForm.disableAdvertForm();
    window.filters.disableFilters();
    // isPageActive = false;
  };

  // Активирует страницу
  var activate = function () {
    // Разблокируем поля формы и фильтров
    window.advertForm.enableAdvertForm();
    window.filters.enableFilters();

    // Убираем затенение с карты
    window.map.uncoverMap();
    // Убираем затенение с формы
    window.advertForm.uncoverAdvertForm();
    // Отрисовываем метки
    window.data.loadAdvertData(window.map.renderPins);
    // isPageActive = true;
  };

  return {
    deactivate: deactivate,
    activate: activate,
  };
})();

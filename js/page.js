'use strict';

// Управляет активностью страницы
window.page = (function () {
  // Активна ли страница
  var isPageActive = false;
  // Деактивирует страницу
  var deactivate = function () {
    // Сбрасываем карту
    window.map.resetMap();
    // Сбрасываем форму и фильтры
    window.advertForm.resetAdvertForm();
    window.filters.resetFilters();
    // Блокируем поля формы и фильтров
    isPageActive = false;
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
    window.data.loadAdvertData(window.map.renderPinsOnMap);
    isPageActive = true;
  };

  // Проверяет, активна ли страница
  var checkPageActive = function () {
    return isPageActive;
  };

  return {
    deactivate: deactivate,
    activate: activate,
    checkPageActive: checkPageActive,
  };
})();

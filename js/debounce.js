'use strict';

// Модуль для устранения дребезга
window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  // Выполняет колбэк-функцию не чаще определённого интервала
  var removeDebounce = function (callback) {
    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(callback, DEBOUNCE_INTERVAL);
    };
  };

  return {
    removeDebounce: removeDebounce
  };
})();

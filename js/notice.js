'use strict';

// Модуль сообщений
window.notice = (function () {
  var MAIN = document.querySelector('main');
  var SUCCESS_TEMPLATE = document.querySelector('#success').content;
  var ERROR_TEMPLATE = document.querySelector('#error').content;

  // Показывает сообщение об успехе
  var showSuccessMessage = function () {
    var successElement = SUCCESS_TEMPLATE.querySelector('.success').cloneNode(true);
    document.addEventListener('click', function (evt) {
      evt.preventDefault();
      successElement.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        successElement.remove();
      }
    });
    MAIN.insertAdjacentElement('afterbegin', successElement);
  };

  // Показывает сообщение об успехе
  var showErrorMessage = function () {
    var errorElement = ERROR_TEMPLATE.querySelector('.error').cloneNode(true);
    var errorButton = ERROR_TEMPLATE.querySelector('.error__button');
    errorButton.focus();
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      errorElement.remove();
    });
    document.addEventListener('click', function (evt) {
      evt.preventDefault();
      errorElement.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        errorElement.remove();
      }
    });
    MAIN.insertAdjacentElement('afterbegin', errorElement);
  };

  return {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
  };
})();

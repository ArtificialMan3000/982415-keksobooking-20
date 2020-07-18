'use strict';

// Модуль сообщений
window.notice = (function () {
  var MAIN = document.querySelector('main');
  var SUCCESS_TEMPLATE = document.querySelector('#success').content;
  var ERROR_TEMPLATE = document.querySelector('#error').content;

  // Показывает сообщение об успехе
  var showSuccessMessage = function () {
    var successElem = SUCCESS_TEMPLATE.querySelector('.success').cloneNode(true);
    document.addEventListener('click', function (evt) {
      evt.preventDefault();
      successElem.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        successElem.remove();
      }
    });
    MAIN.insertAdjacentElement('afterbegin', successElem);
  };

  // Показывает сообщение об успехе
  var showErrorMessage = function () {
    var errorElem = ERROR_TEMPLATE.querySelector('.error').cloneNode(true);
    var errorButton = ERROR_TEMPLATE.querySelector('.error__button');
    errorButton.focus();
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      errorElem.remove();
    });
    document.addEventListener('click', function (evt) {
      evt.preventDefault();
      errorElem.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        errorElem.remove();
      }
    });
    MAIN.insertAdjacentElement('afterbegin', errorElem);
  };

  return {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
  };
})();

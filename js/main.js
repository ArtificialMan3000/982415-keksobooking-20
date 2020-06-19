'use strict';

window.main = (function () {
  // Деактивируем сайт
  window.page.deactivate();

  // Активируем сайт
  // window.page.activate();

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log(data);
  };

  window.ajax.load('https://javascript.pages.academy/keksobooking/unknown', onSuccess, onError);

  window.ajax.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);

  window.ajax.load('https://api.github.com/user', onSuccess, onError);
})();

'use strict';

// Модуль данных объявлений
window.data = (function () {
  // Типы объявлений
  var ADVERT_TYPES = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало',
  };
  // Массив объявлений
  var advertData = [];

  // Сохраняает список объявлений
  var setAdvertData = function (data) {
    advertData = data;
  };

  // Получает список объявлений
  var getAdvertData = function () {
    return advertData;
  };

  // Загружает список объявлений с сервера
  var loadAdvertData = function (successHandler, errorHandler) {
    if (!errorHandler) {
      errorHandler = function (message) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = message;
        document.body.insertAdjacentElement('afterbegin', node);
      };
    }
    var successHandlerSupplemented;
    if (!successHandler) {
      successHandlerSupplemented = function (data) {
        window.data.setAdvertData(data);
      };
    } else {
      successHandlerSupplemented = function (data) {
        successHandler(data);
        window.data.setAdvertData(data);
      };
    }

    window.ajax.load('https://javascript.pages.academy/keksobooking/data', successHandlerSupplemented, errorHandler);
  };

  // Отправляет данные формы на сервер
  var uploadAdvertFormData = function (successHandler, errorHandler) {
    var advertFormData = new FormData(window.advertForm.AD_FORM);
    if (!successHandler) {
      successHandler = function () {
        window.notice.showSuccessMessage();
      };
    }
    if (!errorHandler) {
      errorHandler = function () {
        window.notice.showErrorMessage();
      };
    }
    window.ajax.upload(advertFormData, 'https://javascript.pages.academy/keksobooking', successHandler, errorHandler);
  };


  return {
    ADVERT_TYPES: ADVERT_TYPES,
    setAdvertData: setAdvertData,
    getAdvertData: getAdvertData,
    loadAdvertData: loadAdvertData,
    uploadAdvertFormData: uploadAdvertFormData,
  };
})();

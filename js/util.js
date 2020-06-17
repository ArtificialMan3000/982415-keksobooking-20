'use strict';

// Утилитарные функции
window.util = (function () {
  // Получает случайное число в указанном диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  };

  // Получает случайный элемент массива
  var getRandomArrayElement = function (arr) {
    if (arr) {
      var arrIndex = window.util.getRandomNumber(0, arr.length - 1);
      return arr[arrIndex];
    } else {
      return false;
    }
  };

  // Генерирует массив случайной длины из заданного
  var generateRandomArray = function (arr) {
    var resArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (window.util.getRandomNumber(0, 1)) {
        resArr.push(arr[i]);
      }
    }
    return resArr;
  };

  // Делает первый символ строки заглавным
  var uppercaseFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  };

  // Блокирует или активирует все поля формы
  var toggleForm = function (form, disable) {
    if (!form) {
      return;
    }
    var formInputs = form.querySelectorAll('input');
    var formSelects = form.querySelectorAll('select');
    var formTextareas = form.querySelectorAll('textarea');
    var formButtons = form.querySelectorAll('button');

    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = disable;
    }
    for (i = 0; i < formSelects.length; i++) {
      formSelects[i].disabled = disable;
    }
    for (i = 0; i < formTextareas.length; i++) {
      formTextareas[i].disabled = disable;
    }
    for (i = 0; i < formButtons.length; i++) {
      formButtons[i].disabled = disable;
    }
  };

  return {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    generateRandomArray: generateRandomArray,
    uppercaseFirstLetter: uppercaseFirstLetter,
    toggleForm: toggleForm,
  };
})();

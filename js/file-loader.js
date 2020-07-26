'use strict';

// Модуль загрузки пользовательских файлов
window.fileLoader = (function () {

  // Читает загруженное пользовательское изображение
  var readFile = function (file, callback) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      callback(reader.result);
    });
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Ошибка: "Невозможно прочитать пользовательский файл"');
    }
  };

  return {
    readFile: readFile
  };
})();

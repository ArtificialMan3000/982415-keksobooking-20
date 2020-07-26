'use strict';

// Модуль загрузки пользовательских файлов
window.fileLoader = (function () {

  // Читает загруженное пользовательское изображение
  var readFile = function (file, callback) {
    if (file) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        callback(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  return {
    readFile: readFile
  };
})();

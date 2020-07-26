'use strict';

// Модуль валидации
window.validation = (function () {
  // Помечает поле красной рамкой, если оно невалидно
  var markField = function (field) {
    if (field.validity.valid) {
      field.classList.remove('ad-form__input--invalid');
    } else {
      field.classList.add('ad-form__input--invalid');
    }
  };

  // Проверяет поле выбора количества гостей на валидность
  var checkCapacityFieldValidity = function () {
    var capacityField = window.advertForm.CAPACITY_FIELD;
    var isCapacityFieldValid = true;
    for (var i = 0; i < capacityField.length; i++) {
      if (capacityField[i].disabled === true && capacityField.value === capacityField[i].value) {
        isCapacityFieldValid = false;
      }
    }
    if (isCapacityFieldValid) {
      capacityField.setCustomValidity('');
      capacityField.reportValidity();
      return true;
    } else {
      capacityField.setCustomValidity('Выберите разрешённое количество гостей');
      capacityField.reportValidity();
      return false;
    }
  };

  // Проверяет валидность загруженных изображений
  var checkImagesValidity = function (images) {
    for (var i = 0; i < images.length; i++) {
      if (images[i].type !== 'image/jpeg' && images[i].type !== 'image/png') {
        return false;
      }
    }
    return true;
  };

  // Проверяет валидность аватара
  var checkAvatarValidity = function () {
    var avatarField = window.advertForm.AVATAR_FIELD;
    if (!checkImagesValidity(avatarField.files)) {
      avatarField.setCustomValidity('Аватар может быть только изображением в формате jpg или png');
      avatarField.reportValidity();
      return false;
    } else {
      avatarField.setCustomValidity('');
      avatarField.reportValidity();
      return true;
    }
  };
  // Проверяет валидность фотографий
  var checkPhotosValidity = function () {
    var photosField = window.advertForm.IMAGES_FIELD;
    if (!checkImagesValidity(photosField.files)) {
      photosField.setCustomValidity('Фотографии могут быть только изображениями в формате jpg или png');
      photosField.reportValidity();
      return false;
    } else {
      photosField.setCustomValidity('');
      photosField.reportValidity();
      return true;
    }
  };

  return {
    markField: markField,
    checkCapacityFieldValidity: checkCapacityFieldValidity,
    checkAvatarValidity: checkAvatarValidity,
    checkPhotosValidity: checkPhotosValidity
  };
})();

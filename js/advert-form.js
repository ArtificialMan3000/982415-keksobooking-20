'use strict';

// Модуль формы добавления объявления
window.advertForm = (function () {
  // Форма и поля формы
  var AD_FORM = document.querySelector('.ad-form');
  var AVATAR_FIELD = AD_FORM.querySelector('#avatar');
  // var TITLE_FIELD = AD_FORM.querySelector('#title');
  var ADDRESS_FIELD = AD_FORM.querySelector('#address');
  var TYPE_FIELD = AD_FORM.querySelector('#type');
  var PRICE_FIELD = AD_FORM.querySelector('#price');
  var TIMEIN_FIELD = AD_FORM.querySelector('#timein');
  var TIMEOUT_FIELD = AD_FORM.querySelector('#timeout');
  var ROOM_NUMBER_FIELD = AD_FORM.querySelector('#room_number');
  var CAPACITY_FIELD = AD_FORM.querySelector('#capacity');
  var IMAGES_FIELD = AD_FORM.querySelector('#images');
  // Текущее значение поля адрес
  var currAddress = '';

  // Отключает форму
  var disableAdvertForm = function () {
    window.util.toggleForm(AD_FORM, true);
  };

  // Включает форму
  var enableAdvertForm = function () {
    window.util.toggleForm(AD_FORM, false);
    // Оставляем поле адреса заблокированным
    // ADDRESS_FIELD.disabled = true;
  };

  // Убирает затенение с формыы
  var uncoverAdvertForm = function () {
    AD_FORM.classList.remove('ad-form--disabled');
  };

  // Затененяет форму
  var coverAdvertForm = function () {
    AD_FORM.classList.add('ad-form--disabled');
  };

  // Устанавливает значение в поле адреса
  var setAddressValue = function () {
    var coords = window.pin.getPinCoords();
    coords.x = Math.round(coords.x);
    coords.y = Math.round(coords.y);

    currAddress = coords.x + ', ' + coords.y;
    ADDRESS_FIELD.value = currAddress;
    return currAddress;
  };

  // Устанавливает минимальное значение цены
  var setMinPriceValue = function () {
    var minPrice = 0;
    switch (TYPE_FIELD.value) {
      case 'flat': {
        minPrice = 1000;
        break;
      }
      case 'house': {
        minPrice = 5000;
        break;
      }
      case 'palace': {
        minPrice = 10000;
        break;
      }
      default:
        minPrice = 0;
    }
    PRICE_FIELD.min = minPrice;
    PRICE_FIELD.placeholder = minPrice;
  };

  // Устаналивет соответствующее время выезда
  var setCheckoutValue = function () {
    for (var i = 0; i < TIMEOUT_FIELD.length; i++) {
      if (TIMEOUT_FIELD[i].value === TIMEIN_FIELD.value) {
        TIMEOUT_FIELD[i].selected = true;
      }
    }
  };

  // Устаналивет соответствующее время заезда
  var setCheckinValue = function () {
    for (var i = 0; i < TIMEIN_FIELD.length; i++) {
      if (TIMEIN_FIELD[i].value === TIMEOUT_FIELD.value) {
        TIMEIN_FIELD[i].selected = true;
      }
    }
  };

  // Отключает варианты выбора количества гостей
  var disableCapacityVariants = function () {
    for (var i = 0; i < CAPACITY_FIELD.length; i++) {
      CAPACITY_FIELD[i].disabled = true;
    }
  };

  // Устанавливает разрешённые варианты выбора количества гостей
  var setCapacityVariants = function () {
    disableCapacityVariants();
    switch (ROOM_NUMBER_FIELD.value) {
      case '100':
        for (var i = 0; i < CAPACITY_FIELD.length; i++) {
          if (CAPACITY_FIELD[i].value === '0') {
            CAPACITY_FIELD[i].disabled = false;
          }
        }
        break;
      case '3':
        for (i = 0; i < CAPACITY_FIELD.length; i++) {
          if (CAPACITY_FIELD[i].value <= 3 && CAPACITY_FIELD[i].value !== '0') {
            CAPACITY_FIELD[i].disabled = false;
          }
        }
        break;
      case '2':
        for (i = 0; i < CAPACITY_FIELD.length; i++) {
          if (CAPACITY_FIELD[i].value <= 2 && CAPACITY_FIELD[i].value !== '0') {
            CAPACITY_FIELD[i].disabled = false;
          }
        }
        break;
      case '1':
        for (i = 0; i < CAPACITY_FIELD.length; i++) {
          if (CAPACITY_FIELD[i].value <= 1 && CAPACITY_FIELD[i].value !== '0') {
            CAPACITY_FIELD[i].disabled = false;
          }
        }
    }
  };

  // Инициализирует форму
  var initAdvertForm = function () {
    // Устанавливаем адрес главной метки
    setAddressValue();
    // Устанавливаем минимальное значение цены
    setMinPriceValue();
    // Устанавлием время выезда, соответствующее времени заезда
    setCheckoutValue();
    // Устанавливаем разрешённые варианты выбора количества гостей
    setCapacityVariants();

    // Запрещаем изменять вручную поле адреса
    ADDRESS_FIELD.addEventListener('input', function () {
      ADDRESS_FIELD.value = currAddress;
    });

    // При изменении типа жилья устанавливаем новую минимальную цену
    TYPE_FIELD.addEventListener('change', function () {
      setMinPriceValue();
    });

    // При изменении времени заезда, устанавливаем новое время выезда
    TIMEIN_FIELD.addEventListener('change', function () {
      setCheckoutValue();
    });

    // При изменении времени выезда, устанавливаем новое время заезда
    TIMEOUT_FIELD.addEventListener('change', function () {
      setCheckinValue();
    });

    // При изменени количества комнат, устанавливаем разрешённые варианты выбора количества гостей
    ROOM_NUMBER_FIELD.addEventListener('change', function () {
      setCapacityVariants();
    });

    // Устанавливаем правила для валидации формы
    setAdvertFormValidation();
  };

  // Проверяет поле выбора количества гостей на валидность
  var checkCapacityFieldValidity = function () {
    var isCapacityFieldValid = true;
    for (var i = 0; i < CAPACITY_FIELD.length; i++) {
      if (CAPACITY_FIELD[i].disabled === true && CAPACITY_FIELD.value === CAPACITY_FIELD[i].value) {
        isCapacityFieldValid = false;
      }
    }
    if (isCapacityFieldValid) {
      CAPACITY_FIELD.setCustomValidity('');
      CAPACITY_FIELD.reportValidity();
      return true;
    } else {
      CAPACITY_FIELD.setCustomValidity('Выберите разрешённое количество гостей');
      CAPACITY_FIELD.reportValidity();
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

  // Устанавливает правила для валидации формы
  var setAdvertFormValidation = function () {
    // Проверка, является ли загруженный аватар изображением
    AVATAR_FIELD.addEventListener('change', function (evt) {
      if (!checkImagesValidity(evt.target.files)) {
        evt.target.setCustomValidity('Аватар может быть только изображением в формате jpg или png');
        evt.target.reportValidity();
      } else {
        evt.target.setCustomValidity('');
        evt.target.reportValidity();
      }
    });

    // Проверка, являются ли загруженные фотографии изображениями
    IMAGES_FIELD.addEventListener('change', function (evt) {
      if (!checkImagesValidity(evt.target.files)) {
        evt.target.setCustomValidity('Фотографии могут быть только изображениями в формате jpg или png');
        evt.target.reportValidity();
      } else {
        evt.target.setCustomValidity('');
        evt.target.reportValidity();
      }
    });

    // При изменении значения поля выбора количества комнат
    // проверяем на валидность поле выбора количества гостей
    ROOM_NUMBER_FIELD.addEventListener('change', function () {
      checkCapacityFieldValidity();
    });

    // При изменении значения поля выбора количества гостей проверяем его на валидность
    CAPACITY_FIELD.addEventListener('change', function () {
      checkCapacityFieldValidity();
    });

    // Дополнительные проверки на валидность при отправке формы
    AD_FORM.addEventListener('submit', function (evt) {
      if (!checkCapacityFieldValidity()) {
        evt.preventDefault();
      }
      AD_FORM.reportValidity();
    });
  };

  initAdvertForm();

  return {
    disableAdvertForm: disableAdvertForm,
    enableAdvertForm: enableAdvertForm,
    uncoverAdvertForm: uncoverAdvertForm,
    coverAdvertForm: coverAdvertForm,
    setAddressValue: setAddressValue,
  };
})();

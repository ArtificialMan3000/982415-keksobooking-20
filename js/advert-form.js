'use strict';

// Модуль формы добавления объявления
window.advertForm = (function () {
  // Форма и поля формы
  var ADVERT_FORM = document.querySelector('.ad-form');
  var SUBMIT_BUTTON = ADVERT_FORM.querySelector('.ad-form__submit');
  var RESET_BUTTON = ADVERT_FORM.querySelector('.ad-form__reset');
  var AVATAR_FIELD = ADVERT_FORM.querySelector('#avatar');
  var TITLE_FIELD = ADVERT_FORM.querySelector('#title');
  var ADDRESS_FIELD = ADVERT_FORM.querySelector('#address');
  var TYPE_FIELD = ADVERT_FORM.querySelector('#type');
  var PRICE_FIELD = ADVERT_FORM.querySelector('#price');
  var TIMEIN_FIELD = ADVERT_FORM.querySelector('#timein');
  var TIMEOUT_FIELD = ADVERT_FORM.querySelector('#timeout');
  var ROOM_NUMBER_FIELD = ADVERT_FORM.querySelector('#room_number');
  var CAPACITY_FIELD = ADVERT_FORM.querySelector('#capacity');
  var IMAGES_FIELD = ADVERT_FORM.querySelector('#images');

  // Элементы для показа аватара и фотографии
  var AVATAR_PREVIEW = ADVERT_FORM.querySelector('.ad-form-header__preview img');
  var IMAGES_PREVIEW_DIV = ADVERT_FORM.querySelector('.ad-form__photo');
  var imagesPreviewImg = null;

  // Текущее значение поля адрес
  var currentAddress = '';

  // Минимальные значения для поля цены
  var MinPriceValues = {
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
    BUNGALO: 0
  };

  // Отключает форму
  var disableAdvertForm = function () {
    window.util.toggleForm(ADVERT_FORM, true);
  };

  // Включает форму
  var enableAdvertForm = function () {
    window.util.toggleForm(ADVERT_FORM, false);
  };

  // Убирает затенение с формыы
  var uncoverAdvertForm = function () {
    ADVERT_FORM.classList.remove('ad-form--disabled');
  };

  // Затеняет форму
  var coverAdvertForm = function () {
    ADVERT_FORM.classList.add('ad-form--disabled');
  };

  // Сбрасывает форму
  var resetAdvertForm = function () {
    ADVERT_FORM.reset();

    // Устанавливаем адрес главной метки
    setAddressValue();
    // Устанавливаем минимальное значение цены
    setMinPriceValue();
    // Устанавлием время выезда, соответствующее времени заезда
    setCheckoutValue();
    // Устанавливаем разрешённые варианты выбора количества гостей
    setCapacityVariants();
    // Блокируем форму
    disableAdvertForm();
    // Затеняем форму
    coverAdvertForm();
  };

  // Устанавливает значение в поле адреса
  var setAddressValue = function () {
    var coords = window.pin.getPinCoords();
    coords.x = Math.round(coords.x);
    coords.y = Math.round(coords.y);

    currentAddress = coords.x + ', ' + coords.y;
    ADDRESS_FIELD.value = currentAddress;
    return currentAddress;
  };

  // Устанавливает минимальное значение цены
  var setMinPriceValue = function () {
    var minPrice = 0;
    switch (TYPE_FIELD.value) {
      case 'flat': {
        minPrice = MinPriceValues.FLAT;
        break;
      }
      case 'house': {
        minPrice = MinPriceValues.HOUSE;
        break;
      }
      case 'palace': {
        minPrice = MinPriceValues.PALACE;
        break;
      }
      default:
        minPrice = MinPriceValues.BUNGALO;
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
          if (CAPACITY_FIELD[i].value === '1') {
            CAPACITY_FIELD[i].disabled = false;
          }
        }
    }
  };

  // Отображает аватар пользователя
  var showAvatar = function (image) {
    AVATAR_PREVIEW.src = image;
  };

  // Отображает фотографию жилья
  var showPhoto = function (image) {
    if (!imagesPreviewImg) {
      imagesPreviewImg = IMAGES_PREVIEW_DIV.querySelector('img');
      imagesPreviewImg = document.createElement('img');
      imagesPreviewImg.width = 70;
      imagesPreviewImg.height = 70;
      imagesPreviewImg.alt = 'Фотография жилья';
    }
    imagesPreviewImg.src = image;
    IMAGES_PREVIEW_DIV.appendChild(imagesPreviewImg);
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
      ADDRESS_FIELD.value = currentAddress;
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

    // Сброс формы
    RESET_BUTTON.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.page.deactivate();
    });

    // Устанавливаем правила для валидации формы
    setAdvertFormValidation();
  };

  // Устанавливает правила для валидации формы
  var setAdvertFormValidation = function () {
    // Проверка, является ли загруженный аватар изображением
    AVATAR_FIELD.addEventListener('change', function () {
      if (window.validation.checkAvatarValidity()) {
        window.fileLoader.readFile(AVATAR_FIELD.files[0], showAvatar);
      }
    });

    // Проверка, являются ли загруженные фотографии изображениями
    IMAGES_FIELD.addEventListener('change', function () {
      if (window.validation.checkPhotosValidity()) {
        window.fileLoader.readFile(IMAGES_FIELD.files[0], showPhoto);
      }
    });

    // При изменении значения поля выбора количества комнат
    // проверяем на валидность поле выбора количества гостей
    ROOM_NUMBER_FIELD.addEventListener('change', function () {
      window.validation.checkCapacityFieldValidity();
    });

    // При изменении значения поля выбора количества гостей проверяем его на валидность
    CAPACITY_FIELD.addEventListener('change', function () {
      window.validation.checkCapacityFieldValidity();
    });

    // Дополнительные проверки на валидность при отправке формы
    SUBMIT_BUTTON.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (window.validation.checkCapacityFieldValidity() && ADVERT_FORM.reportValidity()) {
        window.data.uploadAdvertFormData(function () {
          window.notice.showSuccessMessage();
          window.page.deactivate();
        });
      }
      // Помечаем красной рамкой невалидные поля
      window.validation.markField(AVATAR_FIELD);
      window.validation.markField(TITLE_FIELD);
      window.validation.markField(ADDRESS_FIELD);
      window.validation.markField(TYPE_FIELD);
      window.validation.markField(PRICE_FIELD);
      window.validation.markField(TIMEIN_FIELD);
      window.validation.markField(TIMEOUT_FIELD);
      window.validation.markField(ROOM_NUMBER_FIELD);
      window.validation.markField(CAPACITY_FIELD);
      window.validation.markField(IMAGES_FIELD);
    });
  };

  initAdvertForm();

  return {
    ADVERT_FORM: ADVERT_FORM,
    CAPACITY_FIELD: CAPACITY_FIELD,
    AVATAR_FIELD: AVATAR_FIELD,
    IMAGES_FIELD: IMAGES_FIELD,
    disableAdvertForm: disableAdvertForm,
    enableAdvertForm: enableAdvertForm,
    uncoverAdvertForm: uncoverAdvertForm,
    coverAdvertForm: coverAdvertForm,
    resetAdvertForm: resetAdvertForm,
    setAddressValue: setAddressValue,
  };
})();

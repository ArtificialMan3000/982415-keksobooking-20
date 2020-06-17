'use strict';

// Фильтры
var MAP_FILTERS = document.querySelector('.map__filters');
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
// Активна ли страница
var isActive = false;

// Деактивирует сайт
var deactivate = function () {
  // Блокируем поля формы и фильтров
  toggleForm(AD_FORM, true);
  toggleForm(MAP_FILTERS, true);
  isActive = false;
};

// Активирует сайт
var activate = function (advertsData) {
  // Разблокируем поля формы и фильтров
  toggleForm(AD_FORM, false);
  toggleForm(MAP_FILTERS, false);
  // Оставляем поле адреса заблокированным
  ADDRESS_FIELD.disabled = true;
  // Убираем затенение с карты
  window.map.MAP.classList.remove('map--faded');
  // Убираем затенение с формы
  AD_FORM.classList.remove('ad-form--disabled');
  // Отрисовываем метки
  renderPins(advertsData);
  isActive = true;
};

// Устанавливает значение в поле адреса
var setAddressValue = function () {
  var address = getPinCoords();
  ADDRESS_FIELD.value = address.x + ', ' + address.y;
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

// Деактивируем сайт
deactivate();

// Устанавливаем адрес главной метки
setAddressValue();
// Устанавливаем минимальное значение цены
setMinPriceValue();
// Устанавлием время выезда, соответствующее времени заезда
setCheckoutValue();
// Устанавливаем разрешённые варианты выбора количества гостей
setCapacityVariants();

var firstAdvertData = window.data.advertsData[0];
// Создаём карточку объявления
advertCard.openAdvertCard(firstAdvertData);

// Активируем сайт при взаимодействии с главной меткой
activate(advertsData);
MAP_PIN_MAIN.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activate(advertsData);
    setAddressValue();
  }
});
MAP_PIN_MAIN.addEventListener('click', function () {
  activate(advertsData);
  setAddressValue();
});

// Валидация
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
  // Проверяем поле выбора количества гостей на валидность
  checkCapacityFieldValidity();
});

AVATAR_FIELD.addEventListener('change', function (evt) {
  if (evt.target.files[0].type !== 'image/jpeg' && evt.target.files[0].type !== 'image/png') {
    evt.target.setCustomValidity('Аватар может быть только изображением в формате jpg или png');
    evt.target.reportValidity();
  }
});

IMAGES_FIELD.addEventListener('change', function (evt) {
  for (var i = 0; i < evt.target.files.length; i++) {
    if (evt.target.files[i].type !== 'image/jpeg' && evt.target.files[i].type !== 'image/png') {
      evt.target.setCustomValidity('Фотографии могут быть только изображениями в формате jpg или png');
      evt.target.reportValidity();
    }
  }
});

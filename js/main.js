'use strict';

// Типы объявлений
var ADVERT_TYPES = {
  'palace': 'дворец',
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало',
};
// Шаблон карточки объявления
var CARD_TEMPLATE = document.querySelector('#card').content;
// Карта
var MAP = document.querySelector('.map');
// Главная метка
var MAP_PIN_MAIN = MAP.querySelector('.map__pin--main');
// Размеры главной метки в пикселях
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 84;
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

// Получает случайное число в указанном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

// Получает случайный элемент массива
var getRandomArrayElement = function (arr) {
  if (arr) {
    var arrIndex = getRandomNumber(0, arr.length - 1);
    return arr[arrIndex];
  } else {
    return false;
  }
};

// Генерирует массив случайной длины из заданного
var generateRandomArray = function (arr) {
  var resArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (getRandomNumber(0, 1)) {
      resArr.push(arr[i]);
    }
  }
  return resArr;
};

// Делает первый символ строки заглавным
var uppercaseFirstLetter = function (str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

// Генерирует массив из 8 случайных объявлений
var generateAdvertData = function () {
  var advertsData = [];
  var advertTypesEng = Object.keys(ADVERT_TYPES);
  var roomsData = [
    {
      'roomsCount': 1,
      'guestsCount': 1
    },
    {
      'roomsCount': 2,
      'guestsCount': 2
    },
    {
      'roomsCount': 3,
      'guestsCount': 3
    },
    {
      'roomsCount': 100,
      'guestsCount': 0
    },
  ];
  var checkinData = ['12:00', '13:00', '14:00'];
  // var checkoutData = ['12:00', '13:00', '14:00'];
  var featuresData = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosData = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  for (var i = 0; i < 8; i++) {
    var advertData = {};
    var advertNumber = i + 1;
    var location = {
      x: getRandomNumber(0, MAP.offsetWidth),
      y: getRandomNumber(130, 630)
    };
    var roomData = getRandomArrayElement(roomsData);
    var time = getRandomArrayElement(checkinData);

    advertData.author = {
      'avatar': 'img/avatars/user0' + advertNumber + '.png'
    };
    advertData.offer = {
      'title': 'Объявление ' + advertNumber,
      'address': location.x + ', ' + location.y,
      'price': getRandomNumber(1000, 1000000),
      'type': getRandomArrayElement(advertTypesEng),
      'rooms': roomData.roomsCount,
      'guests': roomData.guestsCount,
      'checkin': time,
      'checkout': time,
      'features': generateRandomArray(featuresData),
      'description': 'Описание ' + advertNumber,
      'photos': generateRandomArray(photosData)
    };
    advertData.location = {
      'x': location.x,
      'y': location.y
    };
    advertsData.push(advertData);
  }
  return advertsData;
};

// Создаёт метку по шаблону на основе переданных данных
var createPin = function (pinData, template) {
  var mapPin = template.querySelector('.map__pin').cloneNode(true);
  var mapPinX = pinData.location.x - (mapPin.offsetWidth / 2);
  var mapPinY = pinData.location.y - mapPin.offsetHeight;
  mapPin.style = 'left: ' + mapPinX + 'px; top: ' + mapPinY + 'px;';

  var img = mapPin.querySelector('img');
  img.src = pinData.author.avatar;
  img.alt = pinData.offer.title;

  // Вешаем на метку обработчик клика, открывающий карточку объявления
  mapPin.addEventListener('click', function () {
    advertCard.openAdvertCard(pinData);
  });

  return mapPin;
};

// Отрисовывает метки на карте
var renderPins = function (data) {
  var pinTemplate = document.querySelector('#pin').content;
  var mapPins = document.querySelector('.map__pins');
  var mapPinFragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    var mapPin = createPin(data[i], pinTemplate);
    mapPinFragment.appendChild(mapPin);
  }

  mapPins.appendChild(mapPinFragment);
};

// Объект карточки объявления
var advertCard = {
  // Текущий элемент карточки объявления
  // mapCard: CARD_TEMPLATE.querySelector('.map__card').cloneNode(true),
  // Создаёт и открывает карточку объявления
  openAdvertCard: function (data) {
    // Удаляем предыдущую карточку
    if (this.mapCard) {
      this.removeAdvertCard();
    }
    // Создаём и заполняем карточку объявления
    this.mapCard = CARD_TEMPLATE.querySelector('.map__card').cloneNode(true);
    this.fillAdvertCard(data, this.mapCard);
    // Добавляем обработчики события
    this.addAdvertCardHandlers();
    // Выводим попап объявления на карту
    var mapPins = document.querySelector('.map .map__pins');
    mapPins.insertAdjacentElement('afterend', this.mapCard);
  },
  // Заполняет карточку объявления из переданных данных
  fillAdvertCard: function (data, template) {
    var popupTitle = template.querySelector('.popup__title');
    var popupAddress = template.querySelector('.popup__text--address');
    var popupPrice = template.querySelector('.popup__text--price');
    var popupType = template.querySelector('.popup__type');
    var popupCapacity = template.querySelector('.popup__text--capacity');
    var popupTime = template.querySelector('.popup__text--time');
    var popupFeatures = template.querySelector('.popup__features');
    var popupDescription = template.querySelector('.popup__description');
    var popupPhotos = template.querySelector('.popup__photos');
    var photoItem = popupPhotos.querySelector('.popup__photo');
    var popupAvatar = template.querySelector('.popup__avatar');

    if (data.offer.title) {
      popupTitle.textContent = data.offer.title;
    } else {
      popupTitle.remove();
    }

    if (data.offer.address) {
      popupAddress.textContent = data.offer.address;
    } else {
      popupAddress.remove();
    }

    if (data.offer.price) {
      popupPrice.textContent = data.offer.price + ' ₽/ночь';
    } else {
      popupPrice.remove();
    }

    if (data.offer.type) {
      popupType.textContent = uppercaseFirstLetter(ADVERT_TYPES[data.offer.type]);
    } else {
      popupType.remove();
    }

    if (data.offer.rooms && data.offer.guests) {
      popupCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    } else {
      popupCapacity.remove();
    }

    if (data.offer.checkin && data.offer.checkout) {
      popupTime.textContent = 'Заезд после' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    } else {
      popupTime.remove();
    }

    // Создаём и вставляем список удобств
    if (data.offer.features.length) {
      var featuresFragment = document.createDocumentFragment();
      for (var i = 0; i < data.offer.features.length; i++) {
        var featureItem = document.createElement('li');
        featureItem.classList = 'popup__feature popup__feature--' + data.offer.features[i];
        featuresFragment.appendChild(featureItem);
      }
      popupFeatures.innerHTML = '';
      popupFeatures.appendChild(featuresFragment);
    } else {
      popupFeatures.remove();
    }

    if (data.offer.description) {
      popupDescription.textContent = data.offer.description;
    } else {
      popupDescription.remove();
    }

    // Создаём и вставляем список фотографий
    if (data.offer.photos.length) {
      var photosFragment = document.createDocumentFragment();
      for (i = 0; i < data.offer.photos.length; i++) {
        var currPhotoItem = photoItem.cloneNode();
        currPhotoItem.src = data.offer.photos[i];
        photosFragment.appendChild(currPhotoItem);
      }
      popupPhotos.innerHTML = '';
      popupPhotos.appendChild(photosFragment);
    } else {
      popupPhotos.remove();
    }

    if (data.author.avatar) {
      popupAvatar.src = data.author.avatar;
    } else {
      popupAvatar.remove();
    }
  },
  // Добавляет обработчики событий на карточку объявления
  addAdvertCardHandlers: function () {
    var closeButton = this.mapCard.querySelector('.popup__close');

    var removeAdvertCard = this.removeAdvertCard.bind(this);
    closeButton.addEventListener('click', function () {
      removeAdvertCard();
    });

    this.advertCardEscPressHandlerCallback = this.advertCardEscPressHandler.bind(this);
    document.addEventListener('keydown', this.advertCardEscPressHandlerCallback);
  },

  // Удаляет карточку объявления
  removeAdvertCard: function () {
    this.mapCard.remove();
    document.removeEventListener('keydown', this.advertCardEscPressHandlerCallback);
  },

  advertCardEscPressHandler: function () {
    this.removeAdvertCard();
  },
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
  MAP.classList.remove('map--faded');
  // Убираем затенение с формы
  AD_FORM.classList.remove('ad-form--disabled');
  // Отрисовываем метки
  renderPins(advertsData);
  isActive = true;
};

// Определение координаты главной метки
var getPinCoords = function () {
  var coords = {};
  if (!isActive) {
    coords.x = MAP_PIN_MAIN.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
    coords.y = MAP_PIN_MAIN.offsetTop + MAP_PIN_MAIN_WIDTH / 2;
  } else {
    coords.x = MAP_PIN_MAIN.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
    coords.y = MAP_PIN_MAIN.offsetTop + MAP_PIN_MAIN_HEIGHT;
  }
  return coords;
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

// Генерируем массив объявлений
var advertsData = generateAdvertData();
var firstAdvertData = advertsData[0];
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

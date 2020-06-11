'use strict';

// var ADVERT_TYPES = [
//   {
//     'eng': 'palace',
//     'rus': 'дворец'
//   },
//   {
//     'eng': 'flat',
//     'rus': 'квартира'
//   },
//   {
//     'eng': 'house',
//     'rus': 'дом'
//   },
//   {
//     'eng': 'bungalo',
//     'rus': 'бунгало'
//   },
// ];
var ADVERT_TYPES = {
  'palace': 'дворец',
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало',
};
var MAP = document.querySelector('.map');
var AD_FORM = document.querySelector('.ad-form');
var ADDRESS_FIELD = AD_FORM.querySelector('#address');
var MAP_FILTERS = document.querySelector('.map__filters');
// Главная метка
var MAP_PIN_MAIN = MAP.querySelector('.map__pin--main');
// Размеры главной метки в пикселях
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 84;
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
// var uppercaseFirstLetter = function (str) {
//   return str.charAt(0).toUpperCase() + str.substring(1);
// };

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

// Заполняет карточку объявления из переданных данных
// var fillAdvertCard = function (data, template) {
//   var popupTitle = template.querySelector('.popup__title');
//   var popupAddress = template.querySelector('.popup__text--address');
//   var popupPrice = template.querySelector('.popup__text--price');
//   var popupType = template.querySelector('.popup__type');
//   var popupCapacity = template.querySelector('.popup__text--capacity');
//   var popupTime = template.querySelector('.popup__text--time');
//   var popupFeatures = template.querySelector('.popup__features');
//   var popupDescription = template.querySelector('.popup__description');
//   var popupPhotos = template.querySelector('.popup__photos');
//   var photoItem = popupPhotos.querySelector('.popup__photo');
//   var popupAvatar = template.querySelector('.popup__avatar');

//   if (data.offer.title) {
//     popupTitle.textContent = data.offer.title;
//   } else {
//     popupTitle.remove();
//   }

//   if (data.offer.address) {
//     popupAddress.textContent = data.offer.address;
//   } else {
//     popupAddress.remove();
//   }

//   if (data.offer.price) {
//     popupPrice.textContent = data.offer.price + ' ₽/ночь';
//   } else {
//     popupPrice.remove();
//   }

//   if (data.offer.type) {
//     popupType.textContent = uppercaseFirstLetter(ADVERT_TYPES[data.offer.type]);
//   } else {
//     popupType.remove();
//   }

//   if (data.offer.rooms && data.offer.guests) {
//     popupCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
//   } else {
//     popupCapacity.remove();
//   }

//   if (data.offer.checkin && data.offer.checkout) {
//     popupTime.textContent = 'Заезд после' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
//   } else {
//     popupTime.remove();
//   }

//   // Создаём и вставляем список удобств
//   if (data.offer.features.length) {
//     var featuresFragment = document.createDocumentFragment();
//     for (var i = 0; i < data.offer.features.length; i++) {
//       var featureItem = document.createElement('li');
//       featureItem.classList = 'popup__feature popup__feature--' + data.offer.features[i];
//       featuresFragment.appendChild(featureItem);
//     }
//     popupFeatures.innerHTML = '';
//     popupFeatures.appendChild(featuresFragment);
//   } else {
//     popupFeatures.remove();
//   }

//   if (data.offer.description) {
//     popupDescription.textContent = data.offer.description;
//   } else {
//     popupDescription.remove();
//   }

//  // Создаём и вставляем список фотографий
//   if (data.offer.photos.length) {
//     var photosFragment = document.createDocumentFragment();
//     for (i = 0; i < data.offer.photos.length; i++) {
//       var currPhotoItem = photoItem.cloneNode();
//       currPhotoItem.src = data.offer.photos[i];
//       photosFragment.appendChild(currPhotoItem);
//     }
//     popupPhotos.innerHTML = '';
//     popupPhotos.appendChild(photosFragment);
//   } else {
//     popupPhotos.remove();
//   }

//   if (data.author.avatar) {
//     popupAvatar.src = data.author.avatar;
//   } else {
//     popupAvatar.remove();
//   }
// };

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
var setAddress = function () {
  var address = getPinCoords();
  ADDRESS_FIELD.value = address.x + ', ' + address.y;
};

// Деактивируем сайт
deactivate();

// Устанавливаем адрес главной метки
setAddress();

// Генерируем массив объявлений
var advertsData = generateAdvertData();
// console.log(advertsData);

// Заполняем карточку объявления
// var firstAdvertData = advertsData[0];
// var cardTemplate = document.querySelector('#card').content;
// var mapCard = cardTemplate.querySelector('.map__card').cloneNode(true);
// fillAdvertCard(firstAdvertData, mapCard);

// Выводим попап объявления на карту
// var mapPins = document.querySelector('.map .map__pins');
// mapPins.insertAdjacentElement('afterend', mapCard);

// Активируем сайт при взаимодействии с главной меткой
MAP_PIN_MAIN.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activate(advertsData);
    setAddress();
  }
});
MAP_PIN_MAIN.addEventListener('click', function () {
  activate(advertsData);
  setAddress();
});

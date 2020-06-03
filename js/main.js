'use strict';

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

// Генерирует массив из 8 случайных объявлений
var generateAdvertData = function () {
  var advertsData = [];
  var advertTypes = ['palace', 'flat', 'house', 'bungalo'];
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
      x: getRandomNumber(0, document.querySelector('.map').offsetWidth),
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
      'type': getRandomArrayElement(advertTypes),
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

// Генерируем массив объявлений
var advertsData = generateAdvertData();
// console.log(advertsData);

// Убираем затенение с карты
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Отрисовываем метки
renderPins(advertsData);

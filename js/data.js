'use strict';

// Модуль данных объявлений
window.data = (function () {
  // Типы объявлений
  var ADVERT_TYPES = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало',
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
        x: window.util.getRandomNumber(0, window.map.MAP.offsetWidth),
        y: window.util.getRandomNumber(130, 630)
      };
      var roomData = window.util.getRandomArrayElement(roomsData);
      var time = window.util.getRandomArrayElement(checkinData);

      advertData.author = {
        'avatar': 'img/avatars/user0' + advertNumber + '.png'
      };
      advertData.offer = {
        'title': 'Объявление ' + advertNumber,
        'address': location.x + ', ' + location.y,
        'price': window.util.getRandomNumber(1000, 1000000),
        'type': window.util.getRandomArrayElement(advertTypesEng),
        'rooms': roomData.roomsCount,
        'guests': roomData.guestsCount,
        'checkin': time,
        'checkout': time,
        'features': window.util.generateRandomArray(featuresData),
        'description': 'Описание ' + advertNumber,
        'photos': window.util.generateRandomArray(photosData)
      };
      advertData.location = {
        'x': location.x,
        'y': location.y
      };
      advertsData.push(advertData);
    }
    return advertsData;
  };

  // Генерируем массив объявлений
  var advertsData = window.data.generateAdvertData();

  return {
    ADVERT_TYPES: ADVERT_TYPES,
    advertsData: advertsData,
    generateAdvertData: generateAdvertData
  };
})();

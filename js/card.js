'use strict';

// Модуль карточки оъявления
window.card = (function () {
  // Шаблон карточки объявления
  var CARD_TEMPLATE = document.querySelector('#card').content;
  // Карточка объявления
  var card = null;

  // Создаёт карточку объявления
  var createCard = function (data) {
    // Удаляем предыдущую карточку
    if (card) {
      removeCard();
    }
    // Создаём и заполняем карточку объявления
    card = CARD_TEMPLATE.querySelector('.map__card').cloneNode(true);
    fillCard(data);
    // Добавляем обработчики события
    addCardHandlers();

    return card;
  };

  // Заполняет карточку объявления из переданных данных
  var fillCard = function (data) {
    var popupTitle = card.querySelector('.popup__title');
    var popupAddress = card.querySelector('.popup__text--address');
    var popupPrice = card.querySelector('.popup__text--price');
    var popupType = card.querySelector('.popup__type');
    var popupCapacity = card.querySelector('.popup__text--capacity');
    var popupTime = card.querySelector('.popup__text--time');
    var popupFeatures = card.querySelector('.popup__features');
    var popupDescription = card.querySelector('.popup__description');
    var popupPhotos = card.querySelector('.popup__photos');
    var photoItem = popupPhotos.querySelector('.popup__photo');
    var popupAvatar = card.querySelector('.popup__avatar');

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
      popupType.textContent = window.util.uppercaseFirstLetter(window.data.ADVERT_TYPES[data.offer.type]);
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
  };

  // Добавляет обработчики событий на карточку объявления
  var addCardHandlers = function () {
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      removeCard();
    });
    document.addEventListener('keydown', cardEscPressHandler);
  };

  // Удаляет карточку объявления
  var removeCard = function () {
    card.remove();
    document.removeEventListener('keydown', cardEscPressHandler);
  };

  var cardEscPressHandler = function () {
    removeCard();
  };

  return {
    createCard: createCard,
  };
})();

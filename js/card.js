'use strict';

// Модуль карточки оъявления
window.card = (function () {
  // Шаблон карточки объявления
  var CARD_TEMPLATE = document.querySelector('#card').content;

  // Создаёт элемент карточки объявления
  var createAdvertCardElement = function() {
    return CARD_TEMPLATE.querySelector('.map__card').cloneNode(true);
  };

  // Создаёт и открывает карточку объявления
  var openAdvertCard = function (data) {
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
    window.map.MAP.insertAdjacentElement('afterend', this.mapCard);
  };

  // Заполняет карточку объявления из переданных данных
  var fillAdvertCard = function (data, template) {
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
  var addAdvertCardHandlers = function () {
    var closeButton = this.mapCard.querySelector('.popup__close');

    var removeAdvertCard = this.removeAdvertCard.bind(this);
    closeButton.addEventListener('click', function () {
      removeAdvertCard();
    });

    this.advertCardEscPressHandlerCallback = this.advertCardEscPressHandler.bind(this);
    document.addEventListener('keydown', this.advertCardEscPressHandlerCallback);
  };

  // Удаляет карточку объявления
  var removeAdvertCard = function () {
    this.mapCard.remove();
    document.removeEventListener('keydown', this.advertCardEscPressHandlerCallback);
  };

  var advertCardEscPressHandler =  function () {
    this.removeAdvertCard();
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
})();

'use strict';

// Модуль метки на карте
window.pin = (function () {
  // Главная метка
  var MAIN_PIN = window.map.MAP.querySelector('.map__pin--main');
  // Размеры главной метки в пикселях
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  // Активна ли главная метка
  var isMainPinActive = false;
  // Шаблон метки объявления
  var PIN_TEMPLATE = document.querySelector('#pin').content;
  // Набор меток
  var pins = [];
  // Перемещается ли в данный момент главная метка
  var isMainPinDragged = false;

  // Создаёт метку по шаблону на основе переданных данных
  var createPin = function (data) {
    var pin = PIN_TEMPLATE.querySelector('.map__pin').cloneNode(true);
    var pinX = data.location.x - (pin.offsetWidth / 2);
    var pinY = data.location.y - pin.offsetHeight;
    pin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

    var img = pin.querySelector('img');
    img.src = data.author.avatar;
    img.alt = data.offer.title;

    // Вешаем на метку обработчик клика, открывающий карточку объявления
    pin.addEventListener('click', function () {
      window.map.renderCard(data);
    });

    return pin;
  };

  // Создаёт массив меток в соответствии с данными
  var createPins = function (data) {
    pins = [];
    for (var i = 0; i < data.length; i++) {
      var pin = createPin(data[i]);
      pins.push(pin);
    }
    return pins;
  };

  // Определение координаты главной метки
  var getPinCoords = function () {
    var coords = {};
    if (!isMainPinActive) {
      coords.x = MAIN_PIN.offsetLeft + MAIN_PIN_WIDTH / 2;
      coords.y = MAIN_PIN.offsetTop + MAIN_PIN_WIDTH / 2;
    } else {
      coords.x = MAIN_PIN.offsetLeft + MAIN_PIN_WIDTH / 2;
      coords.y = MAIN_PIN.offsetTop + MAIN_PIN_HEIGHT;
    }
    return coords;
  };

  // Перемещает главную метку в указанные координаты
  var moveMainPin = function (x, y) {
    // Координаты указателя метки
    var pinPointCoords = {
      x: x + (MAIN_PIN_WIDTH / 2),
      y: y + MAIN_PIN_HEIGHT
    };
    var coords = window.map.checkCoords(pinPointCoords.x, pinPointCoords.y);
    MAIN_PIN.style.left = (coords.x - (MAIN_PIN_WIDTH / 2)) + 'px';
    MAIN_PIN.style.top = (coords.y - MAIN_PIN_HEIGHT) + 'px';
  };

  // Устанавливает на главную метку обработчики, активирующие страницу
  var setMainPinActivateHandlers = function () {
    MAIN_PIN.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        window.page.activate();
        isMainPinActive = true;
        window.advertForm.setAddressValue();
      }
    });
    MAIN_PIN.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (!isMainPinDragged) {
        window.page.activate();
        isMainPinActive = true;
        window.advertForm.setAddressValue();
      }
    });
  };

  // Устанавливает на главную метку обработчики, позволяющие её перетаскивать
  var setMainPinDragAndDropHandlers = function () {
    MAIN_PIN.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        isMainPinDragged = false;
        var startCoords = {
          x: evt.clientX,
          y: evt.clientY,
        };
        var mainPinMouseMoveHandler = function (moveEvt) {
          moveEvt.preventDefault();
          isMainPinDragged = true;
          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY,
          };
          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY,
          };
          var mainPinX = MAIN_PIN.offsetLeft - shift.x;
          var mainPinY = MAIN_PIN.offsetTop - shift.y;
          moveMainPin(mainPinX, mainPinY);
        };
        var mainPinMouseUpHandler = function (upEvt) {
          upEvt.preventDefault();
          window.advertForm.setAddressValue();
          document.removeEventListener('mousemove', mainPinMouseMoveHandler);
          document.removeEventListener('mouseup', mainPinMouseUpHandler);
        };
        document.addEventListener('mousemove', mainPinMouseMoveHandler);
        document.addEventListener('mouseup', mainPinMouseUpHandler);
      }
    });
  };

  // Задаёт поведение главной метки
  var setMainPinBehavior = function () {
    // Активируем страницу с помощью главной метки
    setMainPinActivateHandlers();
    // Задаём возможность перетаскивания главной метки
    setMainPinDragAndDropHandlers();
  };

  // Задаём поведение главной метки
  setMainPinBehavior();

  return {
    MAIN_PIN: MAIN_PIN,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    createPin: createPin,
    createPins: createPins,
    getPinCoords: getPinCoords,
  };
})();

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
      window.map.renderCardOnMap(data);
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

  // Удаляет метки
  var removePins = function () {
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  // Получает массив меток
  // var getPins = function () {
  //   return pins;
  // };

  // Определение координаты главной метки
  var getPinCoords = function () {
    return transformCSSToPointMainPinCoords(MAIN_PIN.offsetLeft, MAIN_PIN.offsetTop);
  };

  // Устанавливает флаг активности главной метки
  var activateMainPin = function () {
    isMainPinActive = true;
  };

  // Снимает флаг активности главной метки
  var deactivateMainPin = function () {
    isMainPinActive = false;
  };

  // Преобразует CSS координаты главной метки в координаты указателя
  var transformCSSToPointMainPinCoords = function (x, y) {
    var coords = {};

    if (isMainPinActive) {
      coords.x = x + MAIN_PIN_WIDTH / 2;
      coords.y = y + MAIN_PIN_HEIGHT;
    } else {
      coords.x = x + MAIN_PIN_WIDTH / 2;
      coords.y = y + MAIN_PIN_WIDTH / 2;
    }
    return coords;
  };

  // Преобразует координаты указателя главной метки в CSS координаты
  var transformPointToCSSMainPinCoords = function (x, y) {
    var coords = {};
    if (isMainPinActive) {
      coords.x = x - MAIN_PIN_WIDTH / 2;
      coords.y = y - MAIN_PIN_HEIGHT;
    } else {
      coords.x = x - MAIN_PIN_WIDTH / 2;
      coords.y = y - MAIN_PIN_WIDTH / 2;
    }
    return coords;
  };

  // Перемещает указатель главной метки в указанные координаты
  var moveMainPin = function (x, y) {
    // console.log(isMainPinActive);

    // Координаты указателя метки
    var coords = window.map.checkCoords(x, y);
    // console.log(coords);

    var CSSCoords = transformPointToCSSMainPinCoords(coords.x, coords.y);
    MAIN_PIN.style.left = CSSCoords.x + 'px';
    MAIN_PIN.style.top = CSSCoords.y + 'px';
  };

  // Устанавливает на главную метку обработчики, активирующие страницу
  var setMainPinActivateHandlers = function () {
    MAIN_PIN.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        if (!window.page.checkPageActive()) {
          window.page.activate();
        }
        window.advertForm.setAddressValue();
      }
    });
    MAIN_PIN.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (!isMainPinDragged) {
        if (!window.page.checkPageActive()) {
          window.page.activate();
        }
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
          var pointCoords = transformCSSToPointMainPinCoords(mainPinX, mainPinY);
          moveMainPin(pointCoords.x, pointCoords.y);
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
    createPins: createPins,
    removePins: removePins,
    getPinCoords: getPinCoords,
    moveMainPin: moveMainPin,
    activateMainPin: activateMainPin,
    deactivateMainPin: deactivateMainPin,
    // getPins: getPins,
  };
})();

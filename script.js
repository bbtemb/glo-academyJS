'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: '',
  sumOfscreenPrices: 0,
  servicePrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  minScreenPrice: 1000,
  minServicePrice: 1000,
  sum: 0,

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    appData.logger(appData);
  },

  asking: function () {
    label: do {
      appData.title = prompt(
        'Как называется ваш проект?',
        'Калькулятор верстки'
      );
      if (appData.title === null) continue label;
      else appData.title = appData.title.trim();
    } while (!appData.isText(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      label: do {
        name = prompt('Какие типы экранов нужно разработать?');
        if (name === null) continue label;
        else name = name.trim();
      } while (!appData.isText(name));
      appData.screenPriceAsking();
      appData.screens.push({
        id: i,
        name: name,
        price: appData.screenPrice,
      });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      label: do {
        name = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
        if (name === null) continue label;
        else name = name.trim();
      } while (!appData.isText(name));
      appData.services[name] = +appData.servicePriceAsking();
    }

    appData.adaptive = prompt('Нужен ли адаптив на сайте?', 'Да');
    appData.adaptive =
      appData.adaptive === 'Да' || appData.adaptive === 'да' ? true : false;
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.sumOfscreenPrices += +screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  screenPriceAsking: function () {
    do {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?');
      if (appData.screenPrice === null) {
        if (
          confirm(
            'Вы уверены, что хотите завершить ввод данных? Сумма будет рассчитана исходя из миниальной цены.'
          ) === true
        ) {
          appData.screenPrice = appData.minScreenPrice;
          return;
        } else appData.screenPriceAsking();
      }
    } while (!appData.isNumber(appData.screenPrice));
    appData.screenPrice = Number(appData.screenPrice);
    return;
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  isText: function (str) {
    return typeof str === 'string' && isNaN(str);
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5%';
    } else if (price > 0 && price < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что-то пошло не так';
    }
  },

  getTitle: function () {
    appData.title = appData.title.trim().toLowerCase();
    appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
  },

  servicePriceAsking: function (price) {
    label: do {
      price = prompt('Сколько это будет стоить?');
      if (price === null) {
        if (
          confirm(
            'Вы уверены, что хотите завершить ввод данных? Сумма будет рассчитана исходя из миниальной цены.'
          ) === true
        ) {
          price = appData.minServicePrice;
          return price;
        } else {
          continue label;
        }
      }
    } while (!appData.isNumber(price));
    return price;
  },

  getFullPrice: function () {
    appData.fullPrice = appData.allServicePrices + +appData.sumOfscreenPrices;
  },

  getServicePercentPrices: function () {
    return Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.allServicePrices);
    console.log(appData.screens);
  },
};

appData.start();

// console.log(appData.isText('Как называется ваш проект?'))

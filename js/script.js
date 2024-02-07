'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: '',
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
    do {
      appData.title = prompt(
        'Как называется ваш проект?',
        'Калькулятор верстки'
      );
      if (appData.title === null) appData.title = '';
      else appData.title = appData.title.trim();
    } while (!appData.isText(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt('Какие типы экранов нужно разработать?');
        if (name === null) name = '';
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
      do {
        name = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
        if (name === null) name = '';
        else name = name.trim();
      } while (!appData.isText(name));
      appData.services[i + '. ' + name] = +appData.servicePriceAsking();
    }

    appData.adaptive = prompt('Нужен ли адаптив на сайте?', 'Да');
    appData.adaptive =
      appData.adaptive === 'Да' || appData.adaptive === 'да' ? true : false;
  },

  addPrices: function () {
    appData.screenPrice = 0;
    appData.screenPrice = appData.screens.reduce(function (
      accumulator,
      currentValue
    ) {
      const price = currentValue.price;
      return accumulator + price;
    },
    0);

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
          )
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
    do {
      price = prompt('Сколько это будет стоить?');
      if (price === null) {
        if (
          confirm(
            'Вы уверены, что хотите завершить ввод данных? Сумма будет рассчитана исходя из миниальной цены.'
          )
        ) {
          price = appData.minServicePrice;
          return price;
        } else {
          price = NaN;
        }
      }
    } while (!appData.isNumber(price));
    return price;
  },

  getFullPrice: function () {
    appData.fullPrice = appData.allServicePrices + appData.screenPrice;
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
    console.log(appData.services);
  },
};

appData.start();

// console.log(appData.isText(''));

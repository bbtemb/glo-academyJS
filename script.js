'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  servicePrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  minScreenPrice: 1000,
  minServicePrice: 1000,
  sum: 0,

  asking: function () {
    appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    appData.screens = prompt(
      'Какие типы экранов нужно разработать?',
      'Простые, Сложные'
    );
    appData.adaptive = prompt('Нужен ли адаптив на сайте?', 'Да');
    appData.screenPriceAsking();
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
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
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
    return appData.title[0].toUpperCase() + appData.title.slice(1);
  },

  servicePriceAsking: function () {
    label: do {
      appData.servicePrice = prompt('Сколько это будет стоить?');
      if (appData.servicePrice === null) {
        if (
          confirm(
            'Вы уверены, что хотите завершить ввод данных? Сумма будет рассчитана исходя из миниальной цены.'
          ) === true
        ) {
          appData.servicePrice = appData.minServicePrice;
          appData.sum += Number(appData.servicePrice);
          return;
        } else {
          continue label;
        }
      }
    } while (!appData.isNumber(appData.servicePrice));
    appData.sum += Number(appData.servicePrice);
  },

  getAllServicePrices: function () {
    appData.sum = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt(
          'Какой дополнительный тип услуги нужен?',
          'Метрика'
        );
      } else if (i === 1) {
        appData.service2 = prompt(
          'Какой дополнительный тип услуги нужен?',
          'Отправка форм'
        );
      }
      appData.servicePriceAsking();
    }
    return appData.sum;
  },

  getFullPrice: function () {
    return appData.allServicePrices + +appData.screenPrice;
  },

  getServicePercentPrices: function () {
    return Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  getServicePercentPrices: function () {
    return Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },

  logger: function (obj) {
    for (let key in obj) console.log(key, ':', obj[key]);
  },

  start: function () {
    appData.asking();
    appData.adaptive =
      appData.adaptive === 'Да' || appData.adaptive === 'да' ? true : false;
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger(appData);
  },
};

appData.start();

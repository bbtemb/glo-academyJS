'use strict';

let title;
let screens;
let screenPrice;
let servicePrice;
let adaptive;
let rollback = 20;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;
let minScreenPrice = 1000;
let minServicePrice = 1000;
let sum = 0;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
  adaptive = prompt('Нужен ли адаптив на сайте?', 'Да');
};

const screenPriceAsking = function () {
  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
    if (screenPrice === null) {
      if (
        confirm(
          'Вы уверены, что хотите завершить ввод данных? Сумма будет рассчитана исходя из миниальной цены.'
        ) === true
      ) {
        screenPrice = minScreenPrice;
        return;
      } else screenPriceAsking();
    }
  } while (!isNumber(screenPrice));
  screenPrice = Number(screenPrice);
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';
  } else if (price > 0 && price < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что-то пошло не так';
  }
};

const getTitle = function (string) {
  string = string.trim().toLowerCase();
  return string[0].toUpperCase() + string.slice(1);
};

const servicePriceAsking = function () {
  do {
    servicePrice = prompt('Сколько это будет стоить ?');
    if (servicePrice === null) {
      if (
        confirm(
          'Вы уверены, что хотите завершить ввод данных? Сумма будет рассчитана исходя из миниальной цены.'
        ) === true
      ) {
        servicePrice = minServicePrice;
        sum += Number(servicePrice);
        return;
      } else screenPriceAsking();
    }
  } while (!isNumber(servicePrice));
  sum += Number(servicePrice);
};

const getAllServicePrices = function () {
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
    } else if (i === 1) {
      service2 = prompt(
        'Какой дополнительный тип услуги нужен?',
        'Отправка форм'
      );
    }
    servicePriceAsking();
  }
  return sum;
};
function getFullPrice() {
  return allServicePrices + +screenPrice;
}

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

screenPriceAsking();

allServicePrices = getAllServicePrices();

showTypeOf(screenPrice);
showTypeOf(allServicePrices);

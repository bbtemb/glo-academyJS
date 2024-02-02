'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 20;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num > 0;
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
  adaptive = prompt('Нужен ли адаптив на сайте?', 'Да');

  // screenPrice = prompt('Сколько будет стоить данная работа?');
  // while (!isNumber(screenPrice)) {
  //   screenPrice = prompt('Сколько будет стоить данная работа?');
  // }
};

const screenPriceAsking = function () {
  do {
    screenPrice = +prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice));
  // screenPrice = +screenPrice;
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

const getAllServicePrices = function () {
  let servicePrice = 0;
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
    } else if (i === 1) {
      service2 = prompt(
        'Какой дополнительный тип услуги нужен?',
        'Отправка форм'
      );
    }
    do {
      servicePrice = +prompt('Сколько это будет стоить?');
    } while (!isNumber(servicePrice));
    sum += +servicePrice;
  }
  return sum;
};

function getFullPrice() {
  return allServicePrices + +screenPrice;
}

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

// asking();
screenPriceAsking();

// adaptive = adaptive === 'Да' || adaptive === 'да' ? true : false;
// title = getTitle(title);
allServicePrices = getAllServicePrices();

// fullPrice = getFullPrice();
// servicePercentPrice = getServicePercentPrices();

// showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(allServicePrices);
// showTypeOf(adaptive);
// showTypeOf(fullPrice);
// showTypeOf(servicePercentPrice);

// console.log(screens.toLowerCase().split(', '));
// console.log(getRollbackMessage(fullPrice));
// console.log('servicePercentPrice: ', servicePercentPrice);
// console.log('allServicePrices: ', allServicePrices);

// console.log('servicePercentPrice: ', servicePercentPrice);
// console.log(title);
// console.log(typeof fullPrice);
// console.log(adaptive);
// // console.log(screens);
// console.log('Стоимость верстки экранов', screenPrice, 'рублей');
// console.log('Стоимость разработки сайта', fullPrice, 'рублей');
// // console.log(fullPrice * (rollback / 100));

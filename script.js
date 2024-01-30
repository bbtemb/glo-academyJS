'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = prompt('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен ещё?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 20;
let allServicePrices, fullPrice, servicePercentPrice;

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

const getTtitle = function (string) {
  string = string.trim(string);
  return string[0].toUpperCase() + string.slice(1);
};

const getAllServicePrices = function (price1, price2) {
  return price1 + price2;
};

function getFullPrice(basePrice, sumOfAddPrices) {
  return basePrice + sumOfAddPrices;
}

const getServicePercentPrices = function (price, servicePercent) {
  return Math.ceil(price - price * (servicePercent / 100));
};

adaptive = adaptive === 'Да' || adaptive === 'да' ? true : false;

title = getTtitle(title);

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

fullPrice = getFullPrice(screenPrice, allServicePrices);

servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log('servicePercentPrice: ', servicePercentPrice);

// console.log('servicePercentPrice: ', servicePercentPrice);
// console.log(title);
// console.log(typeof fullPrice);
// console.log(adaptive);
// console.log(screens);
// console.log('Стоимость верстки экранов', screenPrice, 'рублей');
// console.log('Стоимость разработки сайта', fullPrice, 'рублей');
// console.log(fullPrice * (rollback / 100));

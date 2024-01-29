'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = prompt('Нужен ли адаптив на сайте?');
adaptive = adaptive === 'Да' || adaptive === 'да' ? true : false;

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');

let service2 = prompt('Какой дополнительный тип услуги нужен ещё?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let rollback = 20;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice * ((100 - rollback) / 100));
console.log('servicePercentPrice: ', servicePercentPrice);

if (fullPrice >= 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice > 0 && fullPrice < 15000) {
  console.log('Скидка не предусмотрена');
} else {
  console.log('Что-то пошло не так');
}

// switch (true) {
//   case fullPrice >= 30000:
//     console.log('Даем скидку в 10%');
//     break;
//   case fullPrice >= 15000 && fullPrice < 30000:
//     console.log('Даем скидку в 5%');
//     break;
//   case fullPrice > 0 && fullPrice < 15000:
//     console.log('Скидка не предусмотрена');
//     break;
//   default:
//     console.log('Что то пошло не так');
//     break;
// }

console.log(title);
// console.log(typeof fullPrice);
console.log(adaptive);
// console.log(screens);
console.log('Стоимость верстки экранов', screenPrice, 'рублей');
console.log('Стоимость разработки сайта', fullPrice, 'рублей');
console.log(screens.toLowerCase().split(', '));
// console.log(fullPrice * (rollback / 100));

let title = 'Проект';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 1000;
let rollback = 20;
let fullPrice = 10000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость верстки экранов', screenPrice, 'рублей');
console.log('Стоимость разработки сайта', fullPrice, 'рублей');

console.log(screens.toLowerCase().split(', '));

console.log(fullPrice * (rollback / 100));

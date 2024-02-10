'use strict';

const h1Title = document.getElementsByTagName('h1')[0];
const listButtons = Array.from(document.getElementsByClassName('handler_btn'));
const buttonPlus = document.querySelector('.screen-btn');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback  input[type=range]');
const rangeValue = document.querySelector('.rollback  span.range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: '',
  totalScreenCount: 0,
  servicePrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  minScreenPrice: 1000,
  minServicePrice: 1000,
  sum: 0,
  calculated: false,

  init: function () {
    appData.addTitle();

    startBtn.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);
    inputRange.addEventListener('input', function () {
      appData.addRollback();
      appData.updateServicePercentPrice();
    });
  },

  addTitle: function () {
    document.title = h1Title.textContent;
  },

  addRollback: function () {
    appData.rollback = event.target.value;
    rangeValue.innerText = appData.rollback + '%';
  },

  updateServicePercentPrice: function () {
    if (appData.calculated)
      totalCountRollback.value = appData.servicePercentPrice = Math.ceil(
        appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
      );
  },

  start: function () {
    appData.addScreens();
    appData.addServices();

    appData.addPrices();
    // appData.logger(appData);
    appData.checkEmptyScreens()
      ? appData.showResult()
      : alert('Выберите тип экранов');
    console.log(appData.calculated);
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.totalScreenCount;

    appData.calculated = true;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    (appData.screens = []),
      screens.forEach(function (screen, index) {
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');
        const selectName = select.options[select.selectedIndex].textContent;

        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: +input.value,
        });
      });
  },

  checkEmptyScreens: function () {
    let check = true;
    appData.screens.forEach(function (item) {
      if (item.name === 'Тип экранов') check = false;
    });
    return check;
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    appData.screenPrice = 0;
    appData.totalScreenCount = 0;
    appData.screenPrice = appData.screens.reduce(function (
      accumulator,
      currentValue
    ) {
      const price = currentValue.price;
      return accumulator + price;
    },
    0);

    for (let key in appData.screens) {
      appData.totalScreenCount += appData.screens[key].count;
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      appData.servicePricesPercent +
      appData.servicePricesNumber +
      appData.screenPrice;

    appData.servicePercentPrice = Math.ceil(
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
    console.log(appData.services);
  },
};

appData.init();

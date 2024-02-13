'use strict';

const h1Title = document.getElementsByTagName('h1')[0];
const listButtons = Array.from(document.getElementsByClassName('handler_btn'));
const buttonPlus = document.querySelector('.screen-btn');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback  input[type=range]');
const inputScreenCount = document.querySelector(
  '.main-controls__input  input[type=text]'
);
const listCheckboxes = document.querySelectorAll('.custom-checkbox');
const rangeValue = document.querySelector('.rollback  span.range-value');

const total = document.getElementById('total');
const totalCount = document.getElementById('total-count');
const totalCountOther = document.getElementById('total-count-other');
const fullTotalCount = document.getElementById('total-full-count');
const totalCountRollback = document.getElementById('total-count-rollback');

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
    this.addTitle();

    startBtn.addEventListener('click', this.start);
    resetBtn.addEventListener('click', this.reset);
    buttonPlus.addEventListener('click', this.addScreenBlock);
    inputRange.addEventListener('input', () => {
      this.addRollback();
      this.updateServicePercentPrice();
    });
  },

  addTitle: function () {
    document.title = h1Title.textContent;
  },

  addRollback: function () {
    this.rollback = event.target.value;
    rangeValue.innerText = this.rollback + '%';
  },

  updateServicePercentPrice: function () {
    if (this.calculated)
      totalCountRollback.value = this.servicePercentPrice = Math.ceil(
        this.fullPrice - this.fullPrice * (this.rollback / 100)
      );
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addScreenPrices();
    appData.addOtherPrices();
    appData.addTotalPrices();

    if (appData.checkEmptyScreens()) {
      if (appData.checkScreenCount()) {
        appData.showResult();
        appData.inputsOff();
        appData.showResetBtn();
      } else alert('Введите количество экранов');
    } else alert('Выберите тип экранов');
  },

  reset: function () {
    inputScreenCount.value = '';
    appData.resetResult();
    appData.removeScreens();
    listCheckboxes.forEach((element) => {
      element.checked = false;
    });
    appData.inputsOn();
    appData.showStartBtn();
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.totalScreenCount;

    this.calculated = true;
  },
  resetResult: function () {
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;

    this.calculated = false;
  },

  addScreens: function () {
    let screens = document.querySelectorAll('.screen');
    (this.screens = []),
      screens.forEach((screen, index) => {
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
    this.screens.forEach((item) => {
      if (item.name === 'Тип экранов') check = false;
    });
    return check;
  },
  checkScreenCount: function () {
    const listCountInputs = document.querySelectorAll(
      '.screen .main-controls__input  input[type=text]'
    );
    let check = true;
    listCountInputs.forEach((element) => {
      if (element.value === '' || element.value === '0') check = false;
      else {
        if (isNaN(element.value)) check = false;
      }
    });
    return check;
  },

  addServices: function () {
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    (this.servicesPercent = {}),
      (this.servicesNumber = {}),
      otherItemsPercent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        const input = item.querySelector('input[type=text]');

        if (check.checked) {
          this.servicesPercent[label.textContent] = +input.value;
        }
      });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll('.screen');
  },

  removeScreens: function () {
    for (let i = screens.length - 1; i > 0; i--) screens[i].remove();
    document.querySelector('select').selectedIndex = 0;
    screens = document.querySelectorAll('.screen');
  },

  addScreenPrices: function () {
    this.screenPrice = 0;
    this.totalScreenCount = 0;
    this.screenPrice = this.screens.reduce((accumulator, currentValue) => {
      const price = currentValue.price;
      return accumulator + price;
    }, 0);

    for (let key in this.screens) {
      this.totalScreenCount += this.screens[key].count;
    }
  },

  addOtherPrices: function () {
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
  },

  addTotalPrices: function () {
    this.fullPrice =
      this.servicePricesPercent + this.servicePricesNumber + this.screenPrice;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
  },

  inputsOff: function () {
    inputRange.setAttribute('disabled', '');
    document
      .querySelectorAll('.main-controls__input  input[type=text]')
      .forEach((element) => {
        element.setAttribute('disabled', '');
      });
    listCheckboxes.forEach((element) => {
      element.setAttribute('disabled', '');
    });
    document.querySelectorAll('select').forEach((element) => {
      element.setAttribute('disabled', '');
    });
    buttonPlus.setAttribute('disabled', '');
  },
  inputsOn: function () {
    inputRange.removeAttribute('disabled');
    inputScreenCount.removeAttribute('disabled');
    listCheckboxes.forEach((element) => {
      element.removeAttribute('disabled');
    });
    document.querySelector('select').removeAttribute('disabled');
    buttonPlus.removeAttribute('disabled');
  },

  showResetBtn: function () {
    startBtn.style.display = 'none';
    resetBtn.removeAttribute('style');
  },
  showStartBtn: function () {
    resetBtn.style.display = 'none';
    startBtn.removeAttribute('style');
  },

  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.allServicePrices);
    console.log(this.screens);
    console.log(this.services);
  },
};

appData.init();

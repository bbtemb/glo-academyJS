'use strict';

const books = document.querySelectorAll('.book');
const body = document.querySelector('body');
const adv = document.querySelector('.adv');
const chapterList2 = books[0].querySelectorAll('ul li');
const chapterList5 = books[5].querySelectorAll('ul li');
const chapterList6 = books[2].querySelectorAll('ul li');

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

books[0].before(books[1]);
books[2].before(books[4]);
books[5].after(books[2]);

adv.remove();

books[4].querySelector('h2 a').innerText = 'Книга 3. this и Прототипы Объектов';

let correctChapterList2 = document.createElement('ul');
books[0].append(correctChapterList2);
correctChapterList2.append(chapterList2[0]);
correctChapterList2.append(chapterList2[1]);
correctChapterList2.append(chapterList2[3]);
correctChapterList2.append(chapterList2[6]);
correctChapterList2.append(chapterList2[8]);
correctChapterList2.append(chapterList2[4]);
correctChapterList2.append(chapterList2[5]);
correctChapterList2.append(chapterList2[7]);
correctChapterList2.append(chapterList2[9]);
correctChapterList2.append(chapterList2[2]);
correctChapterList2.append(chapterList2[10]);
books[0].querySelector('ul').remove();

let correctChapterList5 = document.createElement('ul');
books[5].append(correctChapterList5);
correctChapterList5.append(chapterList5[0]);
correctChapterList5.append(chapterList5[1]);
correctChapterList5.append(chapterList5[9]);
correctChapterList5.append(chapterList5[3]);
correctChapterList5.append(chapterList5[4]);
correctChapterList5.append(chapterList5[2]);
correctChapterList5.append(chapterList5[6]);
correctChapterList5.append(chapterList5[7]);
correctChapterList5.append(chapterList5[5]);
correctChapterList5.append(chapterList5[8]);
correctChapterList5.append(chapterList5[10]);
books[5].querySelector('ul').remove();

let newChapter = document.createElement('li');
newChapter.innerText = 'Глава 8: За пределами ES6';
chapterList6[9].before(newChapter);

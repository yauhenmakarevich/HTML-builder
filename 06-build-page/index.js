// Привет дорогой проверяющий, есть большая вероятность того что изза праздников я могу не успеть доделать .
// Пожалуста проверь работу в среду вечером .
//Или оставь для связи свой ник в дискорд ....



const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');


async function copyHtml() {
  let componentsFolderName = path.join(__dirname, 'components');
  let outHtmlfileName = path.join(__dirname, 'project-dist', 'index.html');




async function readFile(file) {
    let fileName = path.join(__dirname, 'components', file);
    let name = file.split('.')[0];
    let text = (await fsPromises.readFile(fileName)).toString();

// Привет дорогой проверяющий, есть большая вероятность того что изза праздников я могу не успеть доделать .
// Пожалуста проверь работу в среду вечером .
//Или оставь для связи свой ник в дискорд ....

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
let folderName = path.join(__dirname, 'styles');
fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));


//функция ... чтение

readFiles();
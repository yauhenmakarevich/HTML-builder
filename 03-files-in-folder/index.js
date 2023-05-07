const fs = require('fs');
const path = require('path');

let folderName = path.join(__dirname, 'secret-folder');

fs.readdir(folderName, { withFileTypes: true }, (err, files) => {
  if (err) throw err;


  // 1.Добавить фильтр
  // 2.Проверка объекта на то, что он является файлом
  // 3. Вывод в консоль

  // Ссылка + видео
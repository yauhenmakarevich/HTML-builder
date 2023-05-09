const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

async function copyHtml() {
  let componentsFolderName = path.join(__dirname, 'components');
  let outHtmlfileName = path.join(__dirname, 'project-dist', 'index.html');

  fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

  let componetsName = await fsPromises.readdir(componentsFolderName);

  let HtmlFileName = path.join(__dirname, 'template.html');
  let htmlData = (await fsPromises.readFile(HtmlFileName)).toString();

  async function readFile(file) {
    let fileName = path.join(__dirname, 'components', file);
    let name = file.split('.')[0];
    let text = (await fsPromises.readFile(fileName)).toString();

    htmlData = await htmlData.replace(`{{${name}}}`, `${text}`);
    return await htmlData;
  }

  async function replaceHtml(file) {
    let newHtml = await readFile(file);
    await fsPromises.writeFile(outHtmlfileName, newHtml);
  }
  await componetsName.map((file) => {
    replaceHtml(file);
  });
}

async function copyStyles() {
  let folderName = path.join(__dirname, 'styles');
  fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

  const cssFiles = await fsPromises.readdir(folderName, {
    withFileTypes: true,
  });

  async function readFile(fileName) {
    let text = await fsPromises.readFile(fileName);
    let outputFile = path.join(__dirname, 'project-dist', 'style.css');

    await fsPromises.appendFile(outputFile, text.toString());
  }

  await cssFiles.forEach((file) => {
    let fileName = path.join(__dirname, 'styles', file.name);
    let ext = path.parse(fileName).ext.split('.')[1];
    if (file.isFile() && ext === 'css') readFile(fileName);
  });
}

async function copyAssets(copyFolderName, folderName) {
  await fsPromises.mkdir(copyFolderName, { recursive: true });

  const files = await fsPromises.readdir(folderName, { withFileTypes: true });

  files.forEach((file) => {
    let copyFolder = path.join(copyFolderName, file.name);
    let mainFolder = path.join(folderName, file.name);

    if (file.isFile()) {
      fsPromises.copyFile(mainFolder, copyFolder);
    } else {
      copyAssets(copyFolder, mainFolder);
    }
  });
}

async function copyAllFiles() {
  let copyMainFolder = path.join(__dirname, 'project-dist');
  let copyFolderName = path.join(__dirname, 'project-dist', 'assets');
  let folderName = path.join(__dirname, 'assets');

  await fsPromises.rm(copyMainFolder, { recursive: true, force: true });
  await fsPromises.mkdir(copyMainFolder, { recursive: true });

  copyHtml();
  copyStyles();
  copyAssets(copyFolderName, folderName);
}

copyAllFiles();

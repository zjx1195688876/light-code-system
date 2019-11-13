const fs = require('fs');
const path = require('path');
const root = process.cwd(); // 项目根目录
const Controller = require('egg').Controller;

let currentWorkFolder = root; // 初始化当前的目录为项目目录

const scanDirectory = async () => { // 扫描当前工作区目录，返回当前目录包含的文件和文件夹
  return new Promise((resolve, reject) => {
    fs.readdir(currentWorkFolder, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const parsedFiles = files.map(file => {
        const stat = fs.lstatSync(path.join(currentWorkFolder, file));
        const type = stat.isDirectory() ? 'dir' : 'file'; // 判断文件 / 文件夹

        return { type, file };
      });

      resolve(parsedFiles);
    });
  });
};

const setWorkFolde = async () => {
  const directories = await scanDirectory();
  return directories;
};

class IndexController extends Controller {
  public async getWorkFolder() {
    const directories = await scanDirectory();
    console.log('directories: ', directories);
    return {
      currentWorkFolder, // 当前目录
      directories, // 当前目录包含的文件和文件夹
    };
  }
};

module.exports = IndexController;

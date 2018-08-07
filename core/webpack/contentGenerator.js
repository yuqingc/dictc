const path  = require('path');
const fs = require('fs');

/**
 * Consts
 */
const DefaultTitle = 'Documentation';
const DefaultFooterText = 'Powered by Dictc and Ant Design';

// get root directory of user's project
const root = fs.realpathSync(process.cwd());
// get the absolute path of the config file
const configPath = path.resolve(root, './.dictc/dictc.config.js');
console.log('Reading dictc configs from ', configPath);
// get the config object
const config = require(configPath);

const resultConfig = Object.create(null);

resultConfig.title = config.title || DefaultTitle;
resultConfig.footerText = config.footerText || DefaultFooterText;

const contents = [];

if (config && Object.prototype.toString.call(config.sections) === '[object Array]') {
  for (const i in config.sections) {
    const item = config.sections[i];
    const pageItem = Object.create(null);
    pageItem.name = item.name;
    if (item.contentPath) {
      const page = Object.create(null); // single page
      page.name = item.name;
      page.content = fs.readFileSync(path.resolve(root, item.contentPath)).toString();
      pageItem.page = page;
    } else if (item.resolvePath) {
      const absoluteResolvePath = path.resolve(root, item.resolvePath);
      const pagePaths = fs.readdirSync(absoluteResolvePath);
      const pages = []; // mutiple pages
      pagePaths.forEach(v => {
        const mdPath = path.resolve(absoluteResolvePath, v, 'index.md');
        if (fs.existsSync(mdPath) && fs.statSync(mdPath).isFile) {
          const page = Object.create(null);
          page.name = v;
          page.content = fs.readFileSync(path.resolve(mdPath)).toString();
          pages.push(page);
        }
      });
      pageItem.pages = pages;
    }
    contents.push(pageItem);
  }
}

resultConfig.contents = contents;

module.exports = resultConfig;

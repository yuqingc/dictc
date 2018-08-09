/**
 * This file is used for generating a TS source code
 * that exports the markdown content.
 * Since we cannot dynamicly import files in the original
 * source code, we generate one by reading urls from the
 * config file.
 */

const fs = require('fs');
const path = require('path');

const FileHeader = `
// this file is generated at ${new Date()}
// generated by '${__dirname + '/contentSourceGenerator.js'}'

interface IPageItem {
  name: string;
  content?: string;
  pages?: IPageItem[];
}

const pages: IPageItem[] = [];
let pageItem: IPageItem = {name: ''};
`;

const importTemplate = (name, path) => `import ${name} from '${path}';`

/**
 * deleteFolderRecursive does the same thing as executing `rm -fr path`
 * @param {string} path the directory to be removed
 * @return {void}
 */
const deleteFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

// the main process function
const main = () => {
  const outputDirPath = path.resolve(__dirname, '../src/ts/out');
  const dictcContentPath = path.resolve(outputDirPath, 'dictcContent.ts');
  const dictcContextPath = path.resolve(outputDirPath, 'dictcContext.ts');

  // clear output path before generating codes
  // no error catching here
  // any errors will stop the whole process for security
  if (fs.existsSync(outputDirPath)) {
    console.log('Deleting output source code directory...');
    deleteFolderRecursive(outputDirPath);
    console.log('Deleting done');
  }
  fs.mkdirSync(outputDirPath);
  console.log(outputDirPath + ' is created');


  // ref: `bin/dictc`
  // the present working dir is changed to 'node_modules/dictc'
  // without cd to that directory, the project won't work
  // due to some unknown module problems
  const root = path.resolve(process.env.PWD, '../../');
  // get the absolute path of the config file
  const configPath = path.resolve(root, './.dictc/dictc.config.js');
  console.log('Reading dictc configs from ' + configPath + '...');
  const config = require(configPath);

  // write context file
  console.log(`Writing to '${dictcContextPath}'`);
  if (config.context) {
    fs.appendFileSync(dictcContextPath, `
// this file is generated at ${new Date()}
// generated by '${__dirname + '/contentSourceGenerator.js'}'

import * as context from '${path.resolve(root, config.context)}';
export default context;
`
    );
  } else {
    fs.appendFileSync(dictcContextPath, `
// this file is generated at ${new Date()}
// generated by '${__dirname + '/contentSourceGenerator.js'}'

const context: any = {};  
export default context;
`
    );
  }
  console.log('Done.')
  

  if (!(config && Object.prototype.toString.call(config.sections) === '[object Array]')) {
    throw new Error('`sections does not exit in dictc.config.js`');
  }

  // create dictcContent.ts and write the first line
  fs.appendFileSync(dictcContentPath, FileHeader);

  for (const i in config.sections) {
    const section = config.sections[i];
    // single page
    if (section.contentPath) {
      const absoluteContentPath = path.resolve(root, section.contentPath);
      console.log('Parsing ' + absoluteContentPath);
      fs.appendFileSync(dictcContentPath, `
${importTemplate(`content${i}`, absoluteContentPath)}
pageItem = {
  name: '${section.name}',
  content: content${i}
};

pages.push(pageItem);\n`);
    } else if (section.resolvePath) {
      const absoluteResolvePath = path.resolve(root, section.resolvePath);
      fs.appendFileSync(dictcContentPath, `
pageItem = {
  name: '${section.name}',
  pages: [],
};`);
      const pagePaths = fs.readdirSync(absoluteResolvePath);
      for (const j in pagePaths) {
        const pagePath = pagePaths[j];
        const mdPath = path.resolve(absoluteResolvePath, pagePath, 'index.md');
        if (fs.existsSync(mdPath) && fs.statSync(mdPath).isFile) {
          console.log('Parsing ' + mdPath);
          fs.appendFileSync(dictcContentPath, `
${importTemplate(`content${i}_${j}`, mdPath)}
pageItem.pages && pageItem.pages.push({
  name: '${pagePath}',
  content: content${i}_${j}
});
`
          );
        }
      }
      fs.appendFileSync(dictcContentPath, `pages.push(pageItem);\n`
      );
    }
  }
  fs.appendFileSync(dictcContentPath, `\nexport default pages;\n`);
  console.log('Done parsing from config file to ' + dictcContentPath);
}

// execute the main process
module.exports = main;

const path  = require('path');
const fs = require('fs');

/**
 * Consts
 */
const DefaultTitle = 'Documentation';
const DefaultFooterText = 'Powered by Dictc and Ant Design';

// get root directory of user's project
// const root = fs.realpathSync(process.cwd());
// const root = process.cwd();
const root = path.resolve(process.env.PWD, '../../');
// get the absolute path of the config file
const configPath = path.resolve(root, './.dictc/dictc.config.js');
console.log('Reading dictc configs from ', configPath);
// get the config object
const config = require(configPath);

const resultConfig = Object.create(null);

resultConfig.title = config.title || DefaultTitle;
resultConfig.footerText = config.footerText || DefaultFooterText;

module.exports = resultConfig;

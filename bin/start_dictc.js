'use strict'

const fs = require('fs');
const path = require('path');

const spawn = require('child_process').spawn;

const ls = spawn(
  path.resolve(__dirname, '../node_modules/.bin/webpack-dev-server'),
  [
    '--config',
    path.resolve(__dirname, '../core/webpack/webpack.config.js'),
    '--open'
  ]
);

ls.stdout.on('data', function (data) {
  console.log(data.toString());
});

ls.stderr.on('data', function (data) {
  console.error('error: ' + data.toString());
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
});

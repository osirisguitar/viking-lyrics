'use strict';

const nconf = require('nconf').env({
  separator: '__',
  lowerCase: true
}).file({
  file: 'config.json',
  dir: '../../',
  search: true
});

const config = {
  port: nconf.get('port')
};

module.exports = config;

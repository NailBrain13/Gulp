//Config
const path = require('../config/path.js');

//Плагины
const dell = require('del');

//Clear
const clear = () => {
  return dell(path.root);
};

module.exports = clear;

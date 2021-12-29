const { src, dest } = require('gulp');

//Config
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pugTemp = require('gulp-pug');
const gulpWebp = require('gulp-webp-html');

//Pug
const pug = () => {
  return src(path.pug.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      }),
    )
    .pipe(pugTemp(app.pug))
    .pipe(gulpWebp())
    .pipe(dest(path.pug.dest));
};

module.exports = pug;

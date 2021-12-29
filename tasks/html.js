const { src, dest } = require('gulp');

//Config
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const fileInclude = require('gulp-file-include');
const htmlMin = require('gulp-htmlmin');
const gulpSize = require('gulp-size');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpWebp = require('gulp-webp-html');

//HTML
const html = () => {
  return src(path.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      }),
    )
    .pipe(fileInclude())
    .pipe(gulpWebp())
    .pipe(gulpSize({ title: 'До сжатия' }))
    .pipe(htmlMin(app.htmlmin))
    .pipe(gulpSize({ title: 'После сжатия' }))
    .pipe(dest(path.html.dest));
};

module.exports = html;

const { src, dest } = require('gulp');

//Config
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imgMin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webP = require('gulp-webp');
const gulpIf = require('gulp-if');

//Img
const img = () => {
  return src(path.img.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      }),
    )
    .pipe(newer(path.img.dest))
    .pipe(webP())
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(dest(path.img.dest))
    .pipe(gulpIf(app.isProd, imgMin(app.imgMinify)))
    .pipe(dest(path.img.dest));
};

module.exports = img;

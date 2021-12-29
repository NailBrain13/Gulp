const { src, dest } = require('gulp');

//Config
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const cocat = require('gulp-concat');
const cssImport = require('gulp-cssimport');
const autoPrefixer = require('gulp-autoprefixer');
const ccsO = require('gulp-csso');
const rename = require('gulp-rename');
const size = require('gulp-size');
const shortHands = require('gulp-shorthand');
const mediaQuer = require('gulp-group-css-media-queries');
const webpCSS = require('gulp-webp-css');
const { isDev } = require('../config/app.js');

//CSS
const css = () => {
  return src(path.css.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      }),
    )
    .pipe(cocat('main.css'))
    .pipe(cssImport())
    .pipe(webpCSS())
    .pipe(autoPrefixer())
    .pipe(shortHands())
    .pipe(mediaQuer())
    .pipe(size({ title: 'main.css=' }))
    .pipe(dest(path.css.dest, { sourcemaps: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(ccsO())
    .pipe(size({ title: 'main.min.css=' }))
    .pipe(dest(path.css.dest, { sourcemaps: true }));
};

module.exports = css;

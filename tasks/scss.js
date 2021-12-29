const { src, dest } = require('gulp');

//Config
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoPrefixer = require('gulp-autoprefixer');
const ccsO = require('gulp-csso');
const rename = require('gulp-rename');
const size = require('gulp-size');
const shortHands = require('gulp-shorthand');
const mediaQuer = require('gulp-group-css-media-queries');
const gulpSass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const webpCSS = require('gulp-webp-css');

//Scss/Sass
const scss = () => {
  return src(path.scss.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      }),
    )
    .pipe(sassGlob())
    .pipe(gulpSass())
    .pipe(webpCSS())
    .pipe(autoPrefixer())
    .pipe(shortHands())
    .pipe(mediaQuer())
    .pipe(size({ title: 'main.scss=' }))
    .pipe(dest(path.scss.dest, { sourcemaps: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(ccsO())
    .pipe(size({ title: 'main.min.scss=' }))
    .pipe(dest(path.scss.dest, { sourcemaps: true }));
};

module.exports = scss;

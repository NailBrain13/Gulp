const { src, dest } = require('gulp');

//Config
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const webpackStream = require('webpack-stream');
const { isDev } = require('../config/app.js');

//Js
const js = () => {
  return src(path.js.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      }),
    )
    .pipe(babel())
    .pipe(webpackStream(app.webpack))
    .pipe(dest(path.js.dest, { sourcemaps: true }));
};

module.exports = js;

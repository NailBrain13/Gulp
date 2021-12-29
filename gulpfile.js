const { watch, series, parallel, src, dest } = require("gulp");

//Config
const path = require("./config/path.js");

//Плагины
const browserSync = require("browser-sync").create();

//Задачи
const clear = require("./tasks/clear.js");
const html = require("./tasks/html");
const pug = require("./tasks/pug");
const css = require("./tasks/css");
const scss = require("./tasks/scss");
const js = require("./tasks/js");
const img = require("./tasks/img");
const font = require("./tasks/font");

//Browser sync
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

//Watcher
const watcher = () => {
  watch(path.pug.watch, pug).on("all", browserSync.reload);
  watch(path.css.watch, css).on("all", browserSync.reload);
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
  watch(path.font.watch, font).on("all", browserSync.reload);
};

//Copy favicon
const copyFavicon = () => {
  return src(path.favicon.src).pipe(dest(path.favicon.dest));
};

//Copy robots.txt
const robots = () => {
  return src("./src/robots.txt").pipe(dest("./public"));
};

exports.watcher = watcher;
exports.pug = pug;
exports.clear = clear;
exports.css = css;
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;
exports.copyFavicon = copyFavicon;
exports.robots = robots;

const build = series(
  clear,
  parallel(html, scss, js, img, font, copyFavicon, robots)
);

const dev = series(build, parallel(watcher, server));

exports.default = dev;
exports.build = build;

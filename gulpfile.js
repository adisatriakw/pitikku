'use-strict';

const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const postsvg = require('postcss-inline-svg');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const fonts = require('postcss-font-magician');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './src',
    },
    port: 3000,
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function style() {
  const plugin = [
    autoprefixer(),
    postsvg(),
    cssnano(),
    fonts({
      foundries: 'bootstrap google',
    }),
  ];
  return gulp
    .src('src/assets/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss(plugin))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch('src/assets/scss/**/*', style);
  gulp.watch('src/*.html', browserSyncReload);
}

const watch = gulp.parallel(watchFiles, browserSync);

exports.default = watch;

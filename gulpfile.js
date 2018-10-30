
const gulp = require('gulp')
const babel = require('gulp-babel')
const del = require('del')

gulp.task('default', function () {
  del.sync('lib')

  gulp.src([ 'src/*.js' ])
    .pipe(babel())
    .pipe(gulp.dest('lib/'))

  gulp.src([ 'src/*.ejs' ])
    .pipe(gulp.dest('lib/'))

  gulp.src([
  	'src/storybook/*.js',
  	'src/storybook/*.json',
  	'src/storybook/*.html'
  ]).pipe(gulp.dest('lib/storybook/'))

  gulp.src([
  	'src/storybook/http-mock/*.js',
  	'src/storybook/http-mock/*.json'
  ]).pipe(gulp.dest('lib/storybook/http-mock'))
})

gulp.task('watch', function () {
  gulp.watch([
  ],
  [ 'default' ])
})

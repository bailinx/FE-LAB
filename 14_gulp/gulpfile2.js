// 另一种漂亮的写法
var gulp = require('gulp');
var domSrc = require('gulp-dom-src');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var cheerio = require('gulp-cheerio');

gulp.task('css', function() {
    return domSrc({file:'index.html',selector:'link',attribute:'href'})
        .pipe(concat('app.full.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
    return domSrc({file:'index.html',selector:'script',attribute:'src'})
        .pipe(concat('app.full.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('indexHtml', function() {
    return gulp.src('index.html')
        .pipe(cheerio(function ($) {
            $('script').remove();
            $('link').remove();
            $('body').append('<script src="app.full.min.js"></script>');
            $('head').append('<link rel="stylesheet" href="app.full.min.css">');
        }))
        .pipe(gulp.dest('dist/'));
});
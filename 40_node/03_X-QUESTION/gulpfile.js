var gulp           = require('gulp'),
    less           = require('gulp-less'),
    autoprefixer   = require('gulp-autoprefixer'),
    minifycss      = require('gulp-minify-css'),
    rename         = require('gulp-rename'),
    // 为服务器特别定制的，快速、灵活、实施精益(lean implementation)的jQuery核心
    cheerio        = require('gulp-cheerio');

var path = {
    public   : "public/",
    css      : "public/css/",
    js       : "public/js/",
    less     : "public/less/",
    img      : "public/img/",
    dist     : "dist/"
}, env = {
    production: false
};

gulp.task('set-production', function() {
    env.production = true;
});

gulp.task('replace', function() {
    var rand = new Date().getSeconds();
    return  gulp.src(path.dist + 'index.html')
                .pipe(cheerio(function($) {
                    $('script').remove();
                    $('link').remove();
                    $('body').append('<script src="js/index.js"></script>');
                    $('head').append('<link rel="stylesheet" href="index.min.css?v='+ rand +'">');
                }))
                .pipe(rename('idx.html'))
                .pipe(gulp.dest(path.dist));
});

// 编译less
gulp.task('css', function() {
    if(env.production) {
        return  gulp.src(path.less + '*.less')
                    .pipe(less())
                    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
                    .pipe(gulp.dest('dist/css'))
                    .pipe(minifycss())
                    .pipe(rename({ suffix: '.min'}))
                    .pipe(gulp.dest(path.dist + 'css'));
    } else {
        return  gulp.src(path.less + '*.less')
                    .pipe(less())
                    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
                    .pipe(gulp.dest(path.dist + 'css'));
    }
});

// 监听
gulp.task('watch', function() {
    // 其实没必要监听所有
    return gulp.watch([
                path.less  + '**/*.*',
                path.dist + '*.html'
            ], ['css']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['set-production', 'css', 'replace']);

// http://www.ydcss.com/archives/18
// http://www.cnblogs.com/xjcjcsy/p/4467751.html
// http://segmentfault.com/a/1190000003730672
var gulp           = require('gulp'),
    less           = require('gulp-less'),
    autoprefixer   = require('gulp-autoprefixer'),
    minifycss      = require('gulp-minify-css'),
    livereload     = require('gulp-livereload'),
    notify         = require('gulp-notify'),
    rename         = require('gulp-rename'),
    // 为服务器特别定制的，快速、灵活、实施精益(lean implementation)的jQuery核心
    cheerio        = require('gulp-cheerio'),
    domSrc         = require('gulp-dom-src'),
    connect        = require('gulp-connect');

var path = {
    src      : "src/",
    css      : "src/css/",
    js       : "src/js/",
    less     : "src/less/",
    img      : "src/images/",
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
                    .pipe(gulp.dest('dist/css'))
                    .pipe(notify({message : 'less compile complete!'}));
    } else {
        return  gulp.src(path.less + '*.less')
                    .pipe(less())
                    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
                    .pipe(gulp.dest('dist/css'))
                    .pipe(notify({message : 'less compile complete!'}));
    }
});

// server
gulp.task('server', function() {
    connect.server({
        root: path.dist,
        port: 8000,
        livereload: true
    });
});
// 刷新
gulp.task('reload-dev', ['css'], function() {
    return gulp.src(path.dist + '**/*.*')
               .pipe(connect.reload())
               .pipe(notify({message : 'server reload complete!'}));
});
// 监听
gulp.task('watch', function() {
    // 其实没必要监听所有
    return gulp.watch([
                path.src  + '**/*.*',
                path.dist + '*.html'
            ], ['reload-dev']);
});

gulp.task('default', ['server', 'watch']);
gulp.task('build', ['set-production', 'css', 'replace']);

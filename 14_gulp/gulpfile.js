// http://www.ydcss.com/archives/18
// http://www.cnblogs.com/xjcjcsy/p/4467751.html
// http://segmentfault.com/a/1190000003730672
var gulp           = require('gulp'),
    less           = require('gulp-less'),
    autoprefixer   = require('gulp-autoprefixer'),
    minifycss      = require('gulp-minify-css'),
    livereload     = require('gulp-livereload'),
    notify         = require('gulp-notify'),
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
})
// 编译less
gulp.task('pLcss', function() {
    if(env.production) {
        return  gulp.src(path.less + '*.less')
                    .pipe(less())
                    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
                    .pipe(minifycss())
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
gulp.task('reload-dev', ['pLcss'], function() {
    return gulp.src(path.dist + '**/*.*')
               .pipe(connect.reload())
               .pipe(notify({message : 'server reload complete!'}));
});
// 监听
gulp.task('watch', function() {
    return gulp.watch([
                path.src  + '**/*.*',
                path.dist + '*.html'
            ], ['reload-dev']);
});

gulp.task('default', ['server', 'watch']);
gulp.task('build', ['set-production', 'pLcss']);

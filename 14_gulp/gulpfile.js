// http://www.ydcss.com/archives/18
// http://www.cnblogs.com/xjcjcsy/p/4467751.html
// http://segmentfault.com/a/1190000003730672
var gulp       = require('gulp'),
    less       = require('gulp-less'),
    livereload = require('gulp-livereload'),
    notify     = require('gulp-notify'),
    connect    = require('gulp-connect');

var path = {
    src      : "src/",
    css      : "src/css/",
    js       : "src/js/",
    less     : "src/less/",
    img      : "src/images/",
    dist     : "dist/"
}
// 编译less
gulp.task('less', function() {
    gulp.src(path.less + 'index.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({message : 'less compile complete!'}));
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
gulp.task('reload-dev', ['less'], function() {
    gulp.src(path.dist + '**/*.*')
        .pipe(connect.reload())
        .pipe(notify({message : 'server reload complete!'}));
});
// 监听
gulp.task('watch', function() {
    gulp.watch([
        path.src  + '**/*.*',
        path.dist + '*.html'
    ], ['reload-dev']);
});

gulp.task('default', ['server', 'watch']);
gulp.task('build', ['less']);

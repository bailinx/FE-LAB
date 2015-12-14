// http://www.ydcss.com/archives/18
// https://cnodejs.org/topic/53427d16dc556e3b3901861e
var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('testLess', function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['testLess']);
var gulp = require('gulp');
var gulpMerge = require('gulp-merge');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');

gulp.task('css', function() {
    return sass('public/assets/css/dev/', {style: 'compact'})
        .on('error', function(err) {
            console.log('Error', err.message);
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./public/assets/css/build'))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/assets/css/dist'));
});

gulp.task('js', function() {
    return gulpMerge(
        gulp.src(['./public/assets/js/vendor/jquery.min.js', './public/assets/js/vendor/**/*.js'])
            .pipe(concat('vendor.js'), {newLine: ';'})
            .pipe(gulp.dest('public/assets/js/dist')),
        gulp.src('./public/assets/js/dev/**/*.js')
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('main.js'), {newLine: ';'})
            .pipe(gulp.dest('public/assets/js/build'))
            .pipe(uglify())
            .pipe(gulp.dest('public/assets/js/dist'))
    );
});

gulp.task('cleanCss', function(cb) {
    rimraf('./public/assets/css/dist', cb);
});
gulp.task('cleanJs', function(cb) {
    rimraf('./public/assets/js/dist', cb);
});

gulp.task('watch', function() {
    // Watching files
    gulp.watch('./public/assets/css/dev/**/*.scss', ['cleanCss', 'css']);
    gulp.watch('./public/assets/js/dev/**/*.js', ['cleanJs', 'js']);
});

gulp.task('default', function() {
    gulp.start('watch');
});
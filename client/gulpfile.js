var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var reactify = require('reactify');
var stylus = require('gulp-stylus');
var vinylSource = require('vinyl-source-stream');
var watchify = require('watchify');


var bundler = watchify(browserify('./js/app.js', watchify.args));


gulp.task('css', function() {
    gulp.src(['css/*.styl'])
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('build'));
});


function jsBundle() {
    return bundler.transform(reactify)
        .bundle()
        .pipe(vinylSource('bundle.js'))
        .pipe(gulp.dest('build'));
}


gulp.task('js', function() {
    return jsBundle();
});


gulp.task('watch', function() {
    bundler.on('update', jsBundle);
    bundler.on('log', console.log);

    gulp.watch('css/**/*.styl', ['css']);
});


gulp.task('build', ['css', 'js']);
gulp.task('default', ['js', 'watch']);

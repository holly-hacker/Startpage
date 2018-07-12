var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'sass', 'ts'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("src/ts/*.ts", ['ts']);
    gulp.watch("build/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/html/*.html", ['html']).on('change', browserSync.reload);
});

gulp.task('html', function() {
    return gulp.src("./src/html/*.html")
        .pipe(gulp.dest("build"))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
});

gulp.task('ts', function() {
    return gulp.src('./src/ts/*.ts')
        .pipe(ts({outFile: "main.js"}))
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
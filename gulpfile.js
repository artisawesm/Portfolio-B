var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var beautify = require('gulp-beautify');
var concat = require('gulp-concat');
var htmlBeautify = require('gulp-html-beautify');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

var path = {
    //assets source
    pug: './src/*.pug',
    scss: './src/scss/**/*.scss',
    js: './src/assets/js/*.js',
    image: './src/assets/images/*',

    //lib source
    cssLib: [
        './src/assets/css/lib/bootstrap.min.css',
        './src/assets/css/lib/font-awesome.min.css',
        './src/assets/css/lib/animate.css',
        './src/assets/css/lib/jquery.fullPage.css'
    ],

    jsLib: [
        './src/assets/js/lib/jquery-3.1.1.min.js',
        './src/assets/js/lib/bootstrap.min.js',
        './src/assets/js/lib/jquery.fullPage.min.js',
        './src/assets/js/lib/scrolloverflow.min.js',
        './src/assets/js/lib/typed.js',
        './src/assets/js/lib/wow.min.js',
    ]
};

//===================== COMPILE
gulp.task('style',function(){
    return gulp.src(path.cssLib)
    .pipe(uglifycss())
    .pipe(concat('lib.min.css'))
    .pipe(gulp.dest('./dist/assets/css/lib'));
});

gulp.task('script',function(){
    return gulp.src(path.jsLib)
    .pipe(uglify())
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./dist/assets/js/lib'));
});

gulp.task('compile', ['style', 'script']);

//===================== IMAGEMIN
gulp.task('compress-image', function(){
    return gulp.src(path.image)
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images'));
});

//===================== PUG
gulp.task('pug', function(){
    return gulp.src(path.pug)
    .pipe(pug())
    .pipe(htmlBeautify({indentSize: 4}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

//===================== SASS
gulp.task('scss', function(){
    return gulp.src(path.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(uglifycss())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
});

//===================== JS
gulp.task('js', function(){
    return gulp.src(path.js)
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});

//===================== SERVE
gulp.task('serve', function(){

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(path.pug, ['pug']);
    gulp.watch(path.scss, ['scss']);
    gulp.watch(path.js, ['js']);
    gulp.watch('./dist/*').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
//STAND ALONE TASKS
//compile
//compress-images

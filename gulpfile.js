/**
 * This file contains all the gulp tasks needed to create a production and archive build for the plugin.
 */
'use strict';

// Require all the necessary modules.
let gulp         = require( 'gulp' ),
    sass         = require( 'gulp-sass' ),
    lec          = require ( 'gulp-line-ending-corrector' ),
    sourcemaps   = require( 'gulp-sourcemaps' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    cleanCSS     = require( 'gulp-clean-css' ),
    rename       = require( 'gulp-rename' ),
    // concat       = require( 'gulp-concat' ),
    // pump         = require( 'pump' ),
    // uglify       = require( 'gulp-uglify-es' ).default,
    del          = require( 'del' );


// Compile the main Sass file into expanded CSS basic stylesheet
gulp.task( 'compileMainStylesheet',  () => {
    return gulp.src( './sass/atom-builder.scss' )
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(lec({eolc: 'CRLF'}))
        .pipe(gulp.dest('./css/'));
});

// Compile the widgets Sass files into expanded CSS widgets stylesheets
gulp.task('compileWidgets', () => {
    return gulp.src('./sass/widgets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(lec({eolc: 'CRLF'}))
        .pipe(gulp.dest('./widgets/css/'));
});



// Auto-prefix the main stylesheet.
gulp.task('prefixMainStylesheet', ['compileMainStylesheet'], () => {
    return gulp.src('./css/atom-builder.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))        
        .pipe(gulp.dest('./css/'));
});

// Auto-prefix the color scheme stylesheet.
gulp.task('prefixWidgets', ['compileWidgets'], () => {
    return gulp.src('./widgets/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))        
        .pipe(gulp.dest('./widgets/css/'));
});



// Minify the main stylesheet
gulp.task('minifyMainStylesheet', ['prefixMainStylesheet'], () => {
    return gulp.src('./css/atom-builder.css')
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(rename('./atom-builder.min.css'))
        .pipe(gulp.dest('./css/'));
});

// Minify the color schemes stylesheets.
gulp.task('minifyWidgets', ['prefixWidgets'], () => {
    return gulp.src('./widgets/css/*.css')
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest('./widgets/css/'));
});



// Concatenate and minify the main JavaScript files
gulp.task('minifyMainScripts', () => {
    return gulp.src('./js/*.js')
        .pipe(concat('main-scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'));
});



// Task to clean CSS files, JS files and plugin folder.
gulp.task('clean', function(){
     return del([ '.sass-cache', 'css', 'js', 'widgets/css' , 'atom-builder', 'atom-builder-archive']);
});



// Main Build task. Build the plugin for production
gulp.task('build', ['minifyMainStylesheet', 'minifyWidgets'], function(){
    return gulp.src([
            'css/**',
            'inc/**',
            'js/**',
            'languages/**',
            'widgets/**',
            '*.php',
            'readme.txt',
        ], {base: './'})
           .pipe(gulp.dest('./atom-builder'));
});

// Archive Build task. Build the theme for archiving
gulp.task('archive', ['build'], function(){
    return gulp.src([
            'assets/**',
            'css/**',
            'inc/**',
            'js/**',
            'languages/**',
            'sass/**',
            'widgets/**',
            '*.php',
            'gulpfile.js',
            'package.json',
            'readme.txt',
        ], {base: './'})
           .pipe(gulp.dest('./atom-builder-archive'));
            
});


// Default task
gulp.task('default', ['clean'], function(){
    gulp.start('archive');
})
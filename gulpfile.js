// Defining dependencies
var gulp = require('gulp'),  
    $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var del = require('del');
var runSequence = require('run-sequence');
var src = 'app/';
var dest = 'dist/';



// Jade compiling
gulp.task('jade', function() {
  return gulp.src(['app/jade/**/*.jade', '!app/jade/template.jade', '!app/jade/en/template.jade', '!app/jade/blocks/*.jade', '!app/jade/en/en-blocks/*.jade'])
    .pipe($.plumber())
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('app'))
    .pipe(reload({stream: true}));
});

// Styles task: 
gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer(
        'last 5 version',
        'safari 5',
        'ie 8',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
    ))
    .pipe(gulp.dest('app/.tmp'))
    .pipe(reload({stream: true}));
});

// Concat JS and push into a temporary folder to watch it live on local server
gulp.task('scripts', function() {
    return gulp.src(src + 'scripts/*.js')      
      .pipe(gulp.dest('app/.tmp'))   
      .pipe(reload({stream:true}));      
});

// Take images, comprime them, and push into dist
gulp.task('images', function () {
    return gulp.src('app/img/**/*')
        .pipe($.newer(dest + 'img'))
        .pipe($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(dest + 'img'))                  
});

// Clean /dist and /.tpm folder
gulp.task('clean', function(cb) {
    del(['dist', 'app/.tmp'], cb) 
});


// Starting a web server and watch for changes in html, styles, scripts
gulp.task('connect', ['watch'], function(){
    browserSync({
        server: {
            baseDir: "app"
        }
    });
    gulp.watch(['*.html', '.tmp/main.css', '.tmp/main.js'], {cwd: 'app'}, reload);
})

// Watch for changes
gulp.task('watch', function() {    
    gulp.watch('app/**/*.jade', ['jade']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);  
    gulp.watch('app/styles/**/*.scss', ['styles']);

})

//  Injecting project dependencies
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    gulp.src('app/jade/**/template.jade')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['app/bower_components/modernizr/modernizr.js'],
            ignorePath: '../',
        }))
        .pipe(gulp.dest('app/jade'))        
});

// Build for production
gulp.task('useref', function () {
    var gulpif = require('gulp-if');
    var assets = $.useref.assets();
    return gulp.src(['app/**/*.html', '!app/bower_components/**'])
        .pipe(assets)
        .pipe(gulpif('*.js', $.uglify()))
        .pipe(gulpif('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(dest))
});

// Grab libraries files from bower_components, minify and push in /dist
gulp.task('fonts', function() {
    return gulp.src(['app/**/fonts/*.eot', 'app/**/fonts/*.woff', 'app/**/fonts/*.svg', 'app/**/fonts/*.ttf'])
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('extras', function () {
    return gulp.src(['app/**/*.*', '!app/en/*.html', '!app/*.html', '!app/bower_components/**', '!app/scripts/**', '!app/styles/**', '!app/img/**', '!app/jade/**', '!app/.tmp/**', '!app/.tmp'], { dot: true })
        .pipe(gulp.dest(dest));
});

// Define build task that compiles everything but without starting the watch task
gulp.task('build', function () {
    runSequence(
        'jade',
        ['styles', 'scripts'],
        ['images', 'fonts', 'extras', 'useref']        
    );
});


// Default task to start the project
gulp.task('default', ['scripts', 'styles', 'wiredep', 'connect']);


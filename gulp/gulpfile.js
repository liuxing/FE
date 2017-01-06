const gulp = require('gulp')
const watchPath = require('gulp-watch-path')
const gutil = require('gulp-util')
const combiner = require('stream-combiner2')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload;

const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-ruby-sass')
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer')

let handleError = function (err) {
    let colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}

// js
gulp.task('uglify', function () {
    gulp.watch('src/js/**/*.js', function (event) {
        let paths = watchPath(event, 'src/', 'dist/')
        /*
         paths
         { srcPath: 'src/js/app.js',
         srcDir: 'src/js/',
         distPath: 'dist/js/app.js',
         distDir: 'dist/js/',
         srcFilename: 'app.js',
         distFilename: 'app.js' }
         */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        let combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            babel(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])

        combined.on('error', handleError)
    })
})

// scss

gulp.task('sass',function () {
    gulp.watch('src/scss/**/*', function (event) {
        let paths = watchPath(event, 'src/', 'dist/css/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        sass(paths.srcPath)
            .on('error', function (err) {
                console.error('Error!', err.message);
            })
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: 'last 2 versions'
            }))
            .pipe(sourcemaps.write('./'))
            // @TODO
            .pipe(gulp.dest('dist/css/'))
            .pipe(browserSync.stream())
    })
})

// image

gulp.task('image', function () {
    gulp.watch('src/images/**/*', function (event) {
        let paths = watchPath(event,'src/','dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
})

// copy
gulp.task('copy', function () {
    gulp.watch('src/**/*', function (event) {
        let paths = watchPath(event, 'src/', 'dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
            .pipe(browserSync.stream())
    })
})


gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('default', ['uglify', 'sass', 'image', 'copy', 'serve'])

const gulp = require('gulp')
const sass = require('gulp-ruby-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', ()=>{
    gulp.watch('./scss/**/*.scss', ()=>{
        sass('./scss/**/*.scss', {sourcemap: true})
            .on('error', sass.logError)
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: 'last 2 versions'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('css/'))
    })
})

gulp.task('default', ['sass'])

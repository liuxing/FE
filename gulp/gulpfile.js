const gulp = require('gulp')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-ruby-sass')
const imagemin = require('gulp-imagemin')

// 处理js文件
gulp.task('script', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

// 自动 监听文件修改
gulp.task('auto', function () {
    gulp.watch('src/js/*.js', ['script'])
})

// // 默认任务 default
// gulp.task('default', ['script', 'auto'])

// 处理css文件

gulp.task('minify-css', function () {
    gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
})

// gulp auto 启动此任务
gulp.task('auto', function () {
    gulp.watch('src/css/*.css', ['css'])
});

// 默认任务 default
// gulp.task('default', ['css', 'auto'])

// 图片

gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
)

gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch('images/*.*)', ['images'])
});


// gulp.task('default', ['images', 'auto'])


// sass

gulp.task('sass', () =>
    sass('src/css/*.scss', {sourcemap: true, style: 'compressed'})
        .on('error', sass.logError)
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest('dist/css'))
)

const {src,dest,series, parallel,watch} = require('gulp');
const globs = {
    html:"project/*.html",
    css:"project/css/**/*.css",
    js:"project/js/*.js"
};

// HTML Task
const htmlmin = require('gulp-htmlmin');

function htmlTask(){
    //Read Html File
    return src(globs.html)
    //minify html
    .pipe(htmlmin({ collapseWhitespace: true , removeComments:true}))
    //Copy to Dist Folder
    .pipe(dest("dist"))
}
// exports.html = htmlTask
  
// JS Task
var concat = require('gulp-concat');
var jsMin = require('gulp-terser')
  
function jsTask(){
    return src(globs.js).pipe(concat("script.min.js")).pipe(jsMin()).pipe(dest('dist/assets'))
}
exports.js = jsTask
  
// css Task
var cssMin = require('gulp-clean-css')
  
function cssTask(){
    return src(globs.css).pipe(concat("style.min.css")).pipe(cssMin()).pipe(dest('dist/assets'))
}
// exports.css = cssTask
  

//Imgs Task
const imgMin = require('gulp-imagemin')
  
function imgTask(){
    return src("project/pics/*").pipe(imgMin()).pipe(dest("dist/images"))
}
// exports.img = imgTask

// Watch Task
function watchTask(){
    watch(globs.html, series(htmlTask,reloadTask))
    watch(globs.css, series(cssTask,reloadTask))
    watch(globs.js, series(jsTask,reloadTask))
}

// Serve
var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}

// Reload Task
function reloadTask(done) {
  browserSync.reload()
  done()
}


exports.default = series( parallel(imgMinify, jsMinify, sassMinify, minifyHTML) , serve , watchTask)


var gulp = require('gulp');
var inject = require('gulp-inject');
 
gulp.task('index', function () {
  var target = gulp.src('./project/index.html');
  var sources = gulp.src(['./project/js/**/*.js', './project/css/**/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./dist/assets'));
});
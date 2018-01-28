/**
 * Created by Chris on 28/01/2018.
 */

var gulp = require('gulp');
var zip = require('gulp-zip');
var manifest = require('./src/manifest.json');

gulp.task('default', ['publish']);

gulp.task('publish', function () {
    gulp.src('src/**/*')
        .pipe(zip('vivaldi-sync-'+manifest.version+'.zip'))
        .pipe(gulp.dest('dist'));
});
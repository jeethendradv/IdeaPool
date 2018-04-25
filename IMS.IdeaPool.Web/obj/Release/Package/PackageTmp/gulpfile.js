const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const fs = require("fs");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const glob = require('glob');
const requirejs = require('gulp-requirejs');
const del = require('del');


gulp.task('clean', function () {
    del(['Scripts/dist']);
});

gulp.task('requireconfig', function () {
    gulp.src([
        'Scripts/src/requirejsconfig.js'
    ])
        .pipe(gulp.dest('Scripts/dist'));
});

gulp.task('libraries', function () {
    gulp.src([
        'node_modules/requirejs/require.js'
        , 'node_modules/jquery/dist/jquery.min.js'
        , 'node_modules/respond.js/dest/respond.min.js'
        , 'node_modules/react/umd/react.development.js'
        , 'node_modules/react-dom/umd/react-dom.development.js'
        , 'node_modules/react-art/umd/react-art.production.min.js'
        , 'node_modules/lodash/lodash.min.js'
        , 'node_modules/react-router/umd/react-router.js'
        , 'node_modules/react-router-dom/umd/react-router-dom.js'
        , 'node_modules/react-transition-group/dist/react-transition-group.min.js'
        , 'node_modules/prop-types/prop-types.min.js'
        , 'node_modules/bootstrap-notify/bootstrap-notify.min.js'
        , 'node_modules/pubsub-js/src/pubsub.js'
        , 'node_modules/events/events.js'
    ])
        .pipe(gulp.dest('Scripts/dist/libraries'));

    gulp.src(['Scripts/jquery.signalR-2.2.2.js'])
        .pipe(gulp.dest('Scripts/dist/libraries/'));

    gulp.src(['node_modules/bootstrap/dist/**/*'])
        .pipe(gulp.dest('Scripts/dist/libraries/bootstrap'));

    //gulp.src(['node_modules/bootstrap/dist/fonts/*.*'])
    //    .pipe(gulp.dest('fonts'));

    gulp.src(['node_modules/summernote/dist/**/*'])
        .pipe(gulp.dest('Scripts/dist/libraries/summernote'));

    //gulp.src(['node_modules/summernote/dist/font/*.*'])
    //    .pipe(gulp.dest('Content/font'));

    gulp.src(['node_modules/p-loading/dist/css/p-loading.min.css'
        , 'node_modules/p-loading/dist/js/p-loading.min.js'])
        .pipe(gulp.dest('Scripts/dist/libraries/p-loading'));

    gulp.src(['node_modules/spectrum-colorpicker/spectrum.css'
        , 'node_modules/spectrum-colorpicker/spectrum.js'])
        .pipe(gulp.dest('Scripts/dist/libraries/spectrum-colorpicker'));

    gulp.src(['Scripts/react-notifications/**/*'])
        .pipe(gulp.dest('Scripts/dist/libraries/react-notifications'));

    //gulp.src(['Scripts/react-notifications/fonts/*.*'])
    //    .pipe(gulp.dest('Content/fonts'));

    gulp.src(['node_modules/classnames/*.js'])
        .pipe(gulp.dest('Scripts/dist/libraries/classnames'));

    gulp.src(['node_modules/jquery-colorbox/example3/**/*', 'node_modules/jquery-colorbox/jquery.colorbox-min.js'])
        .pipe(gulp.dest('Scripts/dist/libraries/jquery-colorbox'));

    gulp.src(['node_modules/jquery-ui-dist/jquery-ui.min.css'
        , 'node_modules/jquery-ui-dist/jquery-ui.structure.min.css'
        , 'node_modules/jquery-ui-dist/jquery-ui.theme.min.css'
        , 'node_modules/jquery-ui-dist/jquery-ui.min.js'])
        .pipe(gulp.dest('Scripts/dist/libraries/jquery-ui'));

    gulp.src(['node_modules/jquery-ui-dist/images/*.*'])
        .pipe(gulp.dest('Scripts/dist/libraries/jquery-ui/images'));
});

gulp.task('compilejsx', function () {
    gulp.src(['Scripts/src/**/*.*'])
        .pipe(babel({
            presets: ['react', ['env', { modules: 'amd' }]],
            plugins: ["transform-object-assign"]
        }))
        .pipe(gulp.dest('Scripts/dist/amd/'));
});

gulp.task('build', ['clean', 'libraries', 'requireconfig', 'compilejsx']);

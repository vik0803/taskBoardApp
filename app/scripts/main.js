require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        requirejs: '../bower_components/requirejs/require',
        'sass-bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
        underscore: '../bower_components/underscore/underscore-min'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['app', 'jquery'], function (app, $) {
    'use strict';

    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});

require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        requirejs: '../bower_components/requirejs/require',
        underscore: '../bower_components/underscore/underscore',
        modernizr: '../bower_components/modernizr/modernizr',
        utils: 'utils'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['app', 'jquery'], function (App, $) {
    'use strict';

    var application = new App();

    console.log('Running jQuery %s', $().jquery);
});

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
        },
        'modernizr': {
            exports: 'Modernizr'
        }
    }
});

require(['app', 'jquery'], function (App, $) {
    'use strict';

    var application = new App();

    console.log('unfortunately running jQuery with version %s', $().jquery);
});

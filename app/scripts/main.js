/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        datatables: '../bower_components/datatables/media/js/jquery.datatables',
        datatablesBootstrap3: '../bower_components/datatables-bootstrap3/BS3/assets/js/datatables'

    }
});

require([
    'app'
], function (App) {
    App.initialize();
});

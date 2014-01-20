'use strict';

define(['jquery', 'underscore'], 
    function($, underscore) {

        var app = function(options){

        };


        var cardsPath = '/cards.json';
        var cards = $.getJSON(cardsPath, function() {}).done(function(data) {
            console.log('cards are succesfully loaded', data);
            app = data;
            console.log(app);
        })
            .fail(function() {
                console.log('error while loading cards');
            });

        return app;
});
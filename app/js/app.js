'use strict';

define(['jquery', 'underscore', 'models/cardModel', 'controllers/cardsController'],
    function($, _, CardModel, CardsController) {

        var cardsPath = '/cards.json';
        var App = function(options){
            options = options || {};
            this.cards = options.cards ? options.cards : [];
            this.init();

        };

        App.prototype.init = function() {
            var self = this;
            var cards = $.getJSON(cardsPath, function() {}).done(function(data) {
                console.log('cards have been loaded:', data);
            }).fail(function() {
                console.log('error while loading cards');
            });

            cards.done(function(data){
                for (var i = 0, len = data.length; i < len; i++){
                    self.cards.push(new CardModel(data[i]));
                }
                localStorage.cards = JSON.stringify(self.cards);

                CardsController.start();
            });
        };


        return App;
    });

'use strict';

define(['jquery', 'underscore', 'models/cardModel', 'controllers/cardsController'],
    function($, _, CardModel, CardsController) {

        var cardsPath = '/cards.json';
        var App = function(options){
            options = options || {};
            this.cards = localStorage.cards ? JSON.parse(localStorage.cards) : [];
            this.init();
        };

        App.prototype.init = function() {
            var self = this;

            if (this.cards.length === 0) {
                var cards = $.getJSON(cardsPath, function() {}).done(function(data) {
                // console.log('cards have been loaded:', data);
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
            }
            else {
                CardsController.start();
            }
        };

        // don't even know where to put this(
        Array.prototype.move = function (old_index, new_index) {
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            return this; // for testing purposes
        };


        return App;
    });

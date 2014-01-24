'use strict';

define(['jquery', 'underscore', 'models/cardModel', 'controllers/cardsController', 'controllers/addController',
    'modernizr'],
    function($, _, CardModel, CardsController, AddController, Modernizr) {

        var cardsPath = '/cards.json';
        var App = function(options) {
            options = options || {};
            if (Modernizr.localstorage) {
                this.cards = localStorage.cards ? JSON.parse(localStorage.cards) : [];
            } else {
                this.cards = [];
            }

            this.init();
        };

        App.prototype.init = function() {
            var self = this;

            if (this.cards.length === 0) {
                var cards = $.getJSON(cardsPath, function() {}).done(function(data) {
                    console.log('cards have been loaded from json:', data);
                }).fail(function() {
                    console.log('error while loading cards');
                });

                cards.done(function(data) {
                    for (var i = 0, len = data.length; i < len; i++) {
                        self.cards.push(new CardModel(data[i]));
                    }
                    localStorage.cards = JSON.stringify(self.cards);
                    CardsController.start();
                    AddController.start();
                });
            } else {
                console.log('cards have been loaded from localStorage');
                CardsController.start();
                AddController.start();
            }
        };

        // don't even know where to put this( Let it be here for a while
        Array.prototype.move = function(oldIndex, newIndex) {
            if (newIndex >= this.length) {
                var k = newIndex - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
            return this; // for testing purposes
        };


        return App;
    });

'use strict';

define(['jquery', 'underscore', 'models/cardModel', 'controllers/cardsController', 'controllers/addController',
    'modernizr'],
    function($, _, CardModel, CardsController, AddController, Modernizr) {

        var cardsPath = '../cards.json';
        var App = function(options) {
            options = options || {};
            if (Modernizr.localstorage) {
                this.cards = localStorage.cards ? JSON.parse(localStorage.cards) : [];
            } else {
                this.cards = [];
            }
            this.init();
        };

        _.extend(App.prototype, {
            init: function() {
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
                        var cardsContr = new CardsController();
                        new AddController(cardsContr);
                    });
                } else {
                    console.log('cards have been loaded from localStorage');
                    var cardsContr = new CardsController();
                    new AddController(cardsContr);
                }
            }

        });


        return App;
    });

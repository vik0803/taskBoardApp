define(['underscore', 'views/addView'], function(_, AddView) {
    'use strict';
    var AddController = function(controller) {
        this.connection = controller;
        this.init();
    };

    _.extend(AddController.prototype, {

        init: function() {
            new AddView();
            this.bindEvents();
        },

        bindEvents: function() {
            // todo localStorage fallback
            var self = this;
            document.getElementById('add').addEventListener('click', function() {
                var cards = JSON.parse(localStorage.cards);
                var cardName = document.getElementById('card-name').value;
                // normally i'd create a collection with id's or something
                // where the one below should be registered and stuff like that
                var cardId = _.random(20, 99);
                var cardType = $('input#card-type').is(':checked') ? 'bug' : 'task';
                if (cardName) {
                    cards.push({
                        id: cardId,
                        name: cardName,
                        type: cardType,
                        status: 'toDo'
                    });
                    localStorage.cards = JSON.stringify(cards);
                    // TODO avoid reloading all the cards
                    self.connection.init();
                }

            }, false);
        }

    });

    return AddController;
});

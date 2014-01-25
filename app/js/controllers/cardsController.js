'use strict';
define(['underscore','views/cardsView'], function(_, CardsView) {

    var CardsController = function(cards) {
        this.init(cards);
    };

    _.extend(CardsController.prototype, {
        init: function(cards) {
            this.cards = localStorage.cards ? JSON.parse(localStorage.cards) : cards;
            // TODO automatic cards splitting and views creation with element mapping
            // really got no time, guys
            this.toDo = [];
            this.inProgress = [];
            this.done = [];

            for (var i = 0, length = this.cards.length; i < length; i++) {
                // TOOD move to base
                var colConstructor = {
                    toDo: this.toDo,
                    inProgress: this.inProgress,
                    done: this.done
                }[this.cards[i].status];
                colConstructor.push(this.cards[i]);
            }
            // TODO proper element selection and controller behaviour
            this.toDoListView = new CardsView(this.toDo, 'toDo', this);
            this.inProgressListView = new CardsView(this.inProgress, 'inProgress', this);
            this.doneListView = new CardsView(this.done, 'done', this);
        },

        insertAfter: function(data){
            // TODO auto logic + move to base
            var sourceCol = {
                toDo: this.toDo,
                inProgress: this.inProgress,
                done: this.done
            }[data.sourceStatus];
            var sList = {
                toDo: this.toDoListView,
                inProgress: this.inProgressListView,
                done: this.doneListView
            }[data.sourceStatus];
            var targetCol = {
                toDo: this.toDo,
                inProgress: this.inProgress,
                done: this.done
            }[data.targetStatus];
            var tList = {
                toDo: this.toDoListView,
                inProgress: this.inProgressListView,
                done: this.doneListView
            }[data.targetStatus];

            if (targetCol === sourceCol) {
                // Array.move() : is in app for now (
                this.move(targetCol, data.sourceIndex, data.targetIndex + 1);
                tList.init();
            } else {
                var model = _.findWhere(sourceCol, {
                    id: data.sourceId
                });
                if (model) {
                    model.status = data.targetStatus;
                    sourceCol.splice(data.sourceIndex, 1);
                    targetCol.splice(data.targetIndex + 1, 0, model);
                }

                tList.init();
                sList.init();
            }

            this.storeCards();
        },

        removeCard: function(from, index){
            from.splice(index, 1);
            this.storeCards();
            // TODO do not reload everything :(
            this.init();
        },

        storeCards:  function(){
            // We're in a hurry, right? (-_-;)
            var arr = _.union(this.toDo, this.inProgress, this.done),
                storage = [];
            // Getting rid of circular dependancies
            _.each(arr, function(obj) {
                var clone = _.clone(obj);
                delete clone.collection;
                delete clone.controller;
                storage.push(clone);
            });
            localStorage.cards = JSON.stringify(storage);
        },

        move: function(arr, from, where) {
            if (from >= arr.length) {
                var k = from - arr.length;
                while ((k--) + 1) {
                    arr.push(undefined);
                }
            }
            arr.splice(from, 0, arr.splice(where, 1)[0]);
            this.storeCards();
            return arr; // for testing purposes
        }

    });

    return CardsController;

});

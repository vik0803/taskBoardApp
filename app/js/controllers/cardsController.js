'use strict';
define(['views/cardsView'], function(CardsView){

    function start(cards){
        var cards = localStorage.cards ? JSON.parse(localStorage.cards) : cards;
        var self = this;
        // TODO automatic cards splitting and views creation with element mapping
        this.toDo = [];
        this.inProgress = [];
        this.done = [];

        for (var i = 0, length = cards.length; i < length; i++) {
            // TOOD move to base
            var colConstructor = {
                toDo: this.toDo,
                inProgress: this.inProgress,
                done: this.done
            }[cards[i].status];
            colConstructor.push(cards[i]);
        }

        // TODO proper element selection, controller behaviour
        this.toDoListView = new CardsView(this.toDo, 'to-do', this);
        this.inProgressListView = new CardsView(this.inProgress, 'in-progress', this);
        this.doneListView = new CardsView(this.done, 'done', this);

        $(this).on('changeOrder', function(e, data){
            // TODO auto logic + move to base
            var targetCol = {
                toDo: self.toDo,
                inProgress: self.inProgress,
                done: self.done
            }[data.targetStatus];
            var sourceCol = {
                toDo: self.toDo,
                inProgress: self.inProgress,
                done: self.done
            }[data.sourceStatus];
            var sList = {
                toDo: self.toDoListView,
                inProgress: self.inProgressListView,
                done: self.doneListView
            }[data.sourceStatus];
            var tList = {
                toDo: self.toDoListView,
                inProgress: self.inProgressListView,
                done: self.doneListView
            }[data.targetStatus];

            if (targetCol === sourceCol) {
                targetCol.move(data.sourceIndex, data.targetIndex);
                tList.render();
            }
            else {
                var model = _.findWhere(sourceCol, {id: data.sourceId});
                model.status = data.targetStatus;
                sourceCol.splice(data.sourceIndex, 1);
                targetCol.splice(data.targetIndex + 1, 0, model);
                tList.render();
                sList.render();
            }

            // We're in a hurry, right? (-_-;)
            var arr = _.union(self.toDo, self.inProgress, self.done);
            var toStore = [];
            // Gettind rid of circular dependancies
            _.each(arr, function(obj) {
                var clone = _.clone(obj);
                delete clone.collection;
                toStore.push();
            });
            localStorage.clear();
            localStorage.cards = JSON.stringify(toStore);
        });
    }

    return {
        start:start
    };
});

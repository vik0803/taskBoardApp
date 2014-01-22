'use strict';
define(['views/cardsView'], function(CardsView){

    function start(){
        var cards = JSON.parse(localStorage.cards);

        // TODO automatic cards splitting and views creation and element mapping
        this.toDo = [];
        this.inProgress = [];
        this.done = [];

        for (var i = 0, length = cards.length; i < length; i++) {
            var colConstructor = {
                toDo: this.toDo,
                inProgress: this.inProgress,
                done: this.done
            }[cards[i].status];
            colConstructor.push(cards[i]);
        }

        // TODO proper element selection
        this.toDoListView = new CardsView(this.toDo, 'to-do');
        this.inProgressListView = new CardsView(this.inProgress, 'in-progress');
        this.doneListView = new CardsView(this.done, 'done');

    }

    return {
        start:start
    };
});

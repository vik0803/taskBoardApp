define(['jquery', 'views/addView'], function($, AddView){

    function start(){
        AddView.render();
        bindEvents();
    }
    function bindEvents(){
        // todo localStorage fallback
        document.getElementById('add').addEventListener('click', function(){
            var cards = JSON.parse(localStorage.cards);
            var cardName = document.getElementById('card-name').value;
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
                require(['controllers/cardsController'], function(cardsController){
                    cardsController.start();
                });
            }

        }, false);
    }
    return {
        start:start
    };
});

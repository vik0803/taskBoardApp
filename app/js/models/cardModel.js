define(['underscore'], function(_) {
    'use strict';
    var CardModel = function(options) {
        _.extend(this, options);
    };

    _.extend(CardModel.prototype, {
        getIndex: function(){
            return this.collection.indexOf(this);
        }
    });
    return CardModel;
});

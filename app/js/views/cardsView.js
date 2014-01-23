'use strict';
define(['jquery', 'underscore', 'views/cardView'],
    function($, _, CardView){

    var CardsView = function(parameters, el, controller) {
        this.el = document.getElementById(el);
        this.collection = parameters;
        // o_O
        this.controller = controller;
        this.init();
    }

    CardsView.prototype.init = function(){
        var self = this;
        _.each(this.collection, function(model){
            model.collection = self.collection;
        });


        // Sorry, no time at all to create normal events bindings
        // TODO Bind Events
        $(this.el).on('rendered', function(){

            _.each(self.childViews, function(view){
                view.listen();
                $(view).on('insertAfter', function(e, data){
                    $(self.controller).trigger('changeOrder', data);
                });
            });

        });

        this.render();
    };

    CardsView.prototype.render = function(){
        this.renderChildren();
    };

    CardsView.prototype.renderChildren = function(){
        if (this.collection && this.collection.length > 0) {
            this.showCollection();
        } else {
            // TODO empty view
            console.log('no children to render');
        }
    };

    CardsView.prototype.showCollection = function(){
        var ItemView, self = this;

        this.childViews = [];
        // TODO templates usage
        var html = '<ul>';
        this.el.innerHTML = html;

        _.each(this.collection, function(item, index){
            var view = new CardView(item, index);
            self.childViews.push(view);
            html += view.render().outerHTML;
        });

        html += '</ul>';

        this.el.innerHTML = html;

        $(this.el).trigger('rendered');
    };


    return CardsView;
});

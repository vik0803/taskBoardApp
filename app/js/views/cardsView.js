'use strict';
define(['jquery', 'underscore', 'views/cardView'],
    function($, _, CardView) {

        var CardsView = function(parameters, el, controller) {
            this.el = document.getElementById(el);
            // o_O
            this.collection = parameters;
            this.controller = controller;
            this.init();
        };

        CardsView.prototype.init = function() {

            var self = this;
            _.each(this.collection, function(model) {
                model.collection = self.collection;
            });

            this.render();
        };

        CardsView.prototype.render = function() {
            this.renderChildren();
        };

        CardsView.prototype.renderChildren = function() {
            var self = this;

            this.childViews = [];
            // TODO templates usage
            var list = document.createElement('ul');
            list.className = 'list-group';

            if (this.collection && this.collection.length > 0) {
                _.each(this.collection, function(model) {
                    var view = new CardView(model);
                    self.childViews.push(view);
                    list.insertAdjacentHTML('beforeend', view.render());
                });
            } else {
                var emptyView = new CardView({isEmpty: true});
                list.insertAdjacentHTML('beforeend', emptyView.render());
            }

            this.el.innerHTML = list.outerHTML;

            _.each(self.childViews, function(view) {
                // TODO get this bullshit away: fixing bug with vice-versa several times dragging
                setTimeout(function(){
                    view.listen();
                }, 1);
                $(view).on('insertAfter', function(e, data) {
                    $(self.controller).trigger('changeOrder', data);
                });
            });
        };

        return CardsView;
    });

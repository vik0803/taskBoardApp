'use strict';
define(['jquery', 'underscore', 'views/cardView'],
    function($, _, CardView) {

        var CardsView = function(parameters, el, controller) {
            this.el = document.getElementById(el);
            this.collection = parameters;
            // o_O
            this.controller = controller;
            this.init();
        }

        CardsView.prototype.init = function() {
            var self = this;
            _.each(this.collection, function(model) {
                model.collection = self.collection;
            });

            // Sorry, no time at all to create normal events bindings and
            // TODO Bind Events
            $(this.el).on('rendered', function() {
                _.each(self.childViews, function(view) {
                    view.listen();
                    $(view).on('insertAfter', function(e, data) {
                        $(self.controller).trigger('changeOrder', data);
                    });
                });
            });

            this.render();
        };

        CardsView.prototype.render = function() {
            this.renderChildren();
        };

        CardsView.prototype.renderChildren = function() {
            var ItemView, self = this;

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

            $(this.el).trigger('rendered');
        };

        return CardsView;
    });

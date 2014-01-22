'use strict';
define(['jquery', 'underscore', 'views/cardView'], function($, _, CardView){

    var CardsView = function(parameters, el) {
        this.el = document.getElementById(el);
        this.collection = parameters;
        this.init();
    }

    CardsView.prototype.init = function(){
        // this.el.addEventListener('dragstart', handleDragStart, false);
        // this.el.addEventListener('dragenter', handleDragEnter, false);
        // this.el.addEventListener('dragover', handleDragOver, false);
        // this.el.addEventListener('dragleave', handleDragLeave, false);
        // this.el.addEventListener('dragend', handleDragEnd, false);
        // this.el.addEventListener('drop', handleDragEnd, false);


        $(this.el).on('rendered', function(){

            // function handleDragStart(e) {
            //   this.style.opacity = '0.4';  // this / e.target is the source node.
            // }

            // var cols = document.querySelectorAll('[draggable="true"]');
            // [].forEach.call(cols, function(col) {
            //     col.
            // });

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
        var ItemView;
        // TODO templates usage
        var html = '<ul>';

        this.el.innerHTML = html;
        _.each(this.collection, function(item, index){
            var view = new CardView(item, index);
            html += view.render();
        });

        html += '</ul>';

        this.el.innerHTML = html;

        $(this.el).trigger('rendered');
    };


    return CardsView;
});

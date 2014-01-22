'use strict';
define(['underscore', 'jquery'], function(_, $){

    var CardView = function(model){
        // console.log(model);
        this.model = model;
        this.init();
    };

    CardView.prototype.init = function(){
        // this.el.addEventListener('dragstart', handleDragStart, false);
        // this.el.addEventListener('dragenter', handleDragEnter, false);
        // this.el.addEventListener('dragover', handleDragOver, false);
        // this.el.addEventListener('dragleave', handleDragLeave, false);
        // this.el.addEventListener('dragend', handleDragEnd, false);
        // this.el.addEventListener('drop', handleDragEnd, false);
        console.log(this);
        this.el = document.createElement('li');
        this.el.setAttribute('draggable', true);
        this.el.innerHTML = this.el.innerHTML + this.model.name;

        this.listen();
        this.render();
    };

    // TODO check how they normally do such thing? saving context
    CardView.prototype.listen = function() {
        var self = this;
        window.addEventListener('dragstart', function(e) {
           self.onDragStart(e);
        });
        window.addEventListener('dragenter', function(e){
            self.onDragEnter(e);
        });
        window.addEventListener('dragover', function(e){
            self.onDragOver(e);
        });
        window.addEventListener('dragleave', function(e){
            self.onDragLeave(e);
        });
    }
    // TODO templates; refactor
    CardView.prototype.render = function(){
        return this.el.outerHTML;
    };

    CardView.prototype.onDragStart = function(e) {
        // console.log('dragstart', this, e);
    };

    CardView.prototype.onDragEnter = function(e) {
        console.log('onDragEnter', this, e);
        $(e.target).addClass('over');
    };

    CardView.prototype.onDragOver = function(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        // console.log('onDragOver', this, e);
        return false;
    };

    CardView.prototype.onDragLeave = function(e) {
        // console.log('onDragLeave', this, e);
        // $(this.el).classList.remove('over');
    };


    return CardView;
});

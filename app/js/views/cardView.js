'use strict';
define(['underscore', 'jquery', 'utils'], function(_, $, utils){

    var CardView = function(model){
        this.model = model,
        this.init();
    };

    CardView.prototype.init = function(){
        this.el = document.createElement('li');
        this.el.setAttribute('draggable', true);
        this.el.innerHTML = this.el.innerHTML + this.model.name;
        this.el.className = 'card';
        this.el.classList.add(this.model.type);
        this.el.id = this.model.id;
        this.overTopClass = 'over-top';
        this.overBottomClass = 'over-bottom';
        this.dragClass = 'drag';
        // this.placeholder = document.createElement('li');
        // this.placeholder.className = 'placeholder';

        this.render();

        // this.listen();
    };

    // TODO check how they normally do such thing? saving context
    // BindEvents
    CardView.prototype.listen = function() {
        var self = this;
        // Sorry, no time for a better solution
        var el = document.getElementById(this.model.id);
        el.addEventListener('dragstart', function(e) {
           self.onDragStart(e);
        }, false);
        el.addEventListener('dragenter', function(e){
            self.onDragEnter(e);
        }, false);
        el.addEventListener('dragover', function(e){
            self.onDragOver(e);
        }, false);
        el.addEventListener('dragleave', function(e){
            self.onDragLeave(e);
        }, false);
        el.addEventListener('drop', function(e){
            self.onDrop(e);
        }, false);
        el.addEventListener('dragend', function(e){
            self.onDragEnd(e);
        }, false);
    };
    // TODO templates; refactor
    CardView.prototype.render = function(){
        return this.el;
    };

    CardView.prototype.onDragStart = function(e) {

        e.dataTransfer.effectAllowed = 'move';
        var data = {
            sourceId: this.model.id,
            sourceIndex: this.model.collection.indexOf(this.model),
            sourceType: this.model.type,
            sourceStatus: this.model.status
        };

        e.dataTransfer.setData('application/x-content', JSON.stringify(data));

        e.dataTransfer.effectAllowed = 'move';
    };

    CardView.prototype.onDragEnter = function(e) {
        var self = this;
        var target = $(e.target);
        this.showMarkers(e);
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
        var self = this;

        this.hideMarkers(e);

    };

    CardView.prototype.onDrop = function(e){
        // stops the browser from redirecting.
        var self = this;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        this.hideMarkers(e);
        this.hideUiClasses(e);

        var data = JSON.parse(e.dataTransfer.getData('application/x-content'));
        data.targetId = this.model.id;
        data.targetIndex = this.model.collection.indexOf(this.model);
        data.targetStatus = this.model.status;
        data.targetType = this.model.type;
        //TODO insertAfter

        if ((data.sourceIndex === data.targetIndex) && (data.sourceStatus === data.targetStatus)) {
            console.log('nothing has changed');
        }
        else {
            $(this).trigger('insertAfter', data);
        }
        return false;
    };

    CardView.prototype.onDragEnd = function(e){
        // this.hideMarkers(e);
        // this.hideUiClasses(e);
    };

    CardView.prototype.showMarkers = function(e){
        var self = this;
        // Sorry, no time to do it proper
        var el = document.getElementById(this.model.id);
        var index = this.model.collection.indexOf(this.model);

        // TODO Find a way to drop in the end
        // if (index !== 0) {
        //     el.classList.add(this.overBottomClass);
        // }
        // else {
        el.classList.add(this.overBottomClass);
        // }
    };

    CardView.prototype.hideMarkers = function(e){
        // e.target.classList.remove(this.overTopClass);
        e.target.classList.remove(this.overBottomClass);
    };

    CardView.prototype.hideUiClasses = function(e){
        e.target.classList.remove(this.dragClass);
    };

    return CardView;
});

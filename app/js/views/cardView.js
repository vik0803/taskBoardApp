'use strict';
define(['underscore', 'utils'], function(_, utils) {

    var CardView = function(options, controller) {
        if (options.isEmpty !== true) {
            this.model = options;
        }
        this.controller = controller;
        this.init();
    };

    _.extend(CardView.prototype, {

        init: function() {

            this.el = document.createElement('li');
            this.el.className = 'list-group-item';
            this.overTopClass = 'over-top';
            this.overBottomClass = 'over-bottom';
            this.dragClass = 'drag';

            if (this.model) {
                this.el.id = this.model.id;
                this.el.setAttribute('draggable', true);
                this.el.innerHTML = this.el.innerHTML + '<span>' + this.model.name + '</span>';
                this.el.insertAdjacentHTML('beforeend', '<span class="glyphicon glyphicon-trash"></span>');

                this.el.classList.add(this.model.type);
                if (this.model.status === 'done') {
                    this.el.classList.add('disabled');
                }
            } else {
                this.el.innerHTML = '<div class="alert alert-info">No cards left</div>';
            }

            // Consider again placeholder usage
            // this.placeholder = document.createElement('li');
            // this.placeholder.className = 'placeholder';

        },

        listen: function() {
            var self = this;
            // Sorry, no time for a better solution
            var el = document.getElementById(this.model.id);
            el.addEventListener('dragstart', function(e) {
                self.onDragStart(e);
            }, false);
            el.addEventListener('dragenter', function(e) {
                self.onDragEnter(e);
            }, false);
            el.addEventListener('dragover', function(e) {
                self.onDragOver(e);
            }, false);
            el.addEventListener('dragleave', function(e) {
                self.onDragLeave(e);
            }, false);
            el.addEventListener('drop', function(e) {
                self.onDrop(e);
            }, false);
            // el.addEventListener('dragend', function(e) {
            //     self.onDragEnd(e);
            // }, false);

            var collection = this.model.collection;
            var index = collection.indexOf(this.model);

            // So again i should've used templates and write ui-hash-tags logic
            // from the start - not now
            var removeIcon = el.getElementsByClassName('glyphicon-trash')[0];
            removeIcon.addEventListener('click', function(e) {
                e.preventDefault();
                self.controller.removeCard(collection, index);
            }, false);

            el.querySelector('span').addEventListener('click', function(e) {
                e.preventDefault();
                this.setAttribute('contenteditable', true);
                this.addEventListener('input', function() {
                    self.model.name = this.innerHTML;
                    this.addEventListener('bind', function() {
                        self.cardEdited(this);
                    }, false);
                });
            }, false);
        },

        cardEdited: function(el) {
            this.model.name = el.innerHTML;
        },

        render: function() {
            return this.el.outerHTML;
        },

        onDragEnter: function(e) {
            this.showMarkers(e);
        },

        onDragStart: function(e) {
            e.target.classList.add(this.dragClass);
            var data = {
                sourceId: this.model.id,
                sourceIndex: this.model.collection.indexOf(this.model),
                sourceType: this.model.type,
                sourceStatus: this.model.status
            };

            e.dataTransfer.setData(utils.crossBrowserDataTransferName('application/x-content'), JSON.stringify(data));

            e.dataTransfer.effectAllowed = 'move';
        },
        onDragOver: function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            return false;
        },

        onDragLeave: function(e) {
            this.hideMarkers(e);

        },

        onDrop: function(e) {
            // stops the browser from redirecting.
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            this.hideMarkers(e);
            this.hideUiClasses(e);

            var data = JSON.parse(e.dataTransfer.getData(utils.crossBrowserDataTransferName('application/x-content')));
            data.targetId = this.model.id;
            data.targetIndex = this.model.collection.indexOf(this.model);
            data.targetStatus = this.model.status;
            data.targetType = this.model.type;

            //TODO insertBefore
            if ((data.sourceIndex === data.targetIndex) && (data.sourceStatus === data.targetStatus)) {
                console.log('nothing has changed');
            } else {
                this.controller.insertAfter(data);
            }
            return false;
        },

        // onDragEnd: function(e) {
        //     // this.hideMarkers(e);
        //     // this.hidxeUiClasses(e);
        // },

        showMarkers: function() {
            // Sorry, no time to do it proper
            var el = document.getElementById(this.model.id);
            // var index = this.model.collection.indexOf(this.model);

            // TODO Find a way to drop at the top
            // if (index !== 0) {
            //     el.classList.add(this.overBottomClass);
            // }
            // else {
            el.classList.add(this.overBottomClass);
            // }
        },

        hideMarkers: function(e) {
            // e.target.classList.remove(this.overTopClass);
            if (e.target.classList) {
                e.target.classList.remove(this.overBottomClass);
            }
        },

        hideUiClasses: function(e) {
            e.target.classList.remove(this.dragClass);
        }

    });

    return CardView;
});

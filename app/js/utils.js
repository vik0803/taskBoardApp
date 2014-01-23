define(function() {
    'use strict';

    var utils = {
        hasClass: function(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        },
        crossBrowserDataTransferName: function(name) {
            var isIE = (navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('msie') > -1) || !! navigator.userAgent.match(/Trident.*rv[ :]*11\./);
            if (isIE) {
                name = name.replace('application/x-content', 'text');
            }
            return name;
        },

        insertAfter: function(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    };

    return utils;
});

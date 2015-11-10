'use strict';

(function() {
angular
    .module('angularjsTutorial.common')
    .directive('atConfirm', atConfirm);

function atConfirm() {
    var directive = {
        restrict: 'A',
        link: { pre: preLinkFunction }
    };

    return directive;

    function preLinkFunction(scope, element, attrs) {
        var msg = attrs.confirm || 'Are you sure?';

        element.bind('click', function (event) {
            if (!confirm(msg)) {
                event.stopImmediatePropagation();
                event.preventDefault;
            }
        });
    }
}

})();

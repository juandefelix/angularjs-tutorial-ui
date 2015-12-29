(function() {
'use strict';

angular
    .module('angularjsTutorial.microposts')
    .directive('atMicropost', atMicropost);

function atMicropost() {
    var directive = {
        restrict: 'E',
        scope: {
            micropost: '=',
            user: '='
        },
        controller: controllerFn,
        controllerAs: 'ctrl',
        templateUrl: 'components/microposts/micropost.html'
    };

    return directive;

    function controllerFn() {
        var ctrl = this;

        ctrl.timeAgoInWords = timeAgoInWords;

        function timeAgoInWords(startDate) {
            var now = Date.now();
            var minutes = (now - Date.parse(startDate)) / 60000;

            var data = [
                [1, 'less than a minute ago'],
                [2, 'a minute ago'],
                [45, timeAgo(1, 'minutes')],
                [90, 'about 1 hour ago'],
                [1440, timeAgo(60, 'hours')],
                [2880, '1 day ago'],
                [43200, timeAgo(1440, 'days')],
                [86400, 'about 1 month ago'],
                [52960, timeAgo(43200, 'months')],
                [1051200, 'about 1 year ago'],
                [Number.MAX_VALUE, timeAgo(525960, 'years')]
            ];

            function timeAgo(unitInMinutes, string) {
                return function(time) {
                    return (time / unitInMinutes).toFixed() + ' ' + string + ' ago';
                };
            }

            var words = null;
            for (var i = 0; i < data.length && words === null; i++) {
                if (minutes <= data[i][0]) {
                    words = (data[i][1] instanceof Function) ? data[i][1](minutes) : data[i][1];
                }
            }

            return words === null ? 'a long time ago' : words;
        }
    }
}

})();

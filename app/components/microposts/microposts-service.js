(function() {
"use strict";

angular
    .module('angularjsTutorial.microposts')
    .factory('MicropostsService', MicropostsService);

MicropostsService.$inject = ['$q', '$resource', 'environment'];

function MicropostsService($q, $resource, environment) {
    var svc = {};

    svc.getMicropostsPageForUser = getMicropostsPageForUser;

    var Microposts = $resource(environment.SERVER_URL + '/api/microposts/:id', {}, {
            micropostsPageForUser: {
                method: 'GET',
                params: { pageNumber: 1, itemsPerPage: 25 },
                url: environment.SERVER_URL + '/api/microposts/user_page/:userId'
            }
        }
    );

    return svc;

    function getMicropostsPageForUser(userId, pageNumber, itemsPerPage) {
        var query = { userId: userId, pageNumber: pageNumber, itemsPerPage: itemsPerPage };
        return Microposts.micropostsPageForUser(query).$promise
    }
}

})();

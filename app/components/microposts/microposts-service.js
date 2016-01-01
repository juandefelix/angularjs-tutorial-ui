(function() {
"use strict";

angular
    .module('angularjsTutorial.microposts')
    .factory('MicropostsService', MicropostsService);

MicropostsService.$inject = ['$q', '$resource', 'environment'];

function MicropostsService($q, $resource, environment) {
    var svc = {};

    svc.userMicropostPage = { microposts: [], userId: null, page: 1, itemsPerPage: 7, totalItems: 0 };

    svc.getMicropostsPage = getMicropostsPage;
    svc.getMicropostsFeedPageForUser = getMicropostsFeedPageForUser;

    var Microposts = $resource(environment.SERVER_URL + '/api/microposts/:id', {}, {
            micropostsPageForUser: {
                method: 'GET',
                params: { pageNumber: 1, itemsPerPage: 8 },
                url: environment.SERVER_URL + '/api/microposts/user_page/:userId'
            },
            micropostsFeedPageForUser: {
                method: 'GET',
                params: { pageNumber: 1, itemsPerPage: 8 },
                url: environment.SERVER_URL + '/api/microposts/feed/:userId'
            }
        }
    );

    return svc;

    function getMicropostsPage(userId, pageNumber, itemsPerPage) {
        svc.userMicropostPage.page = pageNumber;
        svc.userMicropostPage.itemsPerPage = itemsPerPage;
        svc.userMicropostPage.userId = userId;
        var query = { userId: userId, pageNumber: pageNumber, itemsPerPage: itemsPerPage };

        Microposts.micropostsPageForUser(query).$promise
            .then(function(res) {
                svc.userMicropostPage.microposts = res.microposts;
                svc.userMicropostPage.totalItems = res.count;
            });
    }

    function getMicropostsFeedPageForUser(userId, pageNumber, itemsPerPage) {
        var query = { userId: userId, pageNumber: pageNumber, itemsPerPage: itemsPerPage };
        return Microposts.micropostsFeedPageForUser(query).$promise;
    }
}

})();

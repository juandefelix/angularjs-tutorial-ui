(function() {
'use strict';

angular
    .module('angularjsTutorial.users')
    .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$routeParams', 'MicropostsService', 'PageSvc', 'SessionsService', 'UsersService'];

function UsersShowCtrl($routeParams, micropostsService, pageSvc, sessionsService, usersService) {
    var ctrl = this;

    ctrl.user = {};
    ctrl.microposts = [];
    ctrl.pagination = { page: 1, itemsPerPage: 7, totalItems: 0 };

    ctrl.getMicropostsPage = getMicropostsPage;

    initializeController();

    function initializeController() {
        pageSvc.setPageTitle('Show user');
        sessionsService.requireLogin();
        usersService.getUser($routeParams.id)
            .then(function(res) {
                ctrl.user = res;
                getMicropostsPage(ctrl.pagination.page);
            });
    }

    function getMicropostsPage(newPageNumber) {
        ctrl.pagination.page = newPageNumber;

        micropostsService.getMicropostsPageForUser(ctrl.user.id, newPageNumber, ctrl.pagination.itemsPerPage)
            .then(function(res) {
                ctrl.microposts = res.microposts;
                ctrl.pagination.totalItems = res.count;
            });
    }
}

})();

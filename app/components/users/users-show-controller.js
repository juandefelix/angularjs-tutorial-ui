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
    ctrl.pagination = { page: 1, pageItems: 7, total: 0 };

    ctrl.getMicropostsPage = getMicropostsPage;

    initializeController();

    function initializeController() {
        sessionsService.requireLogin();
        pageSvc.setPageTitle('Show user');
        usersService.getUser($routeParams.id)
            .then(function(res) {
                ctrl.user = res;
                getMicropostsPage(ctrl.pagination.page);
            });
    }

    function getMicropostsPage(pageNumber) {
        ctrl.pagination.page = pageNumber;

        micropostsService.getMicropostsPageForUser(ctrl.user.id, pageNumber, ctrl.pagination.pageItems)
            .then(function(res) {
                ctrl.microposts = res.microposts;
                ctrl.pagination.total = res.count;
            });
    }
}

})();

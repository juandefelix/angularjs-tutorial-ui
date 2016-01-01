(function() {
'use strict';

angular
    .module('angularjsTutorial.users')
    .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$routeParams', '$scope', 'MicropostsService', 'PageSvc', 'SessionsService', 'UsersService'];

function UsersShowCtrl($routeParams, $scope, micropostsService, pageSvc, sessionsService, usersService) {
    var ctrl = this;

    ctrl.user = {};
    ctrl.micropostPage = micropostsService.userMicropostPage;

    ctrl.getMicropostsPage = getMicropostsPage;

    initializeController();

    function initializeController() {
        pageSvc.setPageTitle('Show user');
        sessionsService.requireLogin();
        usersService.getUser($routeParams.id)
            .then(function(res) {
                ctrl.user = res;
                getMicropostsPage(1);
            });
    }

    function getMicropostsPage(newPageNumber) {
        micropostsService.getMicropostsPage(ctrl.user.id, newPageNumber,
            micropostsService.userMicropostPage.itemsPerPage);
    }
}

})();

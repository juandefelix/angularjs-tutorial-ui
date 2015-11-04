(function() {
'use strict';

angular
    .module('angularjsTutorial.users')
    .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['PageSvc', 'SessionsService', 'UsersService'];

function UsersIndexCtrl(pageSvc, sessionsService, usersService) {
    var ctrl = this;

    ctrl.users = [];
    ctrl.totalUsers = 0;
    ctrl.usersPerPage = 10;
    ctrl.pagination = {current: 1};

    ctrl.getUsersPage = getUsersPage;

    initializeController();

    function getUsersPage(pageNumber) {
        usersService.getUsersPage(pageNumber, ctrl.usersPerPage).then(function(usersPage) {
            ctrl.users = usersPage.users;
            ctrl.totalUsers = usersPage.count;
        })
    }

    function initializeController() {
        sessionsService.requireLogin();
        pageSvc.setPageTitle('Users');
        getUsersPage(ctrl.pagination.current);
    }
}

})();

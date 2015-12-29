(function() {
'use strict';

angular
    .module('angularjsTutorial.users')
    .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['PageSvc', 'SessionsService', 'UsersService'];

function UsersIndexCtrl(pageSvc, sessionsService, usersService) {
    var ctrl = this;

    ctrl.CONFIRM = 'Are you sure you want to delete the User?';

    ctrl.users = [];
    ctrl.totalUsers = 0;
    ctrl.usersPerPage = 10;
    ctrl.pagination = { current: 1 };

    ctrl.userIsAdmin = userIsAdmin;
    ctrl.getUsersPage = getUsersPage;
    ctrl.deleteUser = deleteUser;

    initializeController();

    function userIsAdmin() {
        return sessionsService.currentUser.admin;
    }

    function getUsersPage(pageNumber) {
        ctrl.pagination.current = pageNumber;
        
        usersService.getUsersPage(pageNumber, ctrl.usersPerPage).then(function(usersPage) {
            ctrl.users = usersPage.users;
            ctrl.totalUsers = usersPage.count;
        });
    }

    function deleteUser(user) {
        usersService.deleteUser(user).then(function() {
            getUsersPage(ctrl.pagination.current);
        });
    }

    function initializeController() {
        sessionsService.requireLogin();
        pageSvc.setPageTitle('Users');
        getUsersPage(ctrl.pagination.current);
    }
}

})();

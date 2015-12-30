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
    ctrl.pagination = { page: 1, totalItems: 0, itemsPerPage: 10 };

    ctrl.currentUserIsAdmin = sessionsService.currentUserIsAdmin;
    ctrl.getUsersPage = getUsersPage;
    ctrl.deleteUser = deleteUser;

    initializeController();

    function getUsersPage(newPageNumber) {
        ctrl.pagination.page = newPageNumber;

        usersService.getUsersPage(ctrl.pagination.page, ctrl.pagination.itemsPerPage)
            .then(function(resp) {
                ctrl.users = resp.users;
                ctrl.pagination.totalItems = resp.count;
            });
    }

    function deleteUser(user) {
        usersService.deleteUser(user).then(function() {
            getUsersPage(ctrl.pagination.page);
        });
    }

    function initializeController() {
        pageSvc.setPageTitle('Users');
        sessionsService.requireLogin();
        getUsersPage(ctrl.pagination.page);
    }
}

})();

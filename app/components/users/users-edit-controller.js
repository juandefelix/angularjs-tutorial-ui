(function() {
    'use strict';

    angular
        .module('angularjsTutorial.users')
        .controller('UsersEditCtrl', UsersEditCtrl);

    UsersEditCtrl.$inject = ['$location', '$q', '$routeParams', 'PageSvc', 'SessionsService', 'UsersService', 'flash'];

    function UsersEditCtrl($location, $q, $routeParams, pageSvc, sessionsService, usersService, flash) {
        var ctrl = this;

        ctrl.editUser = {};

        ctrl.updateUser = updateUser;
        ctrl.isNameUnique = isNameUnique;
        ctrl.isEmailUnique = isEmailUnique;

        initializeController();

        function updateUser() {
            var editUser = {
                id: sessionsService.currentUser.id,
                name: ctrl.editUser.username,
                email: ctrl.editUser.email,
                password: ctrl.editUser.password
            };

            usersService.updateUser(editUser).then(function(resp) {
                flash.success = resp.message;
                sessionsService.login(resp.user);
                $location.path(usersService.userPath(resp.user)).replace();
            });
        }

        function isNameUnique(value) {
            return usersService.isNameUnique(value);
        }

        function isEmailUnique(value) {
            return usersService.isEmailUnique(value);
        }

        function initializeController() {
            pageSvc.setPageTitle('Edit user');
            sessionsService.requireCorrectUser($routeParams.id);
            ctrl.editUser.username = sessionsService.currentUser.name;
            ctrl.editUser.email = sessionsService.currentUser.email;
            ctrl.editUser.gravatar_id = sessionsService.currentUser.gravatar_id;
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('angularjsTutorial.users')
        .controller('UsersEditCtrl', UsersEditCtrl);

    UsersEditCtrl.$inject = ['$location', '$q', '$routeParams', 'PageSvc', 'SessionsService', 'UsersService', 'flash'];

    function UsersEditCtrl($location, $q, $routeParams, pageSvc, sessionsService, usersService, flash) {
        var ctrl = this;

        /** User being edited. */
        ctrl.username;
        ctrl.email;
        ctrl.password;
        ctrl.confirmation;

        ctrl.updateUser = updateUser;
        ctrl.isNameUnique = isNameUnique;
        ctrl.isEmailUnique = isEmailUnique;

        initializeController();

        function updateUser() {
            var user = {
                id: sessionsService.currentUser.id,
                name: ctrl.username,
                email: ctrl.email,
                password: ctrl.password
            };

            usersService.updateUser(user).then(function(resp) {
                flash.success = resp.message;
                sessionsService.login(resp.user);
                $location.path(usersService.userPath(resp.user)).replace();
            })
        }

        function isNameUnique(value) {
            return usersService.isNameUnique(value);
        }

        function isEmailUnique(value) {
            return usersService.isEmailUnique(value);
        }

        function initializeController() {
            sessionsService.requireCorrectUser($routeParams.id);
            pageSvc.setPageTitle('Edit user');
            ctrl.username = sessionsService.currentUser.name;
            ctrl.email = sessionsService.currentUser.email;
        }
    }

})();

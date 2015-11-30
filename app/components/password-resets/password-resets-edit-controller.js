(function() {
'use strict';

angular
    .module('angularjsTutorial.passwordResets')
    .controller('PasswordResetsEditCtrl', PasswordResetsEditCtrl);

PasswordResetsEditCtrl.$inject = ['$location', '$routeParams', 'flash', 'PageSvc', 'PasswordResetsService'];

function PasswordResetsEditCtrl($location, $routeParams, flash, pageSvc, passwordResetsService) {
    var ctrl = this;

    ctrl.showForm = false;
    ctrl.password = null;
    ctrl.confirmation = null;

    var userId = null;
    var token = null;

    ctrl.updatePassword = updatePassword;

    initializeController();

    function updatePassword() {
        passwordResetsService.updatePassword(userId, token, ctrl.password)
            .then(function(message) {
                flash.success = message;
                $location.path('/login').replace();
            }).catch(function(err) {
                flash.error = err;
                $location.path('/').replace();
            })
    }

    function initializeController() {
        pageSvc.setPageTitle('Reset password');
        userId = $routeParams.id;
        token = $routeParams.token;

        passwordResetsService.validateToken(userId, token)
            .then(function() {
                ctrl.showForm = true;
            }).catch(function(err) {
                flash.error = err;
                $location.path('/').replace();
            })
    }
}

})();

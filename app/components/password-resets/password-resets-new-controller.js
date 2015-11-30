(function() {
'use strict';

angular
    .module('angularjsTutorial.passwordResets')
    .controller('PasswordResetsNewCtrl', PasswordResetsNewCtrl);

PasswordResetsNewCtrl.$inject = ['$location', 'PageSvc', 'PasswordResetsService', 'flash'];

function PasswordResetsNewCtrl($location, pageSvc, passwordResetsService, flash) {
    var ctrl = this;

    ctrl.email = null;

    ctrl.createResetToken = createResetToken;

    var requestSent = false;

    initializeController();

    function createResetToken() {
        if (!requestSent) {
            requestSent = true;
            passwordResetsService.createToken(ctrl.email)
                .then(function(string) {
                    flash.success = string;
                    $location.path('/').replace();
                }).catch(function(err) {
                    flash.error = err;
                    $location.path('/').replace();
                });
        }
    }

    function initializeController() {
        pageSvc.setPageTitle('Forgot Password');
    }
}

})();

(function() {
'use strict';

angular
    .module('angularjsTutorial.passwordResets')
    .controller('PasswordResetsNewCtrl', PasswordResetsNewCtrl);

PasswordResetsNewCtrl.$inject = ['PageSvc'];

function PasswordResetsNewCtrl(pageSvc) {
    var ctrl = this;

    ctrl.email = null;

    ctrl.requestReset = requestReset;

    initializeController();

    function requestReset() {
        console.log('Reset requested for: ' + ctrl.email);
    }

    function initializeController() {
        pageSvc.setPageTitle('Forgot Password');
    }
}

})();

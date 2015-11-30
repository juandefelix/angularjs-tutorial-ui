(function() {
"use strict";

angular
    .module('angularjsTutorial.passwordResets')
    .factory('PasswordResetsService', PasswordResetsService);

PasswordResetsService.$inject = ['$q', '$resource', 'environment'];

function PasswordResetsService($q, $resource, environment) {
    var svc = this;

    svc.createToken = createToken;
    svc.updatePassword = updatePassword;
    svc.validateToken = validateToken;

    var PasswordResets = $resource(environment.SERVER_URL + '/api/password_resets/:id/:token', {}, {
        validateToken: {
            method: 'GET',
            url: environment.SERVER_URL + '/api/password_resets/valid_token',
        },
        updatePassword: { method: 'PUT' },
        createToken: { method: 'POST' }
    });

    return svc;

    function validateToken(userId, token) {
        var defer = $q.defer();
        PasswordResets.validateToken({ id: userId, token: token }, function(response) {
            defer.resolve();
        }, function(response) {
            defer.reject(response.data);
        });
        return defer.promise;
    }

    function createToken(email) {
        var defer = $q.defer();
        PasswordResets.createToken({ email: email }, function(response) {
            defer.resolve(response.message);
        }, function(response) {
            defer.reject(response.data);
        });
        return defer.promise;
    }

    function updatePassword(userId, token, newPassword) {
        var defer = $q.defer();
        PasswordResets.updatePassword({ id: userId, token: token }, { password: newPassword }, function(response) {
            defer.resolve(response.message);
        }, function(response) {
            defer.reject(response.data);
        });
        return defer.promise;
    }
}

})();

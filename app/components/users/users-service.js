(function() {
"use strict";

angular
    .module('angularjsTutorial.users')
    .factory('UsersService', UsersService);

UsersService.$inject = ['$q', '$resource', 'environment'];

function UsersService($q, $resource, environment) {
    var svc = {};

    var Users = $resource(environment.SERVER_URL + '/api/users/:id', {}, {
            queryPage: {
                method: 'GET',
                params: { pageNumber: 1, usersPerPage: 25 },
                url: environment.SERVER_URL + '/api/users/index_page'
            },
            update: { method: 'PUT' },
            isNameAvailable: { method: 'GET', url: environment.SERVER_URL + '/api/users/is_unique' },
            isEmailAvailable: { method: 'GET', url: environment.SERVER_URL + '/api/users/is_unique' },
            activateUser: {
                method: 'PUT',
                url: environment.SERVER_URL + '/api/users/activate/:id/:token',
            },
            createMicropost: {
                method: 'POST',
                url: environment.SERVER_URL + '/api/users/:id/microposts'
            },
            deleteMicropost: {
                method: 'DELETE',
                url: environment.SERVER_URL + '/api/users/:id/microposts/:micropost_id'
            }
        }
    );

    svc.createUser = createUser;
    svc.updateUser = updateUser;
    svc.getUsersPage = getUsersPage;
    svc.getUser = getUser;
    svc.userPath = userPath;
    svc.isNameUnique = isNameUnique;
    svc.isEmailUnique = isEmailUnique;
    svc.activateUser = activateUser;
    svc.createMicropost = createMicropost;
    svc.deleteUser = deleteUser;

    svc.deleteMicropost = function(userId, micropostId) {
        Users.deleteMicropost({ id: userId, micropost_id: micropostId });
    };

    return svc;

    function createUser(user) {
        return Users.save(user).$promise;
    }

    function createMicropost(userId, micropost) {
        return Users.createMicropost({ id: userId }, micropost).$promise;
    }

    function updateUser(user) {
        return Users.update({ id: user.id }, user).$promise;
    }

    function getUsersPage(page, itemsPerPage) {
        var query = { pageNumber: page, usersPerPage: itemsPerPage };
        return Users.queryPage(query).$promise;
    }

    function getUser(id) {
        return Users.get({ id: id }).$promise;
    }

    function deleteUser(user) {
        return Users.delete({ id: user.id }).$promise;
    }

    function userPath(user) {
        if (user && user.id) {
            return '/users/' + user.id;
        }
    }

    function isNameUnique(name) {
        var defer = $q.defer();
        Users.isNameAvailable({ name: name }).$promise.then(function(res) {
            if (res && res.valid) {
                defer.resolve();
            } else {
                defer.reject();
            }
        });

        return defer.promise;
    }

    function isEmailUnique(email) {
        var defer = $q.defer();
        Users.isEmailAvailable({ email: email }).$promise.then(function(res) {
            if (res && res.valid) {
                defer.resolve();
            } else {
                defer.reject();
            }
        });

        return defer.promise;
    }

    function activateUser(userId, token) {
        var defer = $q.defer();
        Users.activateUser({ id: userId, token: token }, {}, function(response) {
            defer.resolve(response);
        }, function(response) {
            defer.reject(response.data);
        });
        return defer.promise;
    }
}

})();

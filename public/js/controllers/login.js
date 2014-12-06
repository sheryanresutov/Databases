'use strict';

var login = angular.module('controllers.login', ['services.auth']);

function loginCtrl($scope, $location, Auth) {
  $scope.login = function() {
    Auth.login({
      email: $scope.user.email,
      password: $scope.user.password
    },
    function(err) {
      if (err) {
        $scope.error = err;
      } else {
        $location.path('/');
      }

    });
  };
  
}

//Auth from services.auth
login.controller('LoginCtrl', [
  '$scope',
  '$location',
  'Auth',
  loginCtrl]);
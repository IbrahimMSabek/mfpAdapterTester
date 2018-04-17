/**
 * login module
 */
var Login = angular.module('login', []);

Login.config(function($stateProvider, $urlRouterProvider) {

   $stateProvider

  // login state
  .state('login', {
    url: '/login',
    views: {
      "viewContent": {
          templateUrl: 'js/login/templates/login.html',
          controller: 'loginController'
      }
    }
  });
  
  $urlRouterProvider.otherwise('/login');

});

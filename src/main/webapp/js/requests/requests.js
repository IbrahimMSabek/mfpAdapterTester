/**
 * login module
 */
var Requests = angular.module('requests', []);

Requests.config(function($stateProvider, $urlRouterProvider) {

   $stateProvider

  // requests state
  .state('requests', {
    url: '/requests',
    views: {
      "viewContent": {
          templateUrl: 'js/requests/templates/requests.html',
          controller: 'requestsController'
      }
    }
  })
  //Add request state
  .state('addRequest', {
    url: '/addRequest',
    params:{index:null},
    views: {
      "viewContent": {
          templateUrl: 'js/requests/templates/addRequest.html',
          controller: 'addRequestController'
      }
    }
  });
  
  $urlRouterProvider.otherwise('/requests');

});

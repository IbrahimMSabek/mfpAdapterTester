// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
APITester = angular.module('apiTester', ['ionic', 'pascalprecht.translate','login','requests', 'ngMaterial', 'ngMessages'])

.run(function($ionicPlatform,$state,$ionicHistory,$rootScope,CONSTANTS) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //   cordova.plugins.Keyboard.disableScroll(true);

    // }
    // if (window.StatusBar) {
    //   // org.apache.cordova.statusbar required
    //   StatusBar.styleDefault();
    // }

    //Start worklight
    WL.Client.init(wlInitOptions);
    initApplication();
  });
  
})

.config(function($stateProvider, $urlRouterProvider,$translateProvider,$mdThemingProvider) {

  $translateProvider.useSanitizeValueStrategy('sanitize');
  // configures staticFilesLoader
  $translateProvider.useStaticFilesLoader({
    prefix: 'data/locale-',
    suffix: '.json'
  });
  // load 'en' table on startup
  $translateProvider.preferredLanguage('en');

  //Angular material theming
  // $mdThemingProvider.theme('default')
  //   .primaryPalette('orange');
  
  // if none of the above states are matched, use this as the fallback
  // if(isMobileProvider.phone) {
  //   $urlRouterProvider.otherwise('/login');
  // }else{
  //   $urlRouterProvider.otherwise('/home');
  // }

  $urlRouterProvider.otherwise('/login');
  

});

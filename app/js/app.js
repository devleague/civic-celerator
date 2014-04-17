'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'

]);
// .config( function ( $routeProvider, $locationProvider ) {

//   $routeProvider.
//     when( '/api/candidates', {

//       templateUrl : '../index.html'
//       controller  : 'MainCtrl'

//     }).
//     when( '/api/contributions', {

//       templateUrl : '../index.html',
//       controller  : 'MainCtrl'      

//     }).
//     otherwise({

//       redirectTo  : '/'

//     });

//   $locationProvider.html5mode( true ); 

// });
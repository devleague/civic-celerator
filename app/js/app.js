'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'

]);

myApp.config(function ( $routeProvider, $locationProvider ) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/landingPage.html',
      controller: 'LandingController'
    }).
    when('/candidates', {
      templateUrl: 'views/candidates.html',
      controller: 'MainCtrl'
    }).
    when('/bill/:oid', {
      templateUrl: '/views/bill.html',
      controller: 'MainCtrl'
    }).
    otherwise('/');

  $locationProvider.html5Mode(true);
});

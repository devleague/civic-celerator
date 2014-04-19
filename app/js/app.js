'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'

]);

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/bill/:id', {
      templateUrl: 'bill.html',
      controller: 'SingleBillController'
    });
  $locationProvider.html5Mode(true);
});

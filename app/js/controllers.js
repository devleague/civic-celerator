'use strict';

/* Controllers */

var myApp = angular.module('myApp.controllers', []);

myApp.controller('customController', ['$scope',
  function($scope) {
    var industrymoney = [3, 3, 2, 1, 2, 4];
    var data = {industrymoney: industrymoney}
    $scope.pData = data;
  }
]);
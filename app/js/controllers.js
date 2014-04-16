'use strict';

/* Controllers */

var myApp = angular.module('myApp.controllers', []);

myApp.controller('customController', ['$scope',
  function($scope) {
    var industrymoneya = [3, 23, 12, 15, 24, 34];
    var data = {industrymoney: industrymoneya}
    $scope.pData = data;
  }
])
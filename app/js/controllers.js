'use strict';

/* Controllers */

var myApp = angular.module('myApp.controllers', []);

myApp.controller('customController', ['$scope',
  function($scope) {
    var industrymoneya = [3, 23, 12, 15, 24, 34];
    var data = {industrymoney: industrymoneya}
    $scope.pData = data;

    $scope.lData = [
      {
        "date": "01201990",
        "contributionmoney": "151651"
      },
      {
        "date": "02121990",
        "contributionmoney": "324234"
      }
    ];

  }
])

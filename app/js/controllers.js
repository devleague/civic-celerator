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
        "date": "2013-03-01T01:10:00",
        "contributionmoney": "151651"
      },
      {
        "date": "2013-03-06T01:10:00",
        "contributionmoney": "324234"
      },
      {
        "date": "2013-03-23T01:10:00",
        "contributionmoney": "843567334"
      },
      {
        "date": "2013-04-20T01:10:00",
        "contributionmoney": "34654"
      },
      {
        "date": "2013-04-21T01:10:00",
        "contributionmoney": "9877"
      }
    ];

  }
])

'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [] );

/**************************************************
        * Main Controller / index.html
**************************************************/

App.controller( 'MainCtrl', [ '$scope', '$http',
  function ( $scope, $http ) {


    var industrymoneya = [3, 23, 12, 15, 24, 34];
    var data = {industrymoney: industrymoneya};
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

    console.log("start");
    $http({

      method  : 'GET',
      url     : 'http://localhost:3000/api/candidates'

    }).
    success( function ( data, status, headers, config ) {

      var Candidates    = data;
      var CurCandidate  = 0;
      var pieData       = { industrymoney : Candidates[CurCandidate].industry };

      $scope.firstName  = Candidates[CurCandidate].first_name;
      $scope.lastName   = Candidates[CurCandidate].last_name;
      $scope.party      = Candidates[CurCandidate].party;
      $scope.coms       = Candidates[CurCandidate].committees;
      $scope.bills      = Candidates[CurCandidate].bills;
      $scope.picture    = Candidates[CurCandidate].photo_url;
      $scope.pData      = pieData;

    
      // right arrow click  
      $scope.forward = function () {

        CurCandidate      = ( CurCandidate + 1 ) % Candidates.length;
        var pieData       = { industrymoney : Candidates[CurCandidate].industry };


        $scope.firstName  = Candidates[CurCandidate].first_name;
        $scope.lastName   = Candidates[CurCandidate].last_name;
        $scope.party      = Candidates[CurCandidate].party;
        $scope.picture    = Candidates[CurCandidate].photo_url;
        $scope.coms       = Candidates[CurCandidate].committees;
        $scope.bills      = Candidates[CurCandidate].bills;
        $scope.pData      = pieData;

      };

      // left arrow click
      $scope.back =  function () {

        ( CurCandidate === 0 )? CurCandidate = Candidates.length -1 : CurCandidate--;
        var pieData       = { industrymoney : Candidates[CurCandidate].industry };

        $scope.firstName  = Candidates[CurCandidate].first_name;
        $scope.lastName   = Candidates[CurCandidate].last_name;
        $scope.party      = Candidates[CurCandidate].party;
        $scope.picture    = Candidates[CurCandidate].photo_url;
        $scope.coms       = Candidates[CurCandidate].committees;
        $scope.bills      = Candidates[CurCandidate].bills;
        $scope.pData      = pieData;
      
      };

    
    }).
    error( function ( data, status, headers, config ) {

      console.log('Error ' + status);

    });

    $http({

      method  : 'GET',
      url     : 'localhost:3000/api/contributions'

    }).
    success( function ( data, status, headers, config ) {

      console.log('/api/contributions data:');

    }).
    error( function ( data, status, headers, config ) {

      console.log( 'Error status : ' + status );

    });

  }

]);

'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );

/**************************************************
        * Main Controller / index.html
**************************************************/

App.controller( 'MainCtrl', [ '$scope', '$http',
  function ( $scope, $http ) {

    $scope.billView = function(bill_id) {
      $location.path("/bills/" + bill_id);
    }

    politician();

    $http({

      method  : 'GET',
      url     : 'http://localhost:3000/api/contributions'

    }).
    success( function ( data, status, headers, config ) {

      console.log('/api/contributions data:');

    }).
    error( function ( data, status, headers, config ) {

      console.log( 'Error status : ' + status );

    });

     function politician() {
      
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
        $scope.picture    = Candidates[CurCandidate].photo_url;
        $scope.pData      = pieData;
        $scope.forward    = forwardClick;
        $scope.back       = backwardClick;

        function forwardClick() {

          CurCandidate      = ( CurCandidate + 1 ) % Candidates.length;
          var pieData       = { industrymoney : Candidates[CurCandidate].industry };


          $scope.firstName  = Candidates[CurCandidate].first_name;
          $scope.lastName   = Candidates[CurCandidate].last_name;
          $scope.party      = Candidates[CurCandidate].party;
          $scope.picture    = Candidates[CurCandidate].photo_url;
          $scope.coms       = Candidates[CurCandidate].committees;
          $scope.bills      = Candidates[CurCandidate].bill_id;
          $scope.pData      = pieData;

        }

        // left arrow click
        function backwardClick() {

          ( CurCandidate === 0 )? CurCandidate = Candidates.length -1 : CurCandidate--;
          var pieData       = { industrymoney : Candidates[CurCandidate].industry };

          $scope.firstName  = Candidates[CurCandidate].first_name;
          $scope.lastName   = Candidates[CurCandidate].last_name;
          $scope.party      = Candidates[CurCandidate].party;
          $scope.picture    = Candidates[CurCandidate].photo_url;
          $scope.coms       = Candidates[CurCandidate].committees;
          $scope.bills      = Candidates[CurCandidate].bills;
          $scope.pData      = pieData;
        
        }

      }).
      error( function ( data, status, headers, config ) {

        console.log('Error ' + status);

      });

    }// function politician

  }

]);

App.controller( 'BillCtrl', [ '$scope', '$http', function ($scope, $http) {
  $scope.bill
}])

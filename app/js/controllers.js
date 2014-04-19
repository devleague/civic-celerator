'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );

/**************************************************
        * Main Controller / candidate.html
**************************************************/

App.controller( 'MainCtrl', [ '$scope', '$http', '$location',
  function ( $scope, $http, $location ) {

    $scope.billView = function(bill_id) {
      $location.path('/bills/' + bill_oid);
    }

    // loads politician: pic, name, bills, committee //
    politician();

    // temporarily here //
    //getContributions();

    $scope.viewSingleBill = function ( oid ) {

      console.log(oid);
      $location.url( '/bill/' + oid );

    };

    

/**************************************************
                    * Helpers
**************************************************/


    /*******************************
      * politician picture & name
    *******************************/
    var contributionType = ["Candidate","Candidate","Candidate", "Other Entity","Immediate Family", "Other Entity"," Noncandidate Committee", "Political Party", "Individual","Political Party"];
    var money = [123,1237,143,6,8,3,123,34,235,1324];
    var contributionData  = { industrymoney : money, contributiontype : contributionType };
    $scope.pData          = contributionData;

    function politician() {
      $http({

        method  : 'GET',
        url     : 'http://localhost:3000/api/candidates'

      }).
      success( function ( data, status, headers, config ) {

        var Candidates    = data;
        var CurCandidate  = 0;

        // first politician //
        $scope.fullName   = Candidates[CurCandidate].full_name;
        $scope.firstName  = Candidates[CurCandidate].first_name;
        $scope.lastName   = Candidates[CurCandidate].last_name;
        $scope.party      = Candidates[CurCandidate].party;
        $scope.picture    = Candidates[CurCandidate].photo_url;
        $scope.forward    = forwardClick;
        $scope.back       = backwardClick;
        $scope.leg_id     = Candidates[CurCandidate].leg_id;

        getCommittee( function( committee ) {

            $scope.committees = committee;

        });

        getBills("53504530fa5c824f199be48c", function( bills ) {

          $scope.bills = bills;

        });

        getContributions();

        // right arrow  click //
        function forwardClick() {

          CurCandidate      = ( CurCandidate + 1 ) % Candidates.length;

          $scope.fullName   = Candidates[CurCandidate].first_name;
          $scope.firstName  = Candidates[CurCandidate].first_name;
          $scope.lastName   = Candidates[CurCandidate].last_name;
          $scope.party      = Candidates[CurCandidate].party;
          $scope.picture    = Candidates[CurCandidate].photo_url;
          $scope.leg_id     = Candidates[CurCandidate].leg_id;

          getCommittee( function( committee ) {

             $scope.committees = committee;

          });

          getBills( function( bills ) {

            $scope.bills = bills;

          });

          getContributions();

        }

        // left arrow click //
        function backwardClick() {

          ( CurCandidate === 0 )? CurCandidate = Candidates.length -1 : CurCandidate--;

          $scope.fullName   = Candidates[CurCandidate].first_name;
          $scope.firstName  = Candidates[CurCandidate].first_name;
          $scope.lastName   = Candidates[CurCandidate].last_name;
          $scope.party      = Candidates[CurCandidate].party;
          $scope.picture    = Candidates[CurCandidate].photo_url;
          $scope.leg_id     = Candidates[CurCandidate].leg_id;

          getCommittee( function( committee ) {

            $scope.committees = committee;

          });

          getBills( function( bills ) {

            $scope.bills = bills;

          });


          getContributions();

        }


      }).
      error( function ( data, status, headers, config ) {

        console.log('Error ' + status);

      });

    }// function politician

    /*******************************
      * politician's committees
    *******************************/

    function getCommittee( cb ) {

    var politicianCommittees   = [];


      $http({

        method   : 'GET',
        url      : 'http://localhost:3000/api/committees'

      }).
      success( function ( data, status, headers, config ) {

        for (var i = 0; i < data.length; i++) {

          for (var j = 0; j < data[i].members.length; j++) {

            if ( $scope.leg_id == data[i].members[j].leg_id ) {

              politicianCommittees.push( data[i].committee[0] );

            }


          }

          cb( politicianCommittees );

        }


      }).
      error( function ( data, status, headers, config ) {

        console.log('Error ' + status);
        cb([]);

      });

    }// function committee


    /*******************************
          * politician's bills
    *******************************/

    function getBills(id, cb ) {

      console.log("money");
      // var billCollection = [];
      
      $http({

        method  : 'GET',
        url     : 'localhost:3000/api/bills/'+id

      }).
      success( function ( data, status, headers, config ) {

        for (var i = 0; i < data.length; i++) {

          for (var j = 0; j < data[i].sponsors.length; j++) {

            if ( $scope.leg_id == data[i].sponsors[j].leg_id ) {

              billCollection.push({

                id    : data[i].bill_id,
                title : data[i].title,
                oid   : data[i]._id

              });

            }

          }

        }

        return cb( billCollection );

      }).
      error( function ( data, status, headers, config ) {

        console.log( 'Error ' + status );
        cb([]);

      });

    }// function getBills


    /*****************************************
          * contributions to politician
    *****************************************/

    function getContributions ( cb ) {

      var money                   = [];
      var contributionType        = [];
      var contributedDate         = [];

      $http({

        method  : 'GET',
        url     : 'http://localhost:3000/api/contributions'

      }).
      success( function ( data, status, headers, config ) {
        
        for ( var i = 0; i < data.length; i++ ) {

          if ( $scope.fullName == data[i].candidate_name ) {

            money.push( data[i].amount );
            contributionType.push( data[i].contributor_type );
            contributedDate.push( data[i].date );

          }

        }

          var pieCandidateData = { industrymoney : money, contributiontype : contributionType };
          var lineChartData    = { industrymoney : money, contributiontype : contributionType, contributiondate : contributedDate };

          $scope.lData  = lineChartData;
          $scope.pData  = pieCandidateData;

      }).
      error( function ( data, status, headers, config ) {

        console.log( 'Error ' + status );

      });

    }// function getContributions

  }

]);

/**************************************************
        * SingleBillController / bill.html
**************************************************/

App.controller( 'SingleBillController', function ( $scope, $http, $routeParams ) {
  
  var bill_oid = $routeParams.oid;
  getSingleBill(bill_oid);


  /*******************************
        * specific bill.html
  *******************************/

  function getSingleBill ( oid ) {

    $http({

      method  : 'GET',
      url     : 'http://localhost:3000/api/bill/' + oid

    }).
    success( function ( data, status, headers, config ) {
      
      $scope.singleBill = data;

    }).
    error( function ( data, status, headers, config ) {

      console.log( "error getting single bill data: " + data );
      console.log( 'Error ' + status );

    });

  } //getSingleBill
   /*******************************
        * 
  *******************************/

  function supporters() {

    $http()
  }

});

App.controller('LandingController', function ($scope, $http, $location) {
  $scope.enter = function () {
    $location.path('/candidates');
  }
});

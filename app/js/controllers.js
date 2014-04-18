'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );

/**************************************************
        * Main Controller / index.html
**************************************************/

App.controller( 'MainCtrl', [ '$scope', '$http',
  function ( $scope, $http ) {

    getBills();
    politician();

    $http({

      method  : 'GET',
      url     : 'http://localhost:3000/api/contributions'

    }).
    success( function ( data, status, headers, config ) {

    }).
    error( function ( data, status, headers, config ) {

      console.log( 'Error status : ' + status );

    });



/**************************************************
                    * Helpers
**************************************************/
    

    /*******************************
      * politician picture & name 
    *******************************/

    function politician() {
      
      $http({

        method  : 'GET',
        url     : 'http://localhost:3000/api/candidates'

      }).
      success( function ( data, status, headers, config ) {

        var Candidates    = data;
        var CurCandidate  = 0;

        // first politician //
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

        getBills( function( bills ) {

          $scope.bills = bills;

        });

        // right arrow  click //
        function forwardClick() {

          CurCandidate      = ( CurCandidate + 1 ) % Candidates.length;

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

        }

        // left arrow click //
        function backwardClick() {

          ( CurCandidate === 0 )? CurCandidate = Candidates.length -1 : CurCandidate--;

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

    function getBills( cb ) {

      var billCollection = [];

      $http({

        method  : 'GET',
        url     : 'http://localhost:3000/api/bills'

      }).
      success( function ( data, status, headers, config ) {

        console.log("bill title:");
        console.log(data[0].title);

        console.log("sponsors:");
        //console.log(data[0].sponsors[0].leg_id);
        console.log(data[0]);

        for (var i = 0; i < data.length; i++) {

          for (var j = 0; j < data[i].sponsors.length; j++) {

            if ( $scope.leg_id == data[i].sponsors[j].leg_id ) {

              billCollection.push(data[i].bill_id);

              // console.log( data[i].sponsors[j].leg_id);
              // console.log( data[i].title );
              // console.log( data[i].sponsors[j].name );
              // console.log( data[i].summary );

            }
            
          }

        }

        return cb( billCollection );

      }).
      error( function ( data, status, headers, config ) {

        console.log( 'Error ' + status );

      });

    }// function getBills

  }

]);

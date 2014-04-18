'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );

/**************************************************
        * Main Controller / index.html
**************************************************/

App.controller( 'MainCtrl', [ '$scope', '$http',
  function ( $scope, $http ) {

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



/**************************************************
                    * Helpers
**************************************************/
    
    // politician picture & name //
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
        
        }


      }).
      error( function ( data, status, headers, config ) {

        console.log('Error ' + status);

      });

    }// function politician

    // Politician on committees //
    function getCommittee( cb ) {

    var politicianCommittees   = [];


      $http({

        method   : 'GET',
        url      : 'http://localhost:3000/api/committees'

      }).
      success( function ( data, status, headers, config ) {

        //console.log("inside committee, data below:");
        //console.log(data[0].members[0].leg_id);

        for (var i = 0; i < data.length; i++) {

          //console.log( data[i] );
          for (var j = 0; j < data[i].members.length; j++) {
            //console.log(data[i].committee[j]);

            if ( $scope.leg_id == data[i].members[j].leg_id ) {

              politicianCommittees.push( data[i].committee[0] );

            }

          
          }

          cb( politicianCommittees );

        }
        

      }).
      error( function ( data, status, headers, config ) {

        console.log('Error ' + status);
        cb( [] 
);

      });
    
    }// function committee

  }

]);

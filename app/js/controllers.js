'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );

// var Candidates = [
//   {
//     first_name  : "Donald",
//     last_name   : "Trump",
//     party       : "sexist",
//     picture     : "http://lorempixel.com/output/cats-h-c-200-300-7.jpg",
//     committees  : [ "NAMBLA", "Alpha Gamma Pi", "Skulls", "Daggars" ],
//     bills       : [ "HK432N", "123ABC", "FUCK23", "KINGTA", "JASON5", "RAYYAR" ],
//     industry    : [ 28, 15, 31, 2, 11 ]
//   },
//   {
//     first_name  : "Kingtak",
//     last_name   : "Wong",
//     party       : "All The Time",
//     picture     : "http://placekitten.com/g/200/300",
//     committees  : [ "Sexy", "alcoholics anonymous", "Fight club", "dealers" ],
//     bills       : [ "123456","abcdef","kingwa", "wongbu", "rawrsd", "poopie" ],
//     industry    : [ 18, 34, 22, 12, 21 ]
//   },
//   {
//     first_name  : "Tyler",
//     last_name   : "Boright",
//     party       : "Green",
//     picture     : "http://placekitten.com/200/300",
//     committees  : [ "Hippies","DARPA", "Skulls", "Alii" ],
//     bills       : [ "(.)(.)","qrthfds","artwqtr", "dgsdga", "gjgfhk", "rwewg" ],
//     industry    : [ 7, 25, 13, 12, 15 ]
//   },
//   {
//     first_name  : "Ray",
//     last_name   : "Farias",
//     party       : "Rock",
//     picture     : "http://lorempixel.com/output/cats-h-c-200-300-1.jpg",
//     committees  : ["Rambla","gambla", "hammah", "jang"],
//     bills       : ["sdfcdN","r4rwec","we23sd", "df42sd", "asdffb", "asfasdg" ],
//     industry    : [ 16, 14, 26, 2, 31 ]
//   }
// ];

// var Industry = [{

//     candidateFirst  : "Kingtak",
//     candidateLast   : "Wong",
//     entertainment   : "15",
//     politics        : "31",
//     retail          : "11",
//     food            : "2",
//     sex             : "28"

// }];



/**************************************************
        * Main Controller / index.html
**************************************************/

App.controller( 'MainCtrl', [ '$scope', '$http',
  function ( $scope, $http ) {

    console.log("start");
    $http({

      method  : 'GET',
      url     : 'http://localhost:8080/api/candidates'

    }).
    success( function ( data, status, headers, config ) {

      var Candidates    = data;
      console.log("inside /api/candidate data:");
      console.log(Candidates);
      console.log(Candidates[0].first_name);


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

      console.log( 'Error status : ' + status );
      console.log( 'Error data : ' + data );
      console.log( 'Error headers : ' + headers );
      console.log( 'Error config : ' + config );

    });

    $http({

      method  : 'GET',
      url     : 'localhost:8080/api/contributions'

    }).
    success( function ( data, status, headers, config ) {


    }).
    error( function ( data, status, headers, config ) {

      console.log( 'Error status : ' + status );
      console.log( 'Error data : ' + data );
      console.log( 'Error headers : ' + headers );
      console.log( 'Error config : ' + config );

    });

  }

]);











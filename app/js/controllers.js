'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );

var Candidates = [
  {
    first_name  : "Donald",
    last_name   : "Trump",
    party       : "sexist",
    picture     : "http://lorempixel.com/output/cats-h-c-200-300-7.jpg",
    committees  : [ "NAMBLA", "Alpha Gamma Pi", "Skulls", "Daggars" ],
    bills       : [ "HK432N", "123ABC", "FUCK23", "KINGTA", "JASON5", "RAYYAR" ],
    industry    : [ 28, 15, 31, 2, 11 ]
  },
  {
    first_name  : "Kingtak",
    last_name   : "Wong",
    party       : "All The Time",
    picture     : "http://placekitten.com/g/200/300",
    committees  : [ "Sexy", "alcoholics anonymous", "Fight club", "dealers" ],
    bills       : [ "123456","abcdef","kingwa", "wongbu", "rawrsd", "poopie" ],
    industry    : [ 18, 34, 22, 12, 21 ]
  },
  {
    first_name  : "Tyler",
    last_name   : "Boright",
    party       : "Green",
    picture     : "http://placekitten.com/200/300",
    committees  : [ "Hippies","DARPA", "Skulls", "Alii" ],
    bills       : [ "(.)(.)","qrthfds","artwqtr", "dgsdga", "gjgfhk", "rwewg" ],
    industry    : [ 7, 25, 13, 12, 15 ]
  },
  {
    first_name  : "Ray",
    last_name   : "Farias",
    party       : "Rock",
    picture     : "http://lorempixel.com/output/cats-h-c-200-300-1.jpg",
    committees  : ["Rambla","gambla", "hammah", "jang"],
    bills       : ["sdfcdN","r4rwec","we23sd", "df42sd", "asdffb", "asfasdg" ],
    industry    : [ 16, 14, 26, 2, 31 ]
  }
];

var Industry = [{

    candidateFirst  : "Kingtak",
    candidateLast   : "Wong",
    entertainment   : "15",
    politics        : "31",
    retail          : "11",
    food            : "2",
    sex             : "28"

}];



/**************************************************
        * Main Controller / index.html
**************************************************/

App.controller( 'MainCtrl', [ '$scope',

  function ( $scope ) {

    var CurCandidate  = 0;
    var politician    = Candidates[CurCandidate];
    
    // Reusable 
    var firstName = politician.first_name;
    var lastName  = politician.last_name;
    var party     = politician.party;
    var committee = politician.committees;
    var picture   = politician.picture;
    var bills     = politician.bills;
    var pieData   = { industrymoney : politician.industry };

    $scope.firstName  = firstName;
    $scope.lastName   = lastName;
    $scope.party      = party;
    $scope.coms       = committee;
    $scope.bills      = bills;
    $scope.picture    = picture;
    $scope.pData      = pieData;
  
    // right arrow click  
    $scope.forward      = function () {

      CurCandidate      = ( CurCandidate + 1 ) % Candidates.length;

      $scope.firstName  = firstName;
      $scope.lastName   = lastName;
      $scope.party      = party;
      $scope.picture    = picture;
      $scope.coms       = committee;
      $scope.bills      = bills;
      $scope.pData      = pieData;

    };

    // left arrow click
    $scope.back         =  function () {

      ( CurCandidate === 0 )? CurCandidate = Candidates.length -1 : CurCandidate--;

      $scope.firstName  = firstName;
      $scope.lastName   = lastName;
      $scope.party      = party;
      $scope.picture    = picture;
      $scope.coms       = committee;
      $scope.bills      = bills;
      $scope.pData      = pieData;
    
    };

  }

]);

/**************************************************
                * Bill.html
**************************************************/


App.controller( 'MoneyCtrl', [ '$scope',

  function ( $scope ) {

    //$scope.sex            = Candidates = 28;
    $scope.entertainment  = 15;
    $scope.politics       = 31;
    $scope.food           = 2;
    $scope.retail         = 11;

    var industrymoneya    = [ $scope.sex, $scope.entertainment, $scope.politics, $scope.food, $scope.retail ];
    var data              = { industrymoney : industrymoneya };

    $scope.pData = data;

  }

]);

App.controller( 'IndustryCtrl', [ '$scope',

  function ( $scope ) {

    var industrymoneya  = [ 15, 4, 42, 8, 23, 16 ];
    var data            = { industrymoney : industrymoneya };

    $scope.pData        = data;

  }

]);


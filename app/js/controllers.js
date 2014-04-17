'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap', 'ngTouch' ] );

var Candidates = [
  {
    first_name: "Donald",
    last_name: "Trump",
    party: "sexist",
    committees: ["NAMBLA","Alpha Gamma Pi", "Skulls", "Daggars"],
    bills: ["HK432N","123ABC","FUCK23", "KINGTA", "JASON5", "RAYYAR" ]
  },
  {
    first_name: "Kingtak",
    last_name: "Wong",
    party: "All The Time",
    committees: ["Sexy","alcoholics anonymous", "Fight club", "dealers"],
    bills: [ "123456","abcdef","kingwa", "wongbu", "rawrsd", "poopie" ]
  },
  {
    first_name: "Tyler",
    last_name: "Boright",
    party: "Green",
    committees: ["Hippies","DARPA", "Skulls", "Alii"],
    bills: ["(.)(.)","qrthfds","artwqtr", "dgsdga", "gjgfhk", "rwewg" ]
  },
  {
    first_name: "Ray",
    last_name: "Farias",
    party: "Rock",
    committees: ["Rambla","gambla", "hammah", "jang"],
    bills: ["sdfcdN","r4rwec","we23sd", "df42sd", "asdffb", "asfasdg" ]
  }
];


/****************************
      * Main Controller
****************************/
App.controller( 'MainCtrl', [ '$scope', function ( $scope ) {

  var CurCandidate = 0;

  $scope.firstName  = Candidates[CurCandidate].first_name;
  $scope.lastName   = Candidates[CurCandidate].last_name;
  $scope.party      = Candidates[CurCandidate].party;
  $scope.coms       = Candidates[CurCandidate].committees;
  $scope.bills      = Candidates[CurCandidate].bills;
  
  // right arrow click  
  $scope.forward    = function () {

    CurCandidate = ( CurCandidate + 1 ) % Candidates.length;

    $scope.firstName  = Candidates[CurCandidate].first_name;
    $scope.lastName   = Candidates[CurCandidate].last_name;
    $scope.party      = Candidates[CurCandidate].party;
    $scope.coms       = Candidates[CurCandidate].committees;
    $scope.bills      = Candidates[CurCandidate].bills;

  };

  // left arrow click
  $scope.back       =  function () {

    ( CurCandidate === 0 )? CurCandidate = Candidates.length -1 : CurCandidate--;

    $scope.firstName  = Candidates[CurCandidate].first_name;
    $scope.lastName   = Candidates[CurCandidate].last_name;
    $scope.party      = Candidates[CurCandidate].party;
    $scope.coms       = Candidates[CurCandidate].committees;
    $scope.bills      = Candidates[CurCandidate].bills;
  
  };

}]);

App.controller('customController', ['$scope',
  function($scope) {
    var industrymoneya = [3, 23, 12, 15, 24, 34];
    var data = {industrymoney: industrymoneya}
    $scope.pData = data;
  }
])

var App2 = angular.module('myApp2.controllers', []);

App2.controller('customController2', ['$scope',
  function($scope) {
    var industrymoneya = [15, 4, 42, 8, 23, 16];
    var data = {industrymoney: industrymoneya}
    $scope.pData = data;
  }
])


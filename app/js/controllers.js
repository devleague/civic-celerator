'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );

var Candidates = [
  {
    first_name: "Donald",
    last_name: "Trump",
    party: "sexist",
    committees: ["NAMBLA","Alpha Gamma Pi", "Skulls", "Daggars"],
    bills: ["HK432N","123ABC","FUCK23", "KINGTA", "JASON5", "RAYYAR" ],
    portrait: "http://placekitten.com/200/249",
    industry: [
      {"label" : "Candidate Committee", "value" : 28},
      {"label" : "Individual", "value" : 52},
      {"label" : "National Political Party", "value" : null},
      {"label" : "Non-Candidate Committee", "value" : 7},
      {"label" : "Other Entity", "value" : 24},
      {"label" : "Vendor/Business", "value" : 53}
      ]
  },
  {
    first_name: "Kingtak",
    last_name: "Wong",
    party: "All The Time",
    committees: ["Sexy","alcoholics anonymous", "Fight club", "dealers"],
    bills: [ "123456","abcdef","kingwa", "wongbu", "rawrsd", "poopie" ],
    portrait: "http://placekitten.com/201/250",
    industry: [
      {"label" : "Candidate Committee", "value" : null},
      {"label" : "Individual", "value" : 32},
      {"label" : "National Political Party", "value" : 27},
      {"label" : "Non-Candidate Committee", "value" : 76},
      {"label" : "Other Entity", "value" : 34},
      {"label" : "Vendor/Business", "value" : 57}
      ]
  },
  {
    first_name: "Tyler",
    last_name: "Boright",
    party: "Green",
    committees: ["Hippies","DARPA", "Skulls", "Alii"],
    bills: ["(.)(.)","qrthfds","artwqtr", "dgsdga", "gjgfhk", "rwewg" ],
    portrait: "http://placekitten.com/200/251",
    industry: [
      {"label" : "Candidate Committee", "value" : 67},
      {"label" : "Individual", "value" : null},
      {"label" : "National Political Party", "value" : 35},
      {"label" : "Non-Candidate Committee", "value" : 79},
      {"label" : "Other Entity", "value" : null},
      {"label" : "Vendor/Business", "value" : 63}
      ]
  },
  {
    first_name: "Ray",
    last_name: "Farias",
    party: "Rock",
    committees: ["Rambla","gambla", "hammah", "jang"],
    bills: ["sdfcdN","r4rwec","we23sd", "df42sd", "asdffb", "asfasdg" ],
    portrait: "http://placekitten.com/200/250",
    industry: [
      {"label" : "Candidate Committee", "value" : 51},
      {"label" : "Individual", "value" : 5},
      {"label" : "National Political Party", "value" : 99},
      {"label" : "Non-Candidate Committee", "value" : 27},
      {"label" : "Other Entity", "value" : null},
      {"label" : "Vendor/Business", "value" : null}
      ]
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
  $scope.portrait   = Candidates[CurCandidate].portrait;
  $scope.pData      = {industrymoney: Candidates[CurCandidate].industry};
  
  // right arrow click  
  $scope.forward    = function () {

    CurCandidate = ( CurCandidate + 1 ) % Candidates.length;

    $scope.firstName  = Candidates[CurCandidate].first_name;
    $scope.lastName   = Candidates[CurCandidate].last_name;
    $scope.party      = Candidates[CurCandidate].party;
    $scope.coms       = Candidates[CurCandidate].committees;
    $scope.bills      = Candidates[CurCandidate].bills;
    $scope.portrait   = Candidates[CurCandidate].portrait;
    $scope.pData      = {industrymoney: Candidates[CurCandidate].industry};
  };

  // left arrow click
  $scope.back       =  function () {

    ( CurCandidate === 0 )? CurCandidate = Candidates.length -1 : CurCandidate--;

    $scope.firstName  = Candidates[CurCandidate].first_name;
    $scope.lastName   = Candidates[CurCandidate].last_name;
    $scope.party      = Candidates[CurCandidate].party;
    $scope.coms       = Candidates[CurCandidate].committees;
    $scope.bills      = Candidates[CurCandidate].bills;
    $scope.portrait   = Candidates[CurCandidate].portrait;
    $scope.pData      = {industrymoney: Candidates[CurCandidate].industry};
  
  };

}]);


/****************************
      * Bills
****************************/

var App2 = angular.module('myApp2.controllers', []);

App2.controller('customController2', ['$scope',
  function($scope) {
    var industrymoneya = [15, 4, 42, 8, 23, 16];
    var data = {industrymoney: industrymoneya}
    $scope.pData = data;
  }
])


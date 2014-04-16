'use strict';

/* Controllers */

// var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );


// App.controller( 'CarouselCtrl', [ '$scope', function ( $scope ) {

//   $scope.slides = [];
//   $scope.slides.push({ text : 'Cats!', image : 'http://placekitten.com/300/200' });
//   $scope.slides.push({text: 'cats!', image: 'http://placekitten.com/301/200'});
//   $scope.slides.push({text: 'cats!', image: 'http://placekitten.com/302/200'});

//   $scope.setActive = function ( idx ) {

//     $scope.slides[idx].active = true;

//   };

// }]);

// App.controller( 'TabsCtrl', [ '$scope', function ( $scope ) {

//   $scope.tabs = [

//     { title : 'Bill1', content : 'HK432N2' },
//     { title : 'Bill2', content : 'MSDF231', disabled : true }
//   ];

// }])

var myApp = angular.module('myApp.controllers', []);

myApp.controller('customController', ['$scope',
  function($scope) {
    var industrymoneya = [3, 23, 12, 15, 24, 34];
    var data = {industrymoney: industrymoneya}
    $scope.pData = data;
  }
])

var myApp2 = angular.module('myApp2.controllers', []);

myApp2.controller('customController2', ['$scope',
  function($scope) {
    var industrymoneya = [15, 4, 42, 8, 23, 16];
    var data = {industrymoney: industrymoneya}
    $scope.pData = data;
  }
])


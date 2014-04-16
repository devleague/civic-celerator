'use strict';

/* Controllers */

var App = angular.module( 'myApp.controllers', [ 'ui.bootstrap' ] );
/****************************
      * Candidate Name
****************************/

/****************************
      * Profile Picture
****************************/
App.controller( 'CarouselCtrl', [ '$scope', function ( $scope ) {

  $scope.slides = [];
  $scope.slides.push({ text : 'Cats!', image : 'http://placekitten.com/300/200' });
  $scope.slides.push({ text : 'Cats!', image : 'http://placekitten.com/301/200' });
  $scope.slides.push({ text : 'Cats!', image : 'http://placekitten.com/302/200' });

  $scope.setActive = function ( idx ) {

    $scope.slides[idx].active = true;

  };

}]);

/****************************
      * Committees 
****************************/
App.controller('name', ['$scope', function ( $scope ) {
  
}])

/****************************
      * Bills Sponsored
****************************/
App.controller( 'TabsCtrl', [ '$scope', function ( $scope ) {

  $scope.tabs = [

    { title : 'Bill1', content : 'HK432N2' },
    { title : 'Bill2', content : 'MSDF231', disabled : true }
  ];

}]);

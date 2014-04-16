'use strict';

/* Directives */


var myApp = angular.module('myApp.directives',[]);

myApp.directive('pchart', function($window) {
  return {
    restrict: 'A',
    //happens when everything is associated and attached to the dom
    link: function(scope, element, attrs) {

      var width = d3.select(element[0]).node().offsetWidth;
      var height = d3.select(element[0]).node().offsetHeight;
      var svg = d3.select(element[0])
        .append("svg")
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', "translate(" + width / 2 + ',' + height / 2 + ")");

      //if the window gets resized
      window.onresize = function() {
        scope.render();
      };

      //watch the window the angular way
      scope.$watch(function() {
        return angular.element(window)[0].innerWidth;
      }, function() {
        scope.render(scope.pData.industymoney);
      });

      //continue watching for new values
      scope.$watch('pData', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);

      scope.render = function(data) {
        console.log("us");
        //remove the elements (after rerender)
        svg.selectAll("*").remove();
        //for a bar graph
        // var width, height, max;
        var margin = 5;
        //defining the width of the svg reactively
        var radius = Math.min(width, height) / 2;
        var color = d3.scale.ordinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

        var pie = d3.layout.pie()
          .sort(null)
          .value(function(data, i) {
            console.log(data);
            return scope.pData.industrymoney[i];
          })



        var g = svg.selectAll(".arc")
          .data(pie(scope.pData.industrymoney))
          .enter()
          .append('g')
          .attr('class', 'arc');

        g.append('path')
          .attr('d', arc)
          .style("fill", function(d, i) { return color(scope.pData.industrymoney[i]); });

        g.append('text')
          .attr('transform', function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr('dy', '.35em')
          .style('text-anchor', 'middle')
          .text(function(d,i) {
            return scope.pData.industrymoney[i];
          })
          .attr('fill','white');
      }
    }
  }
});

myApp.directive('pchart', function($window) {
  return {
    restrict: 'A',
    //happens when everything is associated and attached to the dom
    link: function(scope, element, attrs) {

      var width = d3.select(element[0]).node().offsetWidth;
      var height = d3.select(element[0]).node().offsetHeight;
      var svg = d3.select(element[0])
        .append("svg")
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', "translate(" + width / 2 + ',' + height / 2 + ")");

      //if the window gets resized
      window.onresize = function() {
        scope.render();
      };

      //watch the window the angular way
      scope.$watch(function() {
        return angular.element(window)[0].innerWidth;
      }, function() {
        scope.render(scope.pData.industymoney);
      });

      //continue watching for new values
      scope.$watch('lData', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);

      scope.render = function(data) {
        console.log("us");
        //remove the elements (after rerender)
        svg.selectAll("*").remove();
        //for a bar graph
        // var width, height, max;
      }
    }
  }
});



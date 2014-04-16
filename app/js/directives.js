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
        scope.$apply();
      }

      //watch the window the angular way
      scope.$watch(function() {
        return angular.element($window)[0].innerWidth;
      }, function() {
      console.log( scope.pData.industrymoney);

        scope.render(scope.pData.industrymoney);
      });

      //continue watching for new values
      scope.$watch('pData', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);

      scope.render = function(data) {

        //remove the elements (after rerender)
        svg.selectAll("*").remove();
        //for a bar graph
        // var width, height, max;
        var margin = 5;
        //defining the width of the svg reactively
        var radius = Math.min(width, height) / 2;

        var arc = d3.svg.arc()
          .outerRadius(radius - margin)
          .innerRadius(0);

        var pie = d3.layout.pie()
          .sort(null)
          .value(function(data) {
            return data;
          })


        scope.pData.forEach(function(d) {
          d += d;
        });

        var g = svg.selectAll(".arc")
          .data(pie(data))
          .enter()
          .append('g')
          .attr('class', 'arc');

        g.append('path')
          .attr('d', arc);

        g.append('text')
          .attr('transform', function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr('dy', '.35em')
          .style('text-anchor', 'middle')
          .text(function(d) {
            return d.data.industry;
          });
      }
    }
  }
});


// myApp.directive('d3LineChart', ['d3Service',
//   function(d3Service) {
//     return {
//       restrict: 'A',
//       //happens when everything is associated and attached to the dom
//       link: function(scope, element, attrs) {

//         d3Service.d3().then(function(d3) {

//           //if the window gets resized
//           window.onresize = function() {
//             scope.$apply();
//           }

//           //watch the window the angular way
//           scope.$watch(function() {
//             return angular.element($window)[0].innerWidth;
//           }, function() {
//             scope.render(scope.lineData);
//           });

//           //continue watching for new values
//           scope.$watch('data', function(newVals, oldVals) {
//             return scope.render(newVals);
//           }, true);

//           scope.render = function(data) {

//             //remove the elements (after rerender)
//             svg.selectAll("*").remove();
//             //for a bar graph
//             // var width, height, max;
//             var margin = 5;
//             //defining the width of the svg reactively
//             var width = d3.select(element[0]).node().offsetWidth;
//             var height = d3.select(element[0]).node().offsetHeight;
//             var radius = Math.min(width, height) / 2;

//             var x = d3.time.scale()
//               .range([0, width]);

//             var y = d3.scale.linear()
//               .range([height, 0]);

//             var xAxis = d3.svg.axis()
//               .scale(x)
//               .orient("bottom");

//             var yAxis = d3.svg.axis()
//               .scale(y)
//               .orient("left");


//             var line = d3.svg.line()
//               .x(function(data) {
//                 return x(data.date);
//               })
//               .y(function(data) {
//                 return y(data.close);
//               })

//           }
//         });
//       };
//     }
//   } //function inside the directive
// ])
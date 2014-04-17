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
        width = d3.select(element[0]).node().offsetWidth;
        height = d3.select(element[0]).node().offsetHeight;
        console.log("resize");
        svg = d3.select(element[0])
        .append("svg")
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', "translate(" + width / 2 + ',' + height / 2 + ")");
        scope.renderPie();
      };

      //watch the window the angular way
      scope.$watch(function() {
        return angular.element(window)[0].innerWidth;
      }, function() {
        scope.renderPie();
      });

      //continue watching for new values
      scope.$watch('pData', function(newVals, oldVals) {
        return scope.renderPie(newVals);
      }, true);

      scope.renderPie = function() {
        console.log(width);
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

myApp.directive('lchart', function($window) {
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
        .attr('transform', 'translate(0,0)');

      //if the window gets resized
      // window.onresize = function() {
      //   scope.renderLine();
      // };

      //watch the window the angular way
      scope.$watch(function() {
        return angular.element(window)[0].innerWidth;
      }, function() {
        scope.renderLine(scope.lData);
      });

      //continue watching for new values
      scope.$watch('scope.lData.contributionmoney', function(newVals, oldVals) {
        return scope.renderLine(newVals);
      }, true);

      scope.renderLine = function() {
        //remove the elements (after rerender)
        // svg.selectAll("*").remove();

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("right");

        var line = d3.svg.line()
            .x(function(point, index) {
              return x(scope.lData[index].date);
            })
            .y(function(point, index){
              return y(scope.lData[index].contributionmoney);
            });

        x.domain(d3.extent(scope.lData, function(point, index){
          var dateFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
          var prettyDate = dateFormat.parse(scope.lData[index].date);
          console.log(prettyDate);
          return prettyDate;
        }));
        y.domain(d3.extent(scope.lData, function(point, index) { return scope.lData[index].contributionmoney}));

        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,0)")
        .call(xAxis);

        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy",".71em")
        .style("text-anchor", "end")
        .text("Contribution overall");

        svg.append("path")
        .datum(scope.lData)
        .attr("class", "line")
        .attr("d", line);

      }
    }
  }
});

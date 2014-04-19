'use strict';

/* Directives */

var myApp = angular.module( 'myApp.directives', [] );


myApp.directive( 'pchart', function (  ) {

  return {

    restrict: 'A',

    link: function ( scope, element, attrs ) {

      scope.$watch( 'pData', function( oldVals ) {

        if(scope.pData && scope.pData.contributiontype){
          return scope.render();
        }

      }, true );

      scope.render = function( data ) {

        var itm   = {};
        var money = [];
        var type  = [];

        for( var i = 0; i < scope.pData.contributiontype.length; i++ ){
          
          if( itm[ scope.pData.contributiontype[i] ] == undefined ) {

            itm[ scope.pData.contributiontype[i] ] = 0;

          }

          itm[ scope.pData.contributiontype[i] ] += scope.pData.industrymoney[i];

        }
        for ( var key in itm ) {

          type.push(key);
          money.push(itm[key]);

        }

        $('.pie-chart svg').remove();


        var width   = 400;
        var height  = 400;
        var svg     = d3.select( element[0] )
                      .append( "svg" )
                      .attr( 'width', width )
                      .attr( 'height', height )
                      .append( 'g' )
                      .attr( 'transform', "translate(" + width / 2 + ',' + height / 2 + ")" );

        var margin = 5;

        //defining the width of the svg reactively
        var radius  = Math.min(width, height) / 2;
        var labelr  = radius + 30;
        var color   = d3.scale.ordinal()
          .range([
                  "#98abc5",
                  "#8a89a6",
                  "#7b6888",
                  "#6b486b",
                  "#a05d56",
                  "#d0743c",
                  "#ff8c00",
                  "#ff00ff"
                ]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(data, i) { return money[i]; });

        var g = svg.selectAll( ".arc" )
                .data(pie(money))
                .enter()
                .append('g')
                .attr('class', 'arc');

        g.append('path')

          .attr('d', arc)

          .style("fill", function(d, i) { return color(money[i]); });

      //STUB: labels for pie chart
        g.append('text')
          .attr('transform', function(d) {
            var c = arc.centroid(d),
                x = c[0],
                y = c[1],
                h = Math.sqrt(x*x + y*y);

            return "translate(" + (x/h * labelr) + "," + (y/h * labelr) + ")";
          });

        g.append('text')
          .attr('transform', function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr('dy', '.35em')
          .style('text-anchor', 'middle')
        //STUB: labels for pie chart
          .attr("text-anchor", function(d) {
            // are we past the center?
            return (d.endAngle + d.startAngle)/2 > Math.PI ?
                "end" : "start";
          })
        
          .text(function(d,i) {
            return type[i];
          })
          .attr('fill','white');
      };

    }

  };

});


myApp.directive(['pchart2', 'scope', function ( scope, $window ) {

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
      scope.$watch( function() {

        return angular.element( window )[0].innerWidth;

      }, function() {

        scope.render( scope.pData.industrymoney);

      });

      //continue watching for new values
      scope.$watch('pData', function ( newVals, oldVals ) {

        return scope.render( newVals );

      }, true );

      scope.render = function ( data ) {

        //remove the elements (after rerender)
        svg.selectAll("*").remove();

        var margin  = 5;
        var radius  = Math.min(width, height) / 2;
        var color   = d3.scale.ordinal()
                      .range([
                        "#98abc5",
                        "#8a89a6",
                        "#7b6888",
                        "#6b486b",
                        "#a05d56",
                        "#d0743c",
                        "#ff8c00"
                        ]);

        var arc = d3.svg.arc()
          .outerRadius( radius - 10 )
          .innerRadius( 0 );

        var pie = d3.layout.pie()
          .sort(null)
          .value(function(data, i) {

            return scope.pData.industrymoney[i].value;

          });



        var g = svg.selectAll( ".arc" )
          .data( pie( scope.pData.industrymoney ) )
          .enter()
          .append( 'g' )
          .attr( 'class', 'arc' );

        g.append( 'path' )
          .attr( 'd', arc )
          .style( "fill",
            function ( d, i ) {

              return color( scope.pData.industrymoney[i] );

            });

        g.append( 'text' )
          .attr( 'transform',
            function ( d ) {

              return "translate(" + arc.centroid(d) + ")";

            })
            .attr('dy', '.35em')
            .style('text-anchor', 'middle')
            .text(
              function(d,i) {
                
                return scope.pData.industrymoney[i];

            })
            .attr('fill','white');

      };

    }

  };

}]);

myApp.directive( 'lchart', function ( $window ) {

  return {

    restrict: 'A',

    link: function(scope, element, attrs) {

      scope.$watch( 'lData', function() {

        if(scope.lData){
          return scope.renderLine();
        }

      }, true );

      scope.renderLine = function() {

  
        var width   = d3.select( element[0] ).node().offsetWidth;
        var height  = d3.select( element[0] ).node().offsetHeight;
        var margin  = { top : 30, right : 50, bottom : 30, left : 90 };
        var svg = d3.select( element[0] )
                            .append("svg")
                            .attr('width', width)
                            .attr('height', height)
                            .append('g')
                            .attr("transform", "translate("+margin.left+","+margin.top+")");

        width   = width - margin.left - margin.right;
        height  = height - margin.top - margin.bottom;
        var data    = scope.lData;

        var parseDate = d3.time.format( "%Y-%m-%dT%H:%M:%S" ).parse;

        data.forEach( function ( d ) {

          d.date              = parseDate( d.date );
          d.contributionmoney = + d.contributionmoney;

        });

        var x = d3.time.scale().range( [ 0, width ] );
        var y = d3.scale.linear().range([ height, 0 ]);

        x.domain( d3.extent( data, function ( d ) { return d.date; }));
        y.domain([ 0, d3.max( data, function ( d ) { return d.contributionmoney; })]);

        var xAxis = d3.svg.axis().scale( x ).orient( "bottom" ).ticks( 5 );
        var yAxis = d3.svg.axis().scale( y ).orient( "left" ).ticks( 5 );

        var valueLine = d3.svg.line()
                          .x( function( d ) { return x( d.date );})
                          .y( function( d ) { return y( d.contributionmoney );});
        svg.append( "path" )
        .attr( "d", valueLine( data ));

        svg.append( "g" ).attr( "class", "x axis" ).attr("transform", "translate(0," + height + ")").call(xAxis);
        
        svg.append( "text" ).attr( "transform", "translate(" + ( width / 2 ) + " ," + ( height + margin.bottom+6 ) + ")").style( "text-anchor", "middle" ).text( "Date" );

        svg.append( "g" ).attr("class", "y axis").call(yAxis);

        svg.append( "text" ).attr( "transform", "rotate(-90)" ).attr( "y", 0-margin.left ).attr( "x", 0 - ( height/2 )).attr( "dy", "1em" ).style( "text-anchor", "middle" ).text( "Contributions" );

        svg.append( "text" ).attr( "x", ( width/2 )).attr( "y", 0 - ( margin.top/2 )).attr( "text-anchor", "middle" ).style( "font-size", "16px" ).text( "Contributions over Time" );
      
      };

    }

  };

});

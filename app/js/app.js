'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'

]);

angular.module('myApp2', [
  'ngRoute',
  'myApp2.filters',
  'myApp2.services',
  'myApp2.directives',
  'myApp2.controllers'

]);
// var d3Element = angular.module('d3', []);

// d3Element.factory('d3', ['$document', '$q', '$rootScope',

//   function($document, $q, $rootScope) {
//     var promised = $q.defer();

//     //after everything had been done
//     //load d3 into the window to be used by whatever needs it
//     function onScriptLoad() {
//       console.log(promised);

//       //apply d3 to the rootscope 
//       $rootScope.$apply(function() {
//         promised.resolve(window.d3);
//       });
//     }

//     //script tag with d3 as source
//     var scriptTag = $document[0].createElement('script');
//     //set object properties of the script element
//     scriptTag.type = 'text/javascript';
//     scriptTag.async = true;
//     //inject d3
//     scriptTag.src = 'http://d3js.org/d3.v3.min.js';

//     scriptTag.onreadystatechange = function() {
//       if (this.readyState == 'complete') {
//         onScriptLoad();
//       }
//     }
//     //hook up the function to return a promise
//     scriptTag.onload = onScriptLoad;

//     //attach it to the body
//     var bodyElement = $document[0].getElementsByTagName('body')[0];

//     bodyElement.appendChild(scriptTag);
//     //return that the following stuff was added to the document
//     return {
//       d3: function() {
//         return function() {
//           return promised.promise;
//         }
//       }
//     };
//   } //ending the anonomous fucntion 

// ]);


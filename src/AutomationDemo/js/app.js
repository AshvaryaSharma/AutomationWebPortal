<<<<<<< HEAD
var app = angular.module("MyBlog",['ngRoute']);
console.log("Inside app.js...");
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
      when('/index', {
        templateUrl: 'partials/blog-home.html',
        controller: 'HomeController'
      }).
	  when('/link',{
		templateUrl: 'partials/full-link.html',
		controller: 'LinkController'		
	  }).
      otherwise({
        redirectTo: '/index'
      });
=======
'use strict';
var app = angular.module('safe-app',['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
	console.log("Inside router");
	$routeProvider.
	when('/dashboard', {
		templateUrl : 'partials/dashboard.html',
		controller: ''
	}).
	when('/viewTestcases', {
		templateUrl : 'partials/viewTestcase.html',
		controller : 'viewTestcaseController'
	}).
	otherwise({
		redirectTo: '/dashboard'
	});
	
>>>>>>> refs/remotes/AshvaryaSharma/Frontend
}]);
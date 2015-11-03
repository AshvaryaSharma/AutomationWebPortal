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
	
}]);
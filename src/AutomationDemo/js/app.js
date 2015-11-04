'use strict';
var app = angular.module('safe-app',['ngRoute','checklist-model','safeServices']);
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
	when('/createTestcase', {
		templateUrl: 'partials/createTestcase.html',
		controller: 'createTestcaseController'
	}).
	otherwise({
		redirectTo: '/dashboard'
	});
}]);
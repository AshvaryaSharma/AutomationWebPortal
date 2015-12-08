 /*
	@Author: Ajay Poshak
	@Date: 29 Nov 2015
	@Purpose : This controller is responsible for dashboard.html
*/
'use strict';
angular.module("safe-app")
	.controller('dashboardController', dashboardController);
	/*
	**@function dashbaordController:- This is the controller for dashboard.html
	*/
	function dashboardController(createTestService, $scope, $rootScope, SessionKeeper) {
		console.log("Inside Dashboard Controller...");
		$rootScope.current = {};
		/*
		** @function getUserDetails :- This function will get the user related information by calling the service. And set that information into rootScope and session so that it can be shared across the application. 
		*/
		 function getUserDetails() {
			console.log("Getting user data...");
			var current = $rootScope.current;
			console.log("current::"+current);
			createTestService.getUserData().then(function(appData) {
				$scope.safeUserData = appData;
				console.log("******User Data::"+$scope.safeUserData.userDetails.first_name);
				current.safeUserData = $scope.safeUserData;
				$rootScope.current = current;
				SessionKeeper.save();
			});
			$rootScope.isLogged=true;
		};
		getUserDetails();
	};

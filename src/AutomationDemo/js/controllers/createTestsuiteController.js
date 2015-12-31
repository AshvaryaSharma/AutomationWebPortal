'use strict';
angular.module("safe-app")
	.controller("createTestsuiteController", createTestsuiteController);
	
function createTestsuiteController(createTestService, $scope, $http, $rootScope, SessionKeeper){
	console.log("Inside create test suite module...");
	var current = $rootScope.current;
	if (!(current))
		current = $rootScope.current = SessionKeeper.read();
	//console.log("Previous Controller::"+current.userDetails.first_name);
	/*
	**@function getAllApplications :- It will get the data of all allowed applications for the user.
	@param user_id :- Using the user id, the list of allowed applications will be retrieved.
	*/
	function getAllApplications() {
		createTestService.getAppData()
		.then(function(appData) {
			$rootScope.current = $scope.safeAppData = appData;
			//console.log("Application Data::"+$rootScope.current.applicationList[0].app_name);
			//SessionKeeper.save();
		})
		.catch(function(appData){
			$scope.errorStatus = true;
			$scope.errorMessage = "Not able to get application data";
		});
	}
	/*
	** @function appSelectionEvent:- This function will be called when the user selects an application in view.
	*/
	$scope.appSelectionEvent = function() {
		$scope.isApplicationSelected = true;
		console.log("isApplicationSelected::"+$scope.isApplicationSelected);
		loadTestSuites();
	}
	/*
	**@function loadTestSuites : This function will load the test suites from services.
	*/
	function loadTestSuites() {
		console.log("Loading the test suites...");
		createTestService.getTestsuiteByAppAndGroup()
		.then(function(appData){
			$rootScope.current = $scope.testSuiteData = appData.testSuite;
		})
		.catch(function(appData){
			$scope.errorStatus = true;
			$scope.errorMessage = 'Test Suite data not available';
		});
		
	}
	
	/*
	**@function startApplication: Starting function of the page which gets called every page is loaded.
	*/
	function startApplication() {
		if(current == null || current == undefined){
			getUserDetails();
			console.log("Calling Services....");
		}
		else {
			$scope.safeUserData = current.userDetails;
		}
		getAllApplications();
		
	}
	startApplication();
	SessionKeeper.save();
};
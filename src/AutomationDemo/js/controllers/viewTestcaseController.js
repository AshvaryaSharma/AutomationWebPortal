'use strict';
angular.module('safe-app').
	controller('viewTestcaseController',viewTestcaseController);
	function viewTestcaseController(createTestService, SessionKeeper, $scope,$http, $window, $rootScope){
		var current = $rootScope.current;
		if(!current)
			current = $rootScope.current = SessionKeeper.read();
			$scope.isApplicationSelected = false;
		/*
		**@function getAllApplications :- It will get the data of all allowed applications for the user.
		@param user_id :- Using the user id, the list of allowed applications will be retrieved.
		*/
		function getAllApplications() {
			createTestService.getAppData()
			.then(function(appData) {
				$scope.safeAppData = appData;
				console.log("Application Data::"+$scope.safeAppData.applicationList[0].app_name);
			})
			.catch(function(appData){
				$scope.errorStatus = true;
				$scope.errorMessage = 'Not able to get application data';
			});
		};
		/*
		** @function appSelectionEvent:- This function will be called when the user selects an application in view.
		*/
		$scope.appSelectionEvent = function() {
			$scope.isApplicationSelected = true;
			console.log("isApplicationSelected::"+$scope.isApplicationSelected);
			loadPackages();
		}
		/*
		**@function loadPackages:- This function will be called from view, whenever the checkbox for including packages is selected.
		@param app_id:- Application id as selected by user in the view.
		@param group_id:- Group id of the logged user. 
		*/
		function loadPackages(){
			$scope.configRequest = {};
			$scope.configRequest.app_id = $scope.app_id;
			//$scope.configRequest.group_id = $scope.safeUserData.userDetails.group_id;
			createTestService.getTestsuiteByAppAndGroup()
			.then(function(appData) {
				$scope.packages = appData.testSuite;
			})
			.catch(function(appData){
				console.log("Error in retrieving the packages!!!::::"+appData);
				$scope.errorStatus = true;
				$scope.errorMessage = "Not getting any packages";
			}); 
		}
		$scope.packageSelectionEvent = function() {
			$scope.isPackageSelected = true;
			console.log("Selected package::"+$scope.package_id);
			
		}
		getAllApplications();
		
		
};
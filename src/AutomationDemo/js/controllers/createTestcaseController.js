'use strict';
app.controller('createTestcaseController', function(createTestService, $scope, $http) {
	console.log("Inside createTestcaseController...");
	$scope.isApplicationSelected = false;
	$scope.isTestCaseNameSelected = false;
	$scope.testCaseName = '';
	$scope.safeOperationKeywords = [];
	createTestService.getAppData().then(function(appData) {
		$scope.safeAppData = appData;
		console.log("******Controller Data::"+$scope.safeAppData[0].app_name);
	});
	createTestService.getOperationData().then(function(operationData){
		$scope.safeOperationData = operationData;
		var key;
		for(key in $scope.safeOperationData) {
			console.log("Key::"+key);
			$scope.safeOperationKeywords.push($scope.safeOperationData[key].keyword);
		};
		console.log("Operation Data::"+$scope.safeOperationKeywords[0]);
	});
	/*Checking if any application is selected or not*/
	$scope.appChangeFunction = function() {
		$scope.isApplicationSelected = true;
	}
	/*Checking if any testcase name been entered or not*/
	$scope.testNameChange = function() {
		if($scope.testCaseName.length > 1) {
			$scope.isTestCaseNameSelected = true;
		}
		else {
			$scope.isTestCaseNameSelected = false;
		}
	}
	
	});
'use strict';
app.controller('createTestcaseController', function(createTestService, $scope, $http) {
	console.log("Inside createTestcaseController...");
	$scope.isApplicationSelected = false;
	createTestService.getAppData().then(function(appData) {
		$scope.safeAppData = appData;
		console.log("Data::"+$scope.safeAppData);
	});
	createTestService.getOperationData().then(function(operationData){
		$scope.safeOperationData = operationData;
		console.log("Operation Data::"+$scope.safeOperationData);
	});
	$scope.appChangeFunction = function() {
		$scope.isApplicationSelected = true;
	}
});
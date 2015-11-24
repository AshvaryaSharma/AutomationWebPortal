/*This will act like a Home Controller*/
'use strict';
app.controller('dashboardController', function(createTestService, $scope, $rootScope) {
	var current = $rootScope.current = {};
	$scope.safeUserData = {};
	console.log("Inside Dashboard Controller...");
	
	$scope.getUserDetails = function() {
		console.log("Getting user data...");
		createTestService.getUserData().then(function(appData) {
			current.safeUserData = $scope.safeUserData = appData;
			console.log("******User Data::"+current.safeUserData.userDetails.first_name);
		});
	};
	
	$scope.getUserDetails();
	//console.log("=========>User Data::"+current.safeUserData.userDetails);
	
});
/*This will act like a Home Controller*/
'use strict';
app.controller('dashboardController', function(createTestService, $scope, $rootScope) {
	$rootScope.isLogged=false;
	var current = $rootScope.current = {};
	$rootScope.safeUserData = {};
	console.log("Inside Dashboard Controller...");
	
	 function getUserDetails() {
		console.log("Getting user data...");
		createTestService.getUserData().then(function(appData) {
			$scope.safeUserData = appData;
			console.log("******User Data::"+$scope.safeUserData.userDetails.first_name);
			$rootScope.safeUserData = $scope.safeUserData;
		});
		$rootScope.isLogged=true;
	};
	
	getUserDetails();
	//console.log("=========>User Data::"+current.safeUserData.userDetails);
	
});

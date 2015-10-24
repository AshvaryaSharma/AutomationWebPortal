angular.module('package',[]).controller('packageController', function($scope,$http) {

	$scope.intializing = true;
	$scope.loading = true;
	$scope.errorStatus = false;
	$scope.successStatus = false;
	$scope.errorMessage = "";
	$scope.successMessage = "";
	$scope.app_id;
	$scope.editPackage = false;
	
	$scope.isApplicationSelected = false;
	$scope.package_list = null;
	$scope.package_obj = {};
	
	
	$scope.applicationList = null;
	$scope.button ="";
	
	$scope.startInitilizing = function() {
		
		$scope.intializing = true;
		$scope.loading = true;
		$scope.button = "Create";
		$scope.isApplicationSelected = false;
		$scope.editPackage = false;
		$scope.getAllApplicationList();
		
	}
	
	$scope.applicationSelectEvent = function() {
		
		$scope.loading = true;
		if($scope.app_id == "") {
			$scope.app_id = null;
			$scope.package_list = [{}];
			
			$scope.isApplicationSelected = false;
			
		} else {
			
			$scope.getAllPackagesByApplicationId();
		}
		$scope.loading = false;
		
	}
	
	
	$scope.getAllPackagesByApplicationId = function() {
		$scope.loading = true;
			
		
		$http.post("webservice/findpackagebyapplicationid",$scope.app_id)
			 .success(function(response) {
				$scope.package_list = response;
				
				
				$scope.isApplicationSelected = true;
				$scope.loading = false;
			 })
			 .error(function() {
				 $scope.errorMessage ="Not able to get any package for Application Selected"
				 $scope.errorStatus= true;
				
			 })
			 
	}
	
$scope.init = function() {
		
		$scope.errorStatus = false;
		$scope.successStatus = false;
		$scope.errorMessage = "";
		$scope.successMessage = "";
		
	}

$scope.edit = function(id) {
	
	$scope.init();
	console.log("Edit function for id: " + id)
	for(var i=0; i < $scope.package_list.length; i++) {
		
		if($scope.package_list[i].package_id == id) {
			console.log("Got edit id application");
			/*$scope.package_obj = $scope.package_list[i];*/
			
			angular.copy($scope.package_list[i] , $scope.package_obj);
			console.log("Package Name: " + $scope.package_obj.package_name);
			$scope.editPackage = true;
			$scope.button = 'Edit';
			break;
		}
	}
	
	
}

$scope.resetApplication = function() {
	
	
	$scope.errorStatus = false;
	$scope.successStatus = false;
	$scope.errorMessage = "";
	$scope.successMessage = "";
	
	$scope.editPackage = false;
	
	
	
	$scope.package_obj = {};
	
	
	
	$scope.button ="Create";
	
}

$scope.checkForm = function() {
	console.log("Checking form");
	$scope.errorMessage = "";
	$scope.errorStatus = false;
	
	if($scope.package_obj==null || $scope.package_obj.package_name == "" || $scope.package_obj.package_name == null) {
		console.log("Package name not enetered");
		$scope.errorMessage = "Please fill Package Name";
		$scope.errorStatus = true;
	}
	if($scope.package_obj==null || $scope.package_obj.package_description == "" || $scope.package_obj.package_description == null) {
		console.log("Package Description not set");
		$scope.errorMessage = "Package Description is mandatory";
		$scope.errorStatus = true;
		
	}
	
}

$scope.packageCreateEdit = function() {
	console.log("Checking for form");
	$scope.checkForm();
	console.log("Form checking complete");
	if($scope.button == "Create" && $scope.errorStatus == false) {
		
		$scope.createPackage();
		
	} else if ($scope.button == "Edit" && $scope.errorStatus == false) {
		
		$scope.updatePackage();
		
	}
	
}

$scope.createPackage = function() {
	
	console.log(" ------------ Creating new package ---------------");
	var app_obj = null;
	for(var i=0; i < $scope.applicationList.length; i++) {
		if($scope.applicationList[i].app_id == $scope.app_id) {
			app_obj = $scope.applicationList[i];
			break;
		}
		
	}
	
	$scope.package_obj.application = app_obj;
	
	
	console.log("Making webservice request to create package");
	
	$http.post("webservice/addNewPackage" , $scope.package_obj)
		.success(function (response) {
			$scope.successMessage = "Package Created Successfully";
			$scope.successStatus = false;
			$scope.package_obj = {};
			$scope.getAllPackagesByApplicationId();
		})
		.error(function(response) {
			$scope.errorMessage = "Not able to create new package";
			$scope.errorStatus = true;
		})
	
	
}

$scope.updatePackage = function() {
	
	console.log(" ------------ Editing old package ---------------");
	
	
	$http.post("webservice/editPackage", $scope.package_obj)
		.success(function(response) {
			$scope.successMessage = "Package Created Successfully";
			$scope.successStatus = true;
			$scope.package_obj = {};
			$scope.button = "Create";
			
			$scope.getAllPackagesByApplicationId();
			$scope.editPackage = false;
			
		})
		.error(function(response) {
			$scope.errorMessage = "Not able to create new package";
			$scope.errorStatus = true;
		})
		
		$scope.button = "Create";
		$scope.editPackage = false;
}
	
	$scope.getAllApplicationList = function() {
		
		console.log("---------GETTING ALL APPLICATIONS-----------");
		
		$http.get("webservice/findAllApplications")
			.success(function (response) {
				$scope.applicationList = response;
				$scope.intializing = false;
				$scope.loading = false;
				
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get application data"
				$scope.errorStatus = true;
			})
	}
	
	$scope.startInitilizing();
	
});
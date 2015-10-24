angular.module('application',[]).controller('applicationController', function($scope,$http) {

	$scope.intializing = true;
	$scope.loading = true;
	$scope.errorStatus = false;
	$scope.successStatus = false;
	$scope.errorMessage = "";
	$scope.successMessage = "";
	$scope.application = {
			app_id : null,
			app_name : '',
			app_description : ''
	};
	
	$scope.applicationList = [{}];
	$scope.button ="";
	
	$scope.startApplication = function() {
		
		$scope.intializing = true;
		$scope.loading = true;
		$scope.button = "Create";
		
		$scope.getAllApplicationList();
		
		if(!$scope.errorStatus) {
			$scope.intializing = false;
			$scope.loading = false;
			
		}
		
	}
	
	$scope.init = function() {
		
		$scope.errorStatus = false;
		$scope.successStatus = false;
		$scope.errorMessage = "";
		$scope.successMessage = "";
		
	}
	
	$scope.check = function() {
		
		if($scope.application.app_name == '') {
			
			$scope.errorMessage = "Application Name Required";
			$scope.errorStatus = true;
		} else if($scope.application.app_description == '') {
			$scope.errorMessage = "Application Description Required";
			$scope.errorStatus = true;
			
		}
	}
	
	$scope.applicationCreateEdit = function() {
		
		$scope.init();
		$scope.check();
		if(!$scope.errorStatus){
			
			$scope.loading = true;
			
			if($scope.button == 'Create' && !$scope.errorStatus) {
				$scope.createApplication();
			} else if($scope.button == 'Edit' && !$scope.errorStatus) {
				
				$scope.editApplication();
			}
			
			$scope.applicationList = [{}];
			$scope.getAllApplicationList();
			$scope.loading = false;
		}
		
		
		
	}
	
	$scope.editApplication = function() {
		$scope.init();
		$http.post("webservice/editApplication", $scope.application)
		.success(function(response){
			
			$scope.successMessage = "Application Edited Successfully";
			$scope.successStatus = true;
			$scope.application = {};
			$scope.startApplication();
		})
		.error(function() {
			
			$scope.errorMessage = "Error in Editing Application";
			$scope.errorStatus= true;
		})
	}
	
	$scope.remove = function(id) {
		$scope.init();
		$scope.loading = true;
		
		$http.post("webservice/removeApplication", id)
		.success(function(response){
			
			$scope.successMessage = "Application Deleted Successfully";
			$scope.successStatus = true;
			$scope.startApplication();
		})
		.error(function() {
			
			$scope.errorMessage = "Error in Deleting Application";
			$scope.errorStatus= true;
		})
		
		$scope.applicationList = [{}];
		$scope.getAllApplicationList();
		$scope.loading = false;
		
	}
	
	
	$scope.resetApplication = function() {
		$scope.init();
		$scope.application = {
				app_id : null,
				app_name : '',
				app_description : ''
		};
		$scope.button = 'Create';
		
	}
	
	$scope.createApplication = function() {
		
		
		$http.post("webservice/addNewApplication", $scope.application)
		.success(function(response){
			
			$scope.successMessage = "Application Created Successfully";
			$scope.successStatus = true;
			$scope.startApplication();
		})
		.error(function() {
			
			$scope.errorMessage = "Error in creating Application";
			$scope.errorStatus= true;
		})
	}
	
	
	$scope.edit = function(id) {
		$scope.init();
		console.log("Edit function for id: " + id)
		for(var i=0; i < $scope.applicationList.length; i++) {
			
			if($scope.applicationList[i].app_id == id) {
				console.log("Got edit id application");
				/*$scope.application = $scope.applicationList[i];*/
				
				angular.copy($scope.applicationList[i] , $scope.application);
				console.log("Application Name: " + $scope.application.app_name);
				break;
			}
		}
		$scope.button = 'Edit';
		
	}

	$scope.getAllApplicationList = function() {
		
		console.log("---------GETTING ALL APPLICATIONS-----------");
		
		$http.get("webservice/findAllApplications")
			.success(function (response) {
				$scope.applicationList = response;
				
				
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get application data"
				$scope.errorStatus = true;
			})
	}
	
	
	$scope.startApplication();
	
	
});
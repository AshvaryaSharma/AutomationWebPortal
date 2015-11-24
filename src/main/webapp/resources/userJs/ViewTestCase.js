angular.module('viewTestCase',["checklist-model"]).controller('viewTestcaseController', function($scope,$http,$window) {


	$scope.intializing = true;
	
	$scope.loading = false;
	$scope.successMessage = "Test Case Created Successfully";
	$scope.successStatus = false;
	$scope.isApplicationSelected = false;
	$scope.errorMessage = null;
	$scope.errorStatus = false;
	$scope.applications = [{}];
	$scope.testattr = "test";
	$scope.app_id=null;
	$scope.packages = [{}];
	$scope.package_id = "";
	$scope.package_description = null;
	$scope.applicationsLoaded = false;
	$scope.packagesLoaded = false;
	$scope.isPackageSelected = false;
	$scope.isTestcasesLoaded = false;
	$scope.testcasesTobeDeleted = { id: []};
	$scope.isDeleteAllChecked = false;
	$scope.testcases = [{}];
	
	
	
	
	$scope.getAllApplications = function() {
		console.log("---------GETTING ALL APPLICATIONS-----------");
		
	
		
		$http.get("../webservice/getLoggedUserDetails")
		.success(function (response) {
			console.log("Response: " + response);
			console.log("::::" + response.userDetails.sso_id);
			$scope.user = response.userDetails.sso_id;
			$scope.getApplication();
		})
		.error(function() {
			
			$scope.errorMessage = "No user Logged in"
			$scope.errorStatus = true;
		})
		
		console.log("------------Getting application for " + $scope.user +"-----------")
		
			$scope.intializing = false;
	}
	
	
	$scope.getApplication = function() {
		$http.post("../webservice/findApplicationsByUserId", $scope.user)
		.success(function (response) {
			$scope.applications = response.applicationList;
			$scope.intializing = false;
			$scope.packagesLoaded = true;
			$scope.testattr ="gotdata";
		})
		.error(function() {
			
			$scope.errorMessage = "Not able to get application data";
			$scope.errorStatus = true;
		})
		
	}
	
	$scope.toggleDeleteAll = function(){
		
		if($scope.isDeleteAllChecked) {
			$scope.checkAll();
		} else {
			$scope.uncheckAll();
		}
	}
	
	$scope.uncheckAll = function() {
		
		$scope.testcasesTobeDeleted.id = [];
	}
	
	$scope.checkAll = function(){
		
		$scope.testcasesTobeDeleted.id = $scope.testcases.map(function(item){ return item.testcase_id;})
	}
	
	
	$scope.deleteTestcases = function() {
		
		console.log("Attempting to delete test cases" + $scope.testcasesTobeDeleted.id);
		$http.post("../webservice/deleteTestcasesByTestcaseId", $scope.testcasesTobeDeleted.id)
			.success(function(response) {
				console.log("Deleted successfully");
				$scope.testcasesTobeDeleted = { id: []};
				$scope.testcases = [{}];
				$scope.getTestcasesByPackageId();
				$scope.loading = false;
				
			})
			.error(function() {
				console.log("Error occured");
			})
		
	}
	
	
	
	
	$scope.applicationSelectEvent = function() {
		$scope.loading = true;
		$scope.package_id = null;
		$scope.testcases = null;
		$scope.errorStatus = false;
		if($scope.app_id == "") {
			$scope.app_id = null;
			
			
			$scope.isApplicationSelected = false;
			
		} else {
			console.log("Application selected: " + $scope.app_id);
			$scope.applicationsLoaded = false;
			$scope.getTestcasesByApplicationId();
		}
		$scope.loading = false;
	}
	
	
	
	$scope.getTestcasesByApplicationId = function() {
		$scope.loading = true;
		console.log("Getting Testcases for app id: " + $scope.app_id);
		$http.post("../webservice/gettestcasesByApplicationId",$scope.app_id)
			.success(function(response) {
				$scope.testcases = response.testcasesList;
				console.log($scope.testcases[0].testcase_name);
				$scope.isApplicationSelected =true;
				if($scope.testcases.length == 0) {
					$scope.errorMessage ="No test case returned for the Application";
					$scope.isPackageSelected = false;
					$scope.errorStatus= true;
				} else {
					$scope.isTestcasesLoaded = true;
					$scope.isPackageSelected = true;
				}
				
			})
			.error(function(){
				$scope.errorMessage ="No test case returned for the package";
				$scope.errorStatus= true;
			})
		
	}
	
	
	
	
	
	$scope.resetAll = function() {
		$scope.successStatus = false;
		$scope.reset();
		
	}
	
	
	
	
	$scope.reset = function() {
		
		$scope.loading = false;
		$scope.successMessage = "Test Case Created Successfully"
		$scope.successStatus = false;
		$scope.isApplicationSelected = false;
		$scope.errorMessage = null;
		$scope.errorStatus = false;
		$scope.isTestcasesLoaded = false;
		$scope.testattr = "test";
		$scope.app_id=null;
		$scope.packages = [{}];
		$scope.package_id = "";
		$scope.applicationsLoaded = false;
		$scope.packagesLoaded = false;
		$scope.isPackageSelected = false;
		$scope.testcases = [{}];
		$scope.uncheckAll();
		
	}
	
	
	
$scope.saveAs = function(id) {
		
		$http.post("saveAsNew",id)
			.success(function(response) {
				$window.location.href ="saveAsNew";
			})
	}
	
	
	
	
	$scope.getAllApplications();
	
	
});
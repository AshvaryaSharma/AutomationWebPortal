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
		
		$http.get("webservice/findAllApplications")
			.success(function (response) {
				$scope.applications = response;
				$scope.intializing = false;
				$scope.packagesLoaded = true;
				$scope.testattr ="gotdata";
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get application data"
				$scope.errorStatus = true;
			})
			$scope.intializing = false;
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
		$http.post("webservice/deleteTestcasesByTestcaseId", $scope.testcasesTobeDeleted.id)
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
			$scope.packages = [{}];
			
			$scope.isApplicationSelected = false;
			$scope.isPackageSelected = false;
		} else {
			$scope.applicationsLoaded = false;
			$scope.getAllPackagesByApplicationId();
		}
		$scope.loading = false;
	}
	
	$scope.packageSelectEvent = function() {
		$scope.loading = true;
		$scope.errorStatus= false;
		$scope.testcases = null;
		
		if($scope.package_id == "") {
			$scope.isPackageSelected = false;
			$scope.package_id = null;
			$scope.package_description = null;
			
		} else {
			
			for(var i=0;i < $scope.packages.length; i++) {
				if($scope.packages[i].package_id == $scope.package_id) {
					$scope.package_description = $scope.packages[i].package_description;
					break;
				}
				
			}
			
			$scope.getTestcasesByPackageId();
			
		}
		
		$scope.loading = false;
	}
	
	$scope.getTestcasesByPackageId = function() {
		$scope.loading = true;
		
		$http.post("webservice/gettestcasesbypackageid",$scope.package_id)
			.success(function(response) {
				$scope.testcases = response;
				if($scope.testcases.length == 0) {
					$scope.errorMessage ="No test case returned for the package";
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
	
	$scope.getAllPackagesByApplicationId = function() {
		$scope.loading = true;
			$scope.testattr = "checking package";
		
		$http.post("webservice/findpackagebyapplicationid",$scope.app_id)
			 .success(function(response) {
				$scope.packages = response;
				$scope.testattr = "getPackages";
				$scope.applicationsLoaded = true;
				$scope.isApplicationSelected = true;
			 })
			 .error(function() {
				 $scope.errorMessage ="Not able to get any package for Application Selected"
				 $scope.errorStatus= true;
				$scope.testattr= "packageerror";
			 })
			 $scope.loading = false;
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
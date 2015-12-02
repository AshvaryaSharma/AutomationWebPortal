angular.module('testsuite',[]).controller('testsuiteController', function($scope,$http) {

	
	
	$scope.pageInit = function() {
		
		$scope.button = "Create";
		$scope.intializing = true;
		$scope.loading = true;
		$scope.reqTemp ={};
		$scope.updateTestSuite ={};
		$scope.applicationSelected = false;
		$scope.getUserDetails();
		
	}
	
	$scope.resetTestsuite = function() {
		$scope.button = "Create";
		$scope.intializing = false;
		$scope.loading = false;
		$scope.updateTestSuite ={};
		
	}
	
	$scope.testsuiteCreateEdit = function() {
		if($scope.button == 'Create') {
			$scope.createTestSuite();
		} else if($scope.button == 'Update') {
			$scope.updateSuite();
		}
	}
	
	$scope.updateSuite = function() {
		console.log(":::::UPDATING TEST SUITE:::::::")
		if($scope.updateTestSuite.testsuite_name == undefined || $scope.updateTestSuite.testsuite_name == '') {
			$scope.errorMessage = "Testsuite name is required";
			$scope.errorStatus = true;
		} else if($scope.updateTestSuite.testsuite_description == undefined || $scope.updateTestSuite.testsuite_description == '') {
			$scope.errorMessage = "Testsuite Description is required";
			$scope.errorStatus = true;
		} else {
			for(var i=0; i<$scope.applications.length ; i++) {
				
				if($scope.applications[i].app_id == $scope.app_id) {
					$scope.updateTestSuite.application = $scope.applications[i];
					break;
				}
			}
			$scope.updateTestSuite.group = $scope.group;
			
			$http.post("../webservice/updateTestSuite",$scope.updateTestSuite)
			.success(function (response) {
				$scope.applications = response.status;
				$scope.updateTestSuite ={};
				$scope.applicationSelectEvent();
				$scope.button = "Create";
				$scope.loading = false;
			})
			.error(function(response) {
				
				$scope.errorMessage = response.exceptionMessage;
				$scope.errorStatus = true;
			})
			
		}
		
	}
	
	$scope.createTestSuite = function() {
		console.log(":::::CREATING TEST SUITE:::::::")
		if($scope.updateTestSuite.testsuite_name == undefined || $scope.updateTestSuite.testsuite_name == '') {
			$scope.errorMessage = "Testsuite name is required";
			$scope.errorStatus = true;
		} else if($scope.updateTestSuite.testsuite_description == undefined || $scope.updateTestSuite.testsuite_description == '') {
			$scope.errorMessage = "Testsuite Description is required";
			$scope.errorStatus = true;
		} else {
			for(var i=0; i<$scope.applications.length ; i++) {
				
				if($scope.applications[i].app_id == $scope.app_id) {
					$scope.updateTestSuite.application = $scope.applications[i];
					break;
				}
			}
			$scope.updateTestSuite.group = $scope.group;
			
			$http.post("../webservice/crateTestSuite",$scope.updateTestSuite)
			.success(function (response) {
				$scope.applications = response.status;
				$scope.updateTestSuite ={};
				$scope.applicationSelectEvent();
				$scope.loading = false;
			})
			.error(function(response) {
				
				$scope.errorMessage = response.exceptionMessage;
				$scope.errorStatus = true;
			})
			
		}
	}
	
	$scope.getAllApplications = function() {
		console.log("---------GETTING ALL APPLICATIONS-----------");
		
		$http.post("../webservice/findApplicationsByUserId",$scope.userDetail.sso_id)
			.success(function (response) {
				$scope.applications = response.applicationList;
				$scope.intializing = false;
				$scope.testattr ="gotdata";
				$scope.loading = false;
			})
			.error(function() {
				
				$scope.errorMessage = response.exceptionMessage;
				$scope.errorStatus = true;
			})
			
	}
	
	$scope.applicationSelectEvent = function(){
		$scope.testsuites = [{}];
		if($scope.app_id == null || $scope.app_id == '') {
			$scope.applicationSelected =false;
		} else {
			$scope.loading = true;
			console.log("Getting Testcases for app id: " + $scope.app_id);
			$scope.reqTemp.app_id= $scope.app_id;
			$scope.reqTemp.group_id = $scope.userDetail.groupId;
			$http.post("../webservice/getTestsuiteByAppAndGroup",$scope.reqTemp)
				.success(function(response) {
					$scope.testsuites = response.testSuite;
					console.log($scope.testsuites[0].testsuite_name);
					$scope.applicationSelected =true;
					if($scope.testsuites.length == 0) {
						$scope.errorMessage =response.exceptionMessage;
						$scope.loading = false;
						$scope.errorStatus= true;
						$scope.applicationSelected =false;
					} else {
						$scope.loading = false;
						
					}
					
				})
				.error(function(){
					$scope.loading = false;
					$scope.errorMessage =response.exceptionMessage;
					$scope.errorStatus= true;
				})
			
		}
	}
	
	
$scope.edit = function(testsuiteId) {
		$scope.loading = true;
		$scope.button = "Update";
		for(var i=0; i<$scope.testsuites.length; i++) {
			if($scope.testsuites[i].testsuite_id == testsuiteId) {
				$scope.updateTestSuite = $scope.testsuites[i]; break;
			}
			
		}
		$scope.loading = false;
	}


$scope.remove = function(testsuiteId) {
	$scope.loading = true;
	
	for(var i=0; i<$scope.testsuites.length; i++) {
		if($scope.testsuites[i].testsuite_id == testsuiteId) {
			$scope.deleteTestSuite = $scope.testsuites[i]; break;
		}
		
	}
	
	for(var i=0; i<$scope.applications.length ; i++) {
		
		if($scope.applications[i].app_id == $scope.app_id) {
			$scope.deleteTestSuite.application = $scope.applications[i];
			break;
		}
	}
	$scope.deleteTestSuite.group = $scope.group;
	
	$http.post("../webservice/deleteTestSuite",$scope.deleteTestSuite)
	.success(function (response) {
		$scope.applications = response.status;
		$scope.deleteTestSuite ={};
		$scope.applicationSelectEvent();
		$scope.button = "Create";
		$scope.loading = false;
	})
	.error(function(response) {
		
		$scope.errorMessage = response.exceptionMessage;
		$scope.errorStatus = true;
	})
	
	$scope.loading = false;
	
}
	
	
$scope.getUserDetails = function() {
		
		$http.get("../webservice/getLoggedUserDetails")
		.success(function (response) {
			$scope.userDetail = response.userDetails;
			console.log("User Details: " + $scope.userDetail.groupId);
			$scope.getGroup();
			$scope.getAllApplications();
			$scope.testattr ="gotdata";
		})
		.error(function(response) {
			
			$scope.errorMessage = response.exceptionMessage;
			$scope.errorStatus = true;
		})
		
	}


$scope.getGroup = function() {
	
	$http.post("../webservice/getGroupInfo",$scope.userDetail.groupId)
	.success(function(response) {
		$scope.group = response.group;
	})
	.error(function(response){
		$scope.loading = false;
		$scope.errorMessage =response.exceptionMessage;
		$scope.errorStatus= true;
	})
	
}

$scope.pageInit();
	
})

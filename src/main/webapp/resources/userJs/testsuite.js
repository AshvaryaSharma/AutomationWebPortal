angular.module('testsuite',[]).controller('testsuiteController', function($scope,$http) {

	
	
	$scope.pageInit = function() {
		$scope.title = "New Test Suite Details";
		$scope.button = "Create";
		$scope.intializing = true;
		$scope.loading = true;
		$scope.reqTemp ={};
		$scope.updateTestSuite ={};
		$scope.applicationSelected = false;
		$scope.config = false;
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
	
	
	$scope.configEvent = function(testsuiteId) {
		
		$scope.loading = true;
		$scope.testsuiteId = null;
		$scope.getConfigParam(testsuiteId);
		$scope.deleteConfigList = [{}];
		$scope.title = "Add - Edit - Delete Test Suite Parameters";
		$scope.config = true;
		$scope.loading = false;
		
	}
	
	
	$scope.getConfigParam =function(testsuiteId) {
		
		$scope.configParameters = null;
		$scope.testsuiteId = testsuiteId;
		$http.post("../webservice/getTestsuiteConfiguration",testsuiteId)
		.success(function (response) {
			/*$scope.configParameters = response.configList;*/
			for(var i = 0; i < response.configList.length; i++) {
				if(i==0) {
					$scope.configParameters = [{"testsuite_id": testsuiteId,"parameter_name" : response.configList[i].parameter_name,
												"parameter_value" : response.configList[i].parameter_value}]
				}
				else {
					$scope.configParameters.push({"testsuite_id": testsuiteId,"parameter_name" : response.configList[i].parameter_name,
												"parameter_value" : response.configList[i].parameter_value});
				}
			}
			$scope.configParameters.push({"parameter_name":"" , "parameter_value":""});
			if($scope.configParameters.length == 0) {
				$scope.configParameters = [{"parameter_name":"" , "parameter_value":""}];
			}
			
			$scope.loading = false;
		})
		.error(function(response) {
			
			$scope.configParameters = [{"parameter_name":"" , "parameter_value":""}];
		})
		
	}
	
	$scope.addRowEvent = function(index){
		$scope.loading = true;
		console.log("Insert the element at::"+index);
		
		$scope.configParameters[$scope.configParameters.length] = {"parameter_name":"" , "parameter_value":""};
		var itr = 0;
		console.log("Length::"+$scope.configParameters.length);
		for(itr = $scope.configParameters.length-1; itr > index; itr--) {
			console.log("itr::"+itr);
			$scope.configParameters[itr] = $scope.configParameters[itr-1];
		}
		$scope.configParameters[index+1] = {"parameter_name":"" , "parameter_value":""};
		console.log("New Length::"+$scope.configParameters.length);
		
		$scope.loading = false;
	}
	$scope.removeRowEvent = function(index){
		console.log("Removing the row::"+index);
		$scope.loading = true;
		
		$scope.deleteConfigList.push($scope.configParameters[index]);
		
		var itr = 0;
		for(itr=index; itr < $scope.configParameters.length; itr++) {
			$scope.configParameters[itr] = $scope.configParameters[itr+1];
		}
		$scope.configParameters.length = $scope.configParameters.length - 1;
		console.log("Length of testSteps::"+$scope.configParameters.length+" Array::"+$scope.configParameters);
		
		$scope.loading = false;
	}
	
	$scope.back= function() {
		
		$scope.loading = true;
		$scope.deleteConfigList = [{}];
		$scope.title = "New Test Suite Details";
		$scope.configParameters = null;
		$scope.successMessage = "";
		$scope.successStatus = false;
		$scope.config = false;

		$scope.loading = false;
		
	}
	
	
	$scope.save = function() {
		
		$scope.checkConfigParam();
		
		 if($scope.validationResult) {
			 $scope.loading = true;
			//Create Post method request object;
				var temp = {};
				temp.updateParamList = $scope.configParameters;
				var deleteList = null;
				for(var i = 0 ; i < $scope.deleteConfigList.length; i++) {
					
					if($scope.deleteConfigList[i].testsuite_id != undefined) {
						
						if(deleteList == null) {
							deleteList = [$scope.deleteConfigList[i].parameter_name];
							
						}
						else {
							deleteList.push($scope.deleteConfigList[i].parameter_name);
						}
						
					}
					
				}
				temp.deleteParamList = deleteList;
				temp.testsuiteId = $scope.testsuiteId;
				// call API for update
				
				
				$http.post("../webservice/updateTestConfigParams",temp)
				.success(function (response) {
					$scope.successStatus = response.status;
					$scope.successMessage = "Test Parameters updated successfully";
					$scope.loading = false
				})
				.error(function(response) {
					
					$scope.errorMessage = response.exceptionMessage;
					$scope.errorStatus = true;
					$scope.loading = false
				})
			 
			 
		 } 
		
		
		
		
		
		
	}
	
	
$scope.checkConfigParam = function() {
	
	$scope.validationResult = true;
	for(var i=0; i <$scope.configParameters.length; i++) {
		if($scope.configParameters[i].parameter_name == '' || $scope.configParameters[i].parameter_name == null) {
			console.log("Parameter name null for row: "  + i+1);
			$scope.errorMessage = "Paramater Name should be entered";
			$scope.validationResult = false;
			$scope.errorStatus = true;
			break;
		} else if ($scope.configParameters[i].parameter_value == '' || $scope.configParameters[i].parameter_value == null) {
			console.log("Parameter value null for row: "  + i+1);
			$scope.errorMessage = "Paramater Value should be entered";
			$scope.validationResult = false;
			$scope.errorStatus = true;
			break;
			
		}
		
		
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

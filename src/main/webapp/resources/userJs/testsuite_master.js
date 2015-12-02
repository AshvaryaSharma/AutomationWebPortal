angular.module('testsuitemaster',["checklist-model"]).controller('testsuiteMasterController', function($scope,$http,$window) {

	$scope.init = function() {
		$scope.intializing = true;
		$scope.loading = true;
		$scope.errorStatus = false;
		$scope.successStatus = false;
		$scope.selectApplication = true;
		$scope.applications = [{}];
		$scope.applicationSelected = false;
		$scope.testsuiteSelected = false;
		$scope.testsuites = [{}];
		$scope.addEvent = false;
		$scope.reqTemp = {};
		$scope.getUserDetails();
		$scope.testcasesTobeAdded = {};
		$scope.testcasesTobeAdded.id = [];
	}
	
	$scope.testsuiteEdit = function() {
		
		$scope.loading = true;
		$scope.editTestcasesForTestsuite = true;
		$scope.selectApplication = false;
		$scope.getSelectedTestSuite();
		$scope.getEditTestcasesForTestsuites();
		
	}
	
	$scope.createEditTestcasesList = function() {
		$scope.testCasesSelectedToBeAdded = [];
		for(var i=0;i < $scope.editTestcasesList.length; i++) {
			
			$scope.temp = {};
			$scope.temp = $scope.editTestcasesList[i].testcase;
			$scope.temp.param1_value = $scope.editTestcasesList[i].param1_value;
			$scope.temp.param2_value = $scope.editTestcasesList[i].param2_value;
			$scope.temp.param3_value = $scope.editTestcasesList[i].param3_value;
			$scope.temp.param4_value = $scope.editTestcasesList[i].param4_value;
			$scope.temp.param5_value = $scope.editTestcasesList[i].param5_value;
			
			$scope.temp.param1_name = $scope.editTestcasesList[i].param1_name;
			$scope.temp.param2_name = $scope.editTestcasesList[i].param2_name;
			$scope.temp.param3_name = $scope.editTestcasesList[i].param3_name;
			$scope.temp.param4_name = $scope.editTestcasesList[i].param4_name;
			$scope.temp.param5_name = $scope.editTestcasesList[i].param5_name;
			
			$scope.temp.browser = $scope.editTestcasesList[i].browser;
			
			$scope.testCasesSelectedToBeAdded.push($scope.temp);
			
		}
		
		$scope.loading = false;
		
		$scope.editTestcaseReset = $scope.testCasesSelectedToBeAdded;
		
		console.log("Testcases loaded for Edit complete");
		
	}
	
	$scope.backTestcasesToTestsuiteOnEdit = function() {
		
		$scope.loading = true;
		$scope.selectedTestSuite = {};
		$scope.testcases = [];
		$scope.testCasesSelectedToBeAdded = [];
		$scope.testcasesTobeAdded = {};
		$scope.testcasesTobeAdded.id = [];
		$scope.selectApplication = true;
		$scope.editTestcasesForTestsuite = false;
		$scope.addEvent = false;
		$scope.loading = false;
	}
	
	$scope.resetTestcasesToTestsuiteOnEdit = function() {
		console.log("RESET START")
		$scope.loading = true;
		
		$scope.testCasesSelectedToBeAdded = $scope.editTestcaseReset;
		$scope.errorStatus = false;
		$scope.successStatus = false;
		$scope.loading = false;
		console.log("RESET DONE");
	}
	
	
	$scope.getEditTestcasesForTestsuites = function() {
		
		$scope.editTestcasesList = [];
		$http.post("../webservice/getTestcasesForTestsuites",$scope.testsuite_id)
		.success(function(response) {
			$scope.editTestcasesList = response.testcases;
			$scope.createEditTestcasesList();
		})
		.error(function(response){
			
			$scope.errorMessage =response.exceptionMessage;
			$scope.errorStatus= true;
			$scope.loading = false;
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
	
	$scope.testsuiteSelectEvent = function() {
		
		if($scope.testsuite_id == undefined || $scope.testsuite_id == '') {
			console.log("No Test suite selected")
			$scope.testsuiteSelected = false;
		} else {
			console.log("Test suite Selected");
			$scope.testsuiteSelected = true;
		}
		
	}
	
	$scope.testsuiteAdd = function() {
		$scope.selectApplication = false;
		$scope.addEvent = true;
		$scope.loading = true;
		$scope.getSelectedTestSuite();
		$scope.getTestCasesToBeAdded();
		
	}
	
	$scope.getSelectedTestSuite = function() {
		
		for(var i=0; i < $scope.testsuites.length ; i++) {
			
			if($scope.testsuites[i].testsuite_id == $scope.testsuite_id) {
				
				$scope.selectedTestSuite = $scope.testsuites[i];
				break;
			}
		}
		
	}
	
	$scope.resetTestcasesToTestsuites = function() {
		
		$scope.testCasesSelectedToBeAdded = $scope.resetTestcasesToTestsuites;
		
	}
	
	$scope.backTestcasesToTestsuite = function() {
		$scope.testCasesSelectedToBeAdded = [];
		$scope.addEvent = true;
		$scope.addEventTestcaseSelected = false;
		
	}
	
	$scope.checkAddTestCases = function() {
		
		for(var i=0;i<$scope.testCasesSelectedToBeAdded.length ; i++) {
			if(($scope.testCasesSelectedToBeAdded[i].param1_name != undefined && $scope.testCasesSelectedToBeAdded[i].param1_name !='')
					&& ($scope.testCasesSelectedToBeAdded[i].param1_value == undefined || $scope.testCasesSelectedToBeAdded[i].param1_value == '')) {
				
				$scope.errorMessage = "Enter value of parameter 1 for Testcase: " + $scope.testCasesSelectedToBeAdded[i].testcase_name;
				$scope.errorStatus = true;
				break;
			}
			
			
			else if(($scope.testCasesSelectedToBeAdded[i].param2_name != undefined && $scope.testCasesSelectedToBeAdded[i].param2_name !='')
					&& ($scope.testCasesSelectedToBeAdded[i].param2_value == undefined || $scope.testCasesSelectedToBeAdded[i].param2_value == '')) {
				
				$scope.errorMessage = "Enter value of parameter 2 for Testcase: " + $scope.testCasesSelectedToBeAdded[i].testcase_name;
				$scope.errorStatus = true;
				break;
			}
			
			
			else if(($scope.testCasesSelectedToBeAdded[i].param3_name != undefined && $scope.testCasesSelectedToBeAdded[i].param3_name !='')
					&& ($scope.testCasesSelectedToBeAdded[i].param3_value == undefined || $scope.testCasesSelectedToBeAdded[i].param3_value == '')) {
				
				$scope.errorMessage = "Enter value of parameter 3 for Testcase: " + $scope.testCasesSelectedToBeAdded[i].testcase_name;
				$scope.errorStatus = true;
				break;
			}
			
			
			else if(($scope.testCasesSelectedToBeAdded[i].param4_name != undefined && $scope.testCasesSelectedToBeAdded[i].param4_name !='')
					&& ($scope.testCasesSelectedToBeAdded[i].param4_value == undefined || $scope.testCasesSelectedToBeAdded[i].param4_value == '')) {
				
				$scope.errorMessage = "Enter value of parameter 4 for Testcase: " + $scope.testCasesSelectedToBeAdded[i].testcase_name;
				$scope.errorStatus = true;
				break;
			}
			
			else if(($scope.testCasesSelectedToBeAdded[i].param5_name != undefined && $scope.testCasesSelectedToBeAdded[i].param5_name !='')
					&& ($scope.testCasesSelectedToBeAdded[i].param5_value == undefined || $scope.testCasesSelectedToBeAdded[i].param5_value == '')) {
				
				$scope.errorMessage = "Enter value of parameter 5 for Testcase: " + $scope.testCasesSelectedToBeAdded[i].testcase_name;
				$scope.errorStatus = true;
				break
			}
			
		}
		
		
	}
	
	$scope.addTestcasesToTestsuite = function() {
		
		$scope.checkAddTestCases();
		if($scope.errorStatus == false) {
			$scope.createaddTestcasesToTestsuiteObject();
			
			
			$http.post("../webservice/addTestcasesToTestsuite",$scope.testsuiteTestcasesObj)
			.success(function(response) {
				$scope.init();
				$scope.successMessage = "Test cases successfully added to test suite"; 
				$scope.successStatus = true;
				
			})
			.error(function(response){
				$scope.loading = false;
				$scope.errorMessage =response.exceptionMessage;
				$scope.errorStatus= true;
			})
		}
		
		
		
	}
	
	
	$scope.createaddTestcasesToTestsuiteObject = function() {
		
		$scope.testsuiteTestcasesObj = [];
		
		$scope.temp = {};
		for(var i=0; i < $scope.testCasesSelectedToBeAdded.length ; i++) {
			$scope.temp.testsuite = $scope.selectedTestSuite;
			for(var j=0; j < $scope.testcases.length ; j++) {
				if($scope.testcases[j].testcase_id == $scope.testCasesSelectedToBeAdded[i].testcase_id) {
					
					$scope.temp.testcase = $scope.testcases[j];
					break;
				}
				
			}
			
			if($scope.testCasesSelectedToBeAdded[i].browser != undefined) {
				
				$scope.temp.browser = $scope.testCasesSelectedToBeAdded[i].browser;
			} else {
				$scope.temp.browser = "NA";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param1_name != undefined) {
				
				$scope.temp.param1_name = $scope.testCasesSelectedToBeAdded[i].param1_name;
			} else {
				$scope.temp.param1_name = "";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param2_name != undefined) {
				
				$scope.temp.param2_name = $scope.testCasesSelectedToBeAdded[i].param2_name;
			} else {
				$scope.temp.param2_name = "";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param3_name != undefined) {
				
				$scope.temp.param3_name = $scope.testCasesSelectedToBeAdded[i].param3_name;
			} else {
				$scope.temp.param3_name = "";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param4_name != undefined) {
				
				$scope.temp.param4_name = $scope.testCasesSelectedToBeAdded[i].param4_name;
			} else {
				$scope.temp.param4_name = "";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param5_name != undefined) {
				
				$scope.temp.param5_name = $scope.testCasesSelectedToBeAdded[i].param5_name;
			} else {
				$scope.temp.param5_name = "";
			}
			
			
			if($scope.testCasesSelectedToBeAdded[i].param1_value != undefined) {
				
				$scope.temp.param1_value = $scope.testCasesSelectedToBeAdded[i].param1_value;
			} else {
				$scope.temp.param1_value = "";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param2_value != undefined) {
				
				$scope.temp.param2_value = $scope.testCasesSelectedToBeAdded[i].param2_value;
			} else {
				$scope.temp.param2_value = "";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param3_value != undefined) {
				
				$scope.temp.param3_value = $scope.testCasesSelectedToBeAdded[i].param3_value;
			} else {
				$scope.temp.param3_value = "";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param4_value != undefined) {
				
				$scope.temp.param4_value = $scope.testCasesSelectedToBeAdded[i].param4_value;
			} else {
				$scope.temp.param4_value = "";
			}
			
			if($scope.testCasesSelectedToBeAdded[i].param5_value != undefined) {
				
				$scope.temp.param5_value = $scope.testCasesSelectedToBeAdded[i].param5_value;
			} else {
				$scope.temp.param5_value = "";
			}
			
			
			$scope.testsuiteTestcasesObj.push($scope.temp);
			
		}
		
		
		
		
		
	}
	
	$scope.testsuiteTestcaseSelectAdd = function() {
		$scope.testCasesSelectedToBeAdded = [];
		for(var i = 0; i < $scope.testcases.length ; i++) {
			
			for(var j=0; j < $scope.testcasesTobeAdded.id.length ; j ++) {
				
				if($scope.testcases[i].testcase_id == $scope.testcasesTobeAdded.id[j]) {
					$scope.testCasesSelectedToBeAdded.push($scope.testcases[i]);
					break;
				}
			}
			
		}
		$scope.resetTestcasesToTestsuites = $scope.testCasesSelectedToBeAdded;
		$scope.addEvent = false;
		$scope.addEventTestcaseSelected = true;
	}
	
	$scope.testsuiteTestCaseSelectBack = function() {
		$scope.selectedTestSuite = {};
		$scope.testcases = [];
		$scope.testCasesSelectedToBeAdded = [];
		$scope.testcasesTobeAdded = {};
		$scope.testcasesTobeAdded.id = [];
		$scope.selectApplication = true;
		$scope.addEvent = false;
		
		
	}
	
	$scope.toggleAddAllTestcases = function() {
		
		if($scope.isAddAllTestcasesChecked) {
			$scope.testcasesTobeAdded.id = $scope.testcases.map(function(item){ return item.testcase_id;})
		} else {
			$scope.testcasesTobeAdded.id = [];
		}
	}
	
	$scope.getTestCasesToBeAdded = function() {
		
		$scope.testCaseAddRequest = {};
		$scope.testCaseAddRequest.app_Id = $scope.app_id;
		$scope.testCaseAddRequest.testsuite_Id = $scope.testsuite_id;
		
		$http.post("../webservice/getTestcasesBySuiteId",$scope.testCaseAddRequest)
		.success(function(response) {
			$scope.testcases = response.testcasesList;
			$scope.loading = false;
			
		})
		.error(function(){
			$scope.loading = false;
			$scope.errorMessage =response.exceptionMessage;
			$scope.errorStatus= true;
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


	
	$scope.init();
})
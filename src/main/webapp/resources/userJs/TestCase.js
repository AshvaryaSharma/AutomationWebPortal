angular.module('testCase',[]).controller('testcaseController', function($scope,$http) {


	$scope.intializing = true;
	
	$scope.loading = false;
	$scope.successMessage = "Test Case Created Successfully"
	$scope.successStatus = false;
	$scope.isApplicationSelected = false;
	$scope.errorMessage = null;
	$scope.errorStatus = false;
	$scope.applications = [{}];
	$scope.testattr = "test";
	$scope.app_id=null;
	$scope.packages = [{}];
	$scope.package_id = "";
	$scope.applicationsLoaded = false;
	$scope.packagesLoaded = false;
	$scope.isPackageSelected = false;
	$scope.operationNames = [];
	$scope.testCaseDescription = "";
	$scope.testCaseName = "";
	$scope.tempTestStep = {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''};
	$scope.testStep = [{keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
	                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
	                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''}
	                   ];
	
	$scope.testcaseObject = {
			package_id : null,
			testcase_id : null,
			testcase_name:'',
			testcase_description: '',
			teststeps:[{}]
	};
	
	
	$scope.getAllApplications = function() {
		console.log("---------GETTING ALL APPLICATIONS-----------");
		
		$http.get("webservice/findAllApplications")
			.success(function (response) {
				$scope.applications = response;
				$scope.intializing = false;
				$scope.testattr ="gotdata";
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get application data"
				$scope.errorStatus = true;
			})
			$scope.intializing = false;
	}
	
	
	$scope.operatorSelectEvent = function(rowNumber) {
		
		$scope.loading = true;
		$scope.errorStatus= false;
		$scope.testattr = "row number: " + rowNumber;
		var temp = {};
		/*var i=0;*/
		
		var i=rowNumber;
		
		/*for(; i < $scope.testStep.length; i++) {
			if($scope.testStep[i].step_num == rowNumber) {
				temp = angular.copy($scope.testStep[i]);
				$scope.testattr = " identifying";
				break;
			}
			
		}*/
		
		$scope.testattr = "got operation name" + temp.keyword;
		
		if($scope.testStep[i].keyword == '') {
			
			$scope.testStep[i].arg1_ph = "";
			$scope.testStep[i].arg2_ph = "";
			$scope.testStep[i].arg3_ph = "";
			$scope.testStep[i].arg4_ph = "";
			$scope.testStep[i].arg5_ph = "";
			
			$scope.testStep[i].arg1 = null;
			$scope.testStep[i].arg2 = null;
			$scope.testStep[i].arg3 = null;
			$scope.testStep[i].arg4 = null;
			$scope.testStep[i].arg5 = null;
			
			
			
		} else  {
			
			$http.post("webservice/getOperation",$scope.testStep[i].keyword)
			.success(function(response){
				
				$scope.testStep[i].arg1_ph = response.arg1;
				$scope.testStep[i].arg2_ph = response.arg2;
				$scope.testStep[i].arg3_ph = response.arg3;
				$scope.testStep[i].arg4_ph = response.arg4;
				$scope.testStep[i].arg5_ph = response.arg5;
				
				
				$scope.testStep[i].arg1 = null;
				$scope.testStep[i].arg2 = null;
				$scope.testStep[i].arg3 = null;
				$scope.testStep[i].arg4 = null;
				$scope.testStep[i].arg5 = null;
				
				$scope.testattr="Success for: " + temp.keyword + $scope.testStep[i].arg1_ph + $scope.testStep[i].arg2_ph + $scope.testStep[i].arg3_ph + $scope.testStep[i].arg4_ph + $scope.testStep[i].arg5_ph;
			})
			.error(function(){
				$scope.errorMessage = "Not able to get operation value"
				$scope.errorStatus= true;
				$scope.testattr = "Error for:" + temp.keyword;
			})
		}
		
		
			
			
		/*$scope.testStep[i] = angular.copy(temp);*/
		$scope.loading = false;
		$scope.testattr = "data now: " + $scope.testStep[i];
			
	}
	
	
	$scope.getAllOperationNames = function() {
		
		$http.get("webservice/getAllOperationNames")
			.success(function (response){
				
				$scope.operationNames = response;
				
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get Operations List Available for application"
				$scope.errorStatus=true;
			})
		
	}
	
	$scope.applicationSelectEvent = function() {
		$scope.loading = true;
		$scope.package_id = null;
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
		if($scope.package_id == "") {
			$scope.isPackageSelected = false;
			$scope.package_id = null;
			
		} else {
			$scope.isPackageSelected = true;
		}
		
		$scope.loading = false;
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
	
	$scope.addRowEvent = function(rowNum){
		$scope.loading = true;
		var temp = $scope.tempTestStep;
		
		/*temp.step_num = rowNum + 1;*/
		$scope.testStep.splice(rowNum,0,temp);
		/*for(var i=0;i < $scope.testStep.length; i++) {
			
			$scope.testStep[i].step_num = i+1;
			
		}*/
		
		$scope.loading = false;
	}
	
	$scope.resetAll = function() {
		$scope.successStatus = false;
		$scope.reset();
		
	}
	
	
	$scope.submitTestcase = function() {
		console.log("------------")
		$scope.loading = true;
		$scope.errorStatus= false;
		$scope.successStatus = false;
		$scope.check();
		
		if($scope.errorStatus == false) {
			$scope.loading = true;
			$scope.createTestcaseObject();
			
			$http.post("webservice/addNewTestCase", $scope.testcaseObject)
				.success(function(response){
					
					$scope.reset();
					$scope.successStatus = true;
					$scope.testattr = "SUCCESSS FULLy CREATED";
					
					
				})
				.error(function() {
					$scope.testattr = "ERROR on creation";
					$scope.errorMessage = "Error in creating test case"
					$scope.errorStatus= true;
				})
			
		}
		
		$scope.loading = false;
		
	}
	
	$scope.reset = function() {
		
			$scope.loading = false;
			$scope.isApplicationSelected = false;
			$scope.errorMessage = null;
			$scope.errorStatus = false;
			$scope.testattr = "test";
			$scope.app_id=null;
			$scope.packages = [{}];
			$scope.package_id = "";
			$scope.applicationsLoaded = false;
			$scope.packagesLoaded = false;
			$scope.isPackageSelected = false;
			$scope.testCaseDescription = "";
			$scope.testCaseName = "";
			$scope.tempTestStep = {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''};
			$scope.testStep = [{keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
			                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
			                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''}
			                   ];
			
			$scope.testcaseObject = {
					package_id : null,
					testcase_id : null,
					testcase_name:'',
					testcase_description: '',
					teststeps:[{}]
			};
		
		
	}
	
	
	$scope.createTestcaseObject = function() {
		
		$scope.testcaseObject.package_id = $scope.package_id;
		$scope.testcaseObject.testcase_name = $scope.testCaseName;
		$scope.testcaseObject.testcase_description = $scope.testCaseDescription;
		$scope.testcaseObject.teststeps = $scope.testStep;
	}
	
	
	$scope.check = function() {
		$scope.loading = true;
		
		if($scope.app_id == null) {
			$scope.errorMessage = "Selecting an application is required"
			$scope.errorStatus= true;
			
		}
		else if($scope.package_id == null) {
			
			$scope.errorMessage = "Selecting a package is required"
			$scope.errorStatus= true;
		} else if($scope.testCaseName == "" || $scope.testCaseName == null) {
			$scope.errorMessage = "Test Case Name is required"
			$scope.errorStatus= true;
			
		} else if($scope.testCaseDescription == "" || $scope.testCaseDescription == "") {
			$scope.errorMessage = "Test case Description is required"
			$scope.errorStatus= true;
			
		} else {
			
			for(var i=0; i < $scope.testStep.length; i++) {
				
				if($scope.testStep[i].keyword == "") {
					$scope.errorMessage = "Select keyword for Test Step no " + (i+1);
					$scope.errorStatus= true;
					break;
				} else if($scope.testStep[i].arg1_ph != 'NA' && ($scope.testStep[i].arg1 == "" || $scope.testStep[i].arg1 == null)) {
					$scope.errorMessage = "Enter value of ARG 1 for Test Case Step " + (i+1);
					$scope.errorStatus= true;
					break;
					
				}	else if($scope.testStep[i].arg2_ph != 'NA' && ($scope.testStep[i].arg2 == "" || $scope.testStep[i].arg2 == null)) {
					$scope.errorMessage = "Enter value of ARG 2 for Test Case Step " + (i+1);
					$scope.errorStatus= true;
					break;
					
				}
				else if($scope.testStep[i].arg3_ph != 'NA' && ($scope.testStep[i].arg3 == "" || $scope.testStep[i].arg3 == null)) {
					$scope.errorMessage = "Enter value of ARG 3 for Test Case Step " + (i+1);
					$scope.errorStatus= true;
					break;
					
				}
				else if($scope.testStep[i].arg4_ph != 'NA' && ($scope.testStep[i].arg4 == "" || $scope.testStep[i].arg4 == null)) {
					$scope.errorMessage = "Enter value of ARG 4 for Test Case Step " + (i+1);
					$scope.errorStatus= true;
					break;
					
				}
				else if($scope.testStep[i].arg5_ph != 'NA' && ($scope.testStep[i].arg5 == "" || $scope.testStep[i].arg5 == null)) {
					$scope.errorMessage = "Enter value of ARG 5 for Test Case Step " + (i+1);
					$scope.errorStatus= true;
					break;
					
				}
				
			}
			
		}
		$scope.loading = false;
	}
	
	
	$scope.getAllApplications();
	$scope.getAllOperationNames();
	
});
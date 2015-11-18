'use strict';
app.filter('propsFilter', function() {
	  return function(items, props) {
	    var out = [];

	    if (angular.isArray(items)) {
	      var keys = Object.keys(props);
	        
	      items.forEach(function(item) {
	        var itemMatches = false;

	        for (var i = 0; i < keys.length; i++) {
	          var prop = keys[i];
	          var text = props[prop].toLowerCase();
	          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
	            itemMatches = true;
	            break;
	          }
	        }

	        if (itemMatches) {
	          out.push(item);
	        }
	      });
	    } else {
	      // Let the output be the input untouched
	      out = items;
	    }

	    return out;
	  };
	});

app.controller('createTestcaseController', function(createTestService, $scope, $http, $rootScope) {
	console.log("Inside createTestcaseController...");
	$scope.safeOperationKeywords = [];
	$scope.safeOperationType = [];
	$scope.pageAction = 'create';
	$scope.testcaseId = null;
	$scope.isApplicationSelected = false;
	$scope.isPackageSelected = false;
	$scope.safeAppData = [];
	var current = $rootScope.current;
				
	
	/*Getting data from Services*/
	
	
	/*Checking if any application is selected or not*/
	$scope.appChangeFunction = function() {
		$scope.isApplicationSelected = true;
	}
	/*Checking if any testcase name been entered or not*/
	$scope.testNameChange = function() {
		if($scope.testCaseName.length > 1) {
			$scope.isTestCaseNameSelected = true;
		}
		else {
			$scope.isTestCaseNameSelected = false;
		}
	}
	/*This function will get called at the staring of the page*/
	$scope.startApplication = function() {
		console.log("Checking page action:"+$scope.pageAction);
		//$scope.user = userId;
		
		if($scope.pageAction=='create') {
			console.log("Page action is create");
			
			$scope.createInitialize();
			$scope.getUserDetails();
			$scope.getAllApplications();
			$scope.getAllOperationNames();
		} else if($scope.pageAction == 'SaveAsNew') {
			
			/*$scope.saveInitialize();
			$scope.saveAsNewInitialize(testcaseId);*/
			
		} else if($scope.pageAction == 'view') {
			
			/*$scope.saveInitialize();
			$scope.saveAsNewInitialize(testcaseId);
			$scope.viewTestcase = true;*/
			
		} else if($scope.pageAction == 'edit') {
			/*$scope.saveInitialize();
			$scope.editInitialize(testcaseId);
			$scope.editTestCase = true;
			$scope.successMessage = "Test Case Updated Successfully"*/
			
		}
		
		console.log("-----------------Initializing Complete--------------------");
		
		console.log("------Test Steps-------: " + $scope.testStep);
		
		for(var i=0; i < $scope.testStep.length; i++) {
			
			console.log("Test Steps: " + $scope.testStep[i].keyword + " " +  $scope.testStep[i].arg1);
			
		}
		
		console.log("--------------Application ID: " + $scope.app_id);
		console.log("--------------Package ID: " + $scope.package_id);
		console.log("--------------TestcaseDescrption Name: " + $scope.testCaseName);
		console.log("--------------Testcase Description: " + $scope.testCaseDescription);
		
		$scope.intializing = false;
	}
	$scope.createInitialize = function(){
		
		$scope.intializing = true;
		$scope.viewTestcase = false;
		$scope.loading = false;
		$scope.successMessage = "Test Case Created Successfully"
		$scope.successStatus = false;
		$scope.errorMessage = null;
		$scope.errorStatus = false;
		$scope.applications = [{}];
		$scope.testattr = "test";
		$scope.app_id=null;
		$scope.packages = [{}];
		$scope.package_id = "";
		$scope.applicationsLoaded = false;
		$scope.packagesLoaded = false;
		$scope.operationNames = [];
		$scope.testCaseDescription = "";
		$scope.testCaseName = "";
		$scope.isTestCaseNameSelected = false;
		$scope.tempTestStep = {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''};
		$scope.testStep = [{keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''}
		                   ];
		$scope.editTestCase = false;
		$scope.testcaseObject = {
				package_id : null,
				testcase_id : null,
				testcase_name:'',
				testcase_description: '',
				teststeps:[{}]
		};
		
	}
	$scope.getUserDetails = function() {
		console.log("Getting user data...");
		createTestService.getUserData().then(function(appData) {
		$scope.safeUserData = appData;
		console.log("******User Data::"+$scope.safeUserData.userDetails.first_name);
		});
		/*$http.get("../webservice/getLoggedUserDetails")
		.success(function (response) {
			$scope.userDetail = response.userDetails;
			
			$scope.testattr ="gotdata";
		})
		.error(function(response) {
			
			$scope.errorMessage = response.exceptionMessage;
			$scope.errorStatus = true;
		})*/
		
	}
	$scope.getAllApplications = function() {
		console.log("---------GETTING ALL APPLICATIONS-----------");
		createTestService.getAppData().then(function(appData) {
			$scope.safeAppData = appData;
			console.log("******Controller Data::"+$scope.safeAppData[0].app_name);
		});
		/*$http.post("../webservice/findApplicationsByUserId",$scope.user)
			.success(function (response) {
				$scope.applications = response.applicationList;
				$scope.intializing = false;
				$scope.testattr ="gotdata";
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get application data";
				$scope.errorStatus = true;
			})*/
			
	}
	$scope.getAllOperationNames = function() {
		createTestService.getOperationData().then(function(operationData){
		$scope.safeOperationData = operationData;
		
		var key;
		for(key in $scope.safeOperationData) {
			console.log("Key::"+key);
			$scope.safeOperationKeywords.push($scope.safeOperationData[key].keyword);
			$scope.safeOperationType.push($scope.safeOperationData[key].type);
		};
		console.log("Operation Data::"+$scope.safeOperationKeywords[0]);
	});
		/*$http.get("../webservice/getAllOperationNames")
			.success(function (response){
				
				$scope.operationNames = response;
				
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get Operations List Available for application"
				$scope.errorStatus=true;
			})*/
		
	}
	$scope.startApplication();
	
	});
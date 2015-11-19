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
		$scope.saveInitialize();
		$scope.saveAsNewInitialize(testcaseId);
	} else if($scope.pageAction == 'view') {
		$scope.saveInitialize();
		$scope.saveAsNewInitialize(testcaseId);
		$scope.viewTestcase = true;
	} else if($scope.pageAction == 'edit') {
		$scope.saveInitialize();
		$scope.editInitialize(testcaseId);
		$scope.editTestCase = true;
		$scope.successMessage = "Test Case Updated Successfully";
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
		console.log("******Controller Data::"+$scope.safeAppData.applicationList[0].app_name);
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
			for(key in $scope.safeOperationData.operationList) {
				console.log("Key::"+key);
				$scope.safeOperationKeywords.push($scope.safeOperationData.operationList[key].keyword);
				$scope.safeOperationType.push($scope.safeOperationData.operationList[key].type);
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
	$scope.saveInitialize = function(){
		
		$scope.intializing = true;
		$scope.viewTestcase = false;
		$scope.loading = false;
		$scope.successMessage = "Test Case Created Successfully";
		$scope.successStatus = false;
		$scope.errorMessage = null;
		$scope.errorStatus = false;
		/*$scope.applications = [{}];*/
		$scope.applications = [{}];
		$scope.testattr = "test";
		/*$scope.app_id=null;*/
		$scope.packages = [{}];
		/*$scope.package_id = "";*/
		$scope.applicationsLoaded = true;	//Changed to true as it will be called after the pageAction='create'
		$scope.packagesLoaded = false;
		$scope.isPackageSelected = false;
		/*$scope.operationNames = [];*/
		$scope.operationNames = null;
		$scope.testCaseDescription = "";
		$scope.testCaseName = "";
		$scope.tempTestStep = {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''};
		$scope.editTestCase = false;
		
		$scope.testcaseObject = {
				package_id : null,
				testcase_id : null,
				testcase_name:'',
				testcase_description: '',
				teststeps:[{}]
		};
		
	}
	$scope.saveAsNewInitialize = function(testcaseId) {
		console.log("Initializing the page for testcaseid: " + testcaseId);
		$scope.getAllOperationNames();
		$scope.getAllApplications();
		$scope.app_id = null;
		$scope.package_id = null;
		$scope.testStep = [{}];
		
		console.log("Application id: " + $scope.app_id);
		console.log("Package ID:" + $scope.package_id);
		
		console.log("Executing webservice. Getting testcase details");
		
		/*$http.post('../webservice/getTestcaseByTestcaseId',testcaseId)
			.success(function (response) {
				
				
				$scope.package_id = response.package_id;
				$scope.testCaseName = response.testcase_name;
				$scope.testCaseDescription = response.testcase_description;
				$scope.app_id = response.teststeps[0].testcase.packages.application.app_id;
				
				console.log("Initilized " +
						
						+ "package_id: " + $scope.package_id
						+ "testcase_name: " + $scope.testCaseName
						+ "testcase_description: " + $scope.testCaseDescription
						+ "app_id: " + $scope.app_id);
				
				for(i=0;i < response.teststeps.length; i++) {
					console.log("initialising Step id: " + response.teststeps[i].keyword);
					var step ={};
					
					step.keyword = response.teststeps[i].keyword;
					
					step.arg1 = response.teststeps[i].arg1;
					step.arg2 = response.teststeps[i].arg2;
					step.arg3 = response.teststeps[i].arg3;
					step.arg4 = response.teststeps[i].arg4;
					step.arg5 = response.teststeps[i].arg5;
					
					
					
					$scope.testStep.splice(i,0,step);
					$scope.operatorSelectEvent(i,false);
					$scope.testStep[i].arg1 = response.teststeps[i].arg1;
					$scope.testStep[i].arg2 = response.teststeps[i].arg2;
					$scope.testStep[i].arg3 = response.teststeps[i].arg3;
					$scope.testStep[i].arg4 = response.teststeps[i].arg4;
					$scope.testStep[i].arg5 = response.teststeps[i].arg5;
					console.log("Added test step: " + $scope.testStep[i].keyword);
				}
				
				$scope.testStep.splice($scope.testStep.length -1,1);
				
				console.log("Printing response" + response.package_id);
				console.log("Got test case: " + $scope.testcaseObject);
				
				/*console.log("In Application id: " + $scope.app_id);
				console.log("In Package ID:" + $scope.package_id);
				
				$scope.applicationSelectEvent();
				
				
				console.log("Selected Package: " +  $scope.package_id);
				$scope.packageSelectEvent();*/
				
				
				/*$scope.setAndSelectApplication($scope.app_id);
				
				$scope.setAndSelectPackage(response.package_id);
				
				
				$scope.testcaseObject.testcase_id = null;
				
				
			})
			.error(function(){
				$scope.errorMessage = "Not able to get testcase for saving as new"
				$scope.errorStatus=true;
			})*/
			
		console.log("After Application id: " + $scope.app_id);
		console.log("After Package ID:" + $scope.package_id);
		
	}
	$scope.editInitialize = function(testcaseId) {
		
		console.log("Initializing the page for testcaseid: " + testcaseId);
		$scope.getAllOperationNames();
		$scope.getAllApplications();
		$scope.app_id = null;
		$scope.package_id = null;
		$scope.testStep = [{}];
		
		console.log("Application id: " + $scope.app_id);
		console.log("Package ID:" + $scope.package_id);
		
		console.log("Executing webservice. Getting testcase details");
		
		
		/*$http.post('../webservice/getTestcaseByTestcaseId',testcaseId)
		.success(function (response) {
			
			$scope.package_id = response.package_id;
			$scope.testCaseName = response.testcase_name;
			$scope.testCaseDescription = response.testcase_description;
			$scope.app_id = response.teststeps[0].testcase.packages.application.app_id;
			
			for(i=0;i < response.teststeps.length; i++) {
				console.log("initialising Step id: " + response.teststeps[i].keyword);
				var step ={};
				
				step.keyword = response.teststeps[i].keyword;
				step.teststep_id = response.teststeps[i].teststep_id;
				step.arg1 = response.teststeps[i].arg1;
				step.arg2 = response.teststeps[i].arg2;
				step.arg3 = response.teststeps[i].arg3;
				step.arg4 = response.teststeps[i].arg4;
				step.arg5 = response.teststeps[i].arg5;
				
				
				
				$scope.testStep.splice(i,0,step);
				$scope.operatorSelectEvent(i,false);
				$scope.testStep[i].arg1 = response.teststeps[i].arg1;
				$scope.testStep[i].arg2 = response.teststeps[i].arg2;
				$scope.testStep[i].arg3 = response.teststeps[i].arg3;
				$scope.testStep[i].arg4 = response.teststeps[i].arg4;
				$scope.testStep[i].arg5 = response.teststeps[i].arg5;
				console.log("Added test step: " + $scope.testStep[i].keyword);
			}
			
			$scope.testStep.splice($scope.testStep.length -1,1);
			
			console.log("Printing response" + response.package_id);
			console.log("Got test case: " + $scope.testcaseObject);
			$scope.setAndSelectApplication($scope.app_id);
			
			$scope.setAndSelectPackage(response.package_id);
			
			
			$scope.testcaseObject.testcase_id = response.testcase_id;
			
		})
		.error(function() {
			$scope.errorMessage = "Not able to get testcase for saving as new"
			$scope.errorStatus=true;
		});*/
		
		
	}
	$scope.startApplication();

});

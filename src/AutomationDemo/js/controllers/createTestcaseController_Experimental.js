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
//new comment
app.controller('createTestcaseController', function(createTestService, $scope, $http, $rootScope, $location) {
	$scope.safeOperationKeywords = [];
	$scope.safeOperationType = [];
	$scope.testcaseId = null;
	$scope.isApplicationSelected = false;	//Set to true, to avoid validations
	$scope.isPackageSelected = false;
	$scope.safeAppData = [];
	$scope.operationSelected = {};
	$scope.operationDetails = {};
	$scope.configParamList = null;
	$scope.safeUserData = {};
	$scope.packages = [];
	$scope.testStep = [{keyword:'',type:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''},
						   {keyword:'',type:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
						   {keyword:'',type:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''},
						   {keyword:'',type:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''},
						   {keyword:'',type:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''}
						   ];
	
	/*START:: Plugin variables*/
	$scope.disabled = undefined;
	  $scope.searchEnabled = undefined;

	  $scope.setInputFocus = function (){
	    $scope.$broadcast('UiSelectDemo1');
	  };

	  $scope.enable = function() {
	    $scope.disabled = false;
	  };

	  $scope.disable = function() {
	    $scope.disabled = true;
	  };

	  $scope.enableSearch = function() {
	    $scope.searchEnabled = true;
	  };

	  $scope.disableSearch = function() {
	    $scope.searchEnabled = false;
	  };
	  
	  $scope.clear = function() {
		    $scope.operation.selected = undefined;
		    
	  };
	
	  $scope.counter = 0;
	  $scope.someFunction = function (item, model){
	    $scope.counter++;
	    $scope.eventResult = {item: item, model: model};
	  };

	  $scope.removed = function (item, model) {
	    $scope.lastRemoved = {
	        item: item,
	        model: model
	    };
	  };

	  $scope.tagTransform = function (newTag) {
	    var item = {
	        name: newTag,
	        email: newTag.toLowerCase()+'@email.com',
	        age: 'unknown',
	        country: 'unknown'
	    };

	    return item;
	  };
	  
	  
	  $scope.appendToBodyDemo = {
			    remainingToggleTime: 0,
			    present: true,
			    startToggleTimer: function() {
			      var scope = $scope.appendToBodyDemo;
			      var promise = $interval(function() {
			        if (scope.remainingTime < 1000) {
			          $interval.cancel(promise);
			          scope.present = !scope.present;
			          scope.remainingTime = 0;
			        } else {
			          scope.remainingTime -= 1000;
			        }
			      }, 1000);
			      scope.remainingTime = 3000;
			    }
	  };

	/*END:: Plugin variables*/
	/*Getting data from Services*/


	/*Checking if any application is selected or not*/
	$scope.appChangeFunction = function() {
		$scope.isApplicationSelected = true;
		console.log("isApplicationSelected::"+$scope.isApplicationSelected);
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
		$scope.tempTestStep = {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''};
		/*$scope.testStep = [{keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
						   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
						   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
						   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
						   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''}
						   ];
		*/
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
		if($rootScope.safeUserData.userDetails == null) {
			createTestService.getUserData().then(function(appData) {
				$scope.safeUserData = appData;
				console.log("******User Data::"+$scope.safeUserData.userDetails.first_name);
			});
		}
		else {
			
		}
		
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
	
	$scope.addRowEvent = function(index){
		$scope.loading = true;
		console.log("Insert the element at::"+index);
		$scope.printTestSteps();
		$scope.testStep[$scope.testStep.length] = {keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''};
		var itr = 0;
		console.log("Length::"+$scope.testStep.length);
		for(itr = $scope.testStep.length-1; itr >= index; itr--) {
			console.log("itr::"+itr);
			$scope.testStep[itr] = $scope.testStep[itr-1];
		}
		$scope.testStep[index] = {keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''};
		console.log("New Length::"+$scope.testStep.length);
		$scope.printTestSteps();
		$scope.loading = false;
	}
	$scope.removeRowEvent = function(index){
		console.log("Removing the row::"+index);
		$scope.loading = true;
		var itr = 0;
		for(itr=index; itr < $scope.testStep.length; itr++) {
			$scope.testStep[itr] = $scope.testStep[itr+1];
		}
		$scope.testStep.length = $scope.testStep.length - 1;
		console.log("Length of testSteps::"+$scope.testStep.length+" Array::"+$scope.testStep);
		$scope.printTestSteps();
		$scope.loading = false;
	}
	/*Function, only for debugging purposes*/
	$scope.printTestSteps = function() {
		console.log(".........Printing the test steps......");
		var itr = 0;
		for(itr=0; itr < $scope.testStep.length; itr++) {
			console.log(" "+itr+ "Keyword::"+$scope.testStep[itr].keyword+" Type::"+$scope.testStep[itr].type+"PageObject::"+$scope.testStep[itr].pageObject);
		}
	}
	$rootScope.getAllApplications = function() {
		createTestService.getAppData()
		.then(function(appData) {
			$scope.safeAppData = appData;
			console.log("**************Application Data::"+$scope.safeAppData);
		})
		.catch(function(appData){
			console.log("Application Data got Error!!!::::"+appData);
			$scope.errorStatus = true;
			$scope.errorMessage = appData;
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
			console.log("Operation Data::"+$scope.safeOperationData.operationList[0].keyword);
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
	$scope.addOperation = function(opSelected, index) {
		$scope.operationSelected = opSelected;
		//console.log("opSelected::"+opSelected+"Index::"+index);
		$scope.testStep[index].keyword = $scope.operationSelected.keyword;
		$scope.testStep[index].type = $scope.operationSelected.type;
		console.log("Index::"+index+" Keyword::"+$scope.testStep[index].keyword+"Type::"+$scope.testStep[index].type);
		$scope.getOperationByName(index);
	}
	$scope.getOperationByName = function(index){
		console.log("Getting operation by name");
		console.log("++++++Selected Operation::"+$scope.operationSelected.type);
		if($scope.operationSelected.type == 'UI') {
			//createTestService.getUIOperationByName($scope.operationSelected.keyword)
			console.log("Inside UI Operation******");
			createTestService.getUIOperationByName()
			.then(function(uiData) {
				$scope.testStep[index].arg1_ph = '';
				$scope.testStep[index].arg2_ph = '';
				$scope.testStep[index].arg3_ph = uiData.operation.arg1;
				console.log("Placeholder arg3_ph::"+$scope.testStep[index].arg3_ph);
				$scope.testStep[index].arg4_ph = uiData.operation.arg2;
				$scope.testStep[index].arg5_ph = uiData.operation.arg3;
			});
		}
		if($scope.operationSelected.type == 'NONUI') {
			//createTestService.getNonUIOperationByName($scope.operationSelected.keyword)
			createTestService.getNonUIOperationByName()
			.then(function(nonUiData) {
				$scope.operationDetails = nonUiData;
				$scope.testStep[index].arg1_ph = nonUiData.operation.arg1;
				$scope.testStep[index].arg2_ph = nonUiData.operation.arg2;
				$scope.testStep[index].arg3_ph = nonUiData.operation.arg3;
				$scope.testStep[index].arg4_ph = nonUiData.operation.arg4;
				$scope.testStep[index].arg5_ph = nonUiData.operation.arg5;
			});
		}
		if($scope.operationSelected.type == '' || $scope.operationSelected.type == null) {
			$scope.errorStatus = true;
			$scope.errorMessage = "No operation Selected";
		}
		//$scope.printTestSteps();
	};
	/*********Function would get all page names by app_id***********/
	function getPageNames(){
		createTestService.getAllPageNamesByApplication()
		.then(function(appData) {
			$scope.safePageNames = appData;
		})
		.catch(function(appData){
			console.log("Error in retrieving the page names!!!::::"+appData);
			$scope.errorStatus = true;
			$scope.errorMessage = appData;
		});
	}
	/*****Retrieves the page objects on the basis of page_id******/
	$scope.pageNameSelected = function(index) {
		console.log("Selected Page Name["+index+"]::"+$scope.testStep[index].arg1.pageName);
		$scope.testStep[index].pageObject = null;
		$scope.testStep[index].arg2 = '';
		$scope.printTestSteps();
		createTestService.getPageObjectsByPageId()
		.then(function(appData) {
			$scope.testStep[index].pageObject = appData.list;
		})
		.catch(function(appData){
			console.log("Error in retrieving the page objects!!!::::"+appData);
			$scope.errorStatus = true;
			$scope.errorMessage = "Not getting any page objects";
		});
		
	};
	
	$scope.packageSelectionEvent = function(){
		$scope.configRequest = {};
		$scope.configRequest.app_id = $scope.app_id;
		//$scope.configRequest.group_id = $scope.safeUserData.userDetails.group_id;
		console.log("isPackageSelected::"+$scope.isPackageSelected);
		if($scope.isPackageSelected == true) {
			console.log("PackageSelected");
			createTestService.getTestsuiteByAppAndGroup()
			.then(function(appData) {
				$scope.packages = appData.testSuite;
			})
			.catch(function(appData){
				console.log("Error in retrieving the packages!!!::::"+appData);
				$scope.errorStatus = true;
				$scope.errorMessage = "Not getting any packages";
			}); 
		}
	}
	$scope.packageSelected = function() {
		console.log("Selected Package::"+$scope.configTestPackageId);
		createTestService.getTestsuiteConfiguration()
		.then(function(appData) {
			$scope.configParamList = appData.configList;
			console.log("Test Suite Configuration Info::"+$scope.configParamList);
			
		})
		.catch(function(appData){
			console.log("Error in retrieving the packages!!!::::"+appData);
			$scope.errorStatus = true;
			$scope.errorMessage = "Not getting any packages";
		});
	}
	/********Calling this function would reset the values on page*************/
	$scope.reset = function() {
		console.log("Resetting the values...");
		$scope.isApplicationSelected = false;
		$scope.loading = false;
		$scope.successStatus = false;
		$scope.errorMessage = null;
		$scope.errorStatus = false;
		$scope.testStep = [{keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''},
						   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''},
						   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''},
						   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''},
						   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''}
						   ];
		console.log("isApplicationSelected::"+$scope.isApplicationSelected);
		//$scope.printTestSteps();
	}
		//console.log("isLogged::::"+$rootScope.isLogged);
		if($rootScope.isLogged){
			//$scope.user = userId;
			current.safeUserData = $rootScope.safeUserData;
			console.log("Data in current::"+$rootScope.safeUserData.userDetails.first_name);
			
			$scope.createInitialize();
			$scope.getUserDetails();
			$rootScope.getAllApplications();
			$scope.getAllOperationNames();
			getPageNames();
			//loadConfigPackages();
			console.log("-----------------Initializing Complete--------------------");
			console.log("Application ID: " + $scope.app_id);
			console.log("Package ID: " + $scope.package_id);
			console.log("TestcaseDescrption Name: " + $scope.testCaseName);
			console.log("Testcase Description: " + $scope.testCaseDescription);

			$scope.intializing = false;
			console.log("IF isLogged::"+$rootScope.isLogged);
			$rootScope.isLogged = true;
		}
		if($rootScope.isLogged == false || $rootScope.isLogged == '') {
			console.log("ELSE isLogged::"+$rootScope.isLogged);
			$location.path('/dashboard');
		}
	//$scope.printTestSteps();
});
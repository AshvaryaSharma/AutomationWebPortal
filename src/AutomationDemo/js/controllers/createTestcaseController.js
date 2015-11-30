/*
	@Author :- Ajay Poshak, Ashvarya Sharma
	@Date :- 29 Nov 2015
	@Purpose :- This controller is responsible for createTestcase.html page.
*/
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
angular.module("safe-app")
	.controller('createTestcaseController', createTestcaseController);
/*
** @function createTestcaseController:- This is the controller for createTestcase.html
*/
	function createTestcaseController(createTestService, $scope, $http, $rootScope, SessionKeeper) {
		console.log("Inside createTestcaseController...");
		var current = $rootScope.current;
		if (!(current))
			current = $rootScope.current = SessionKeeper.read();
		console.log("Previous Controller::"+current.userDetails.first_name);
		
		$scope.safeOperationKeywords = [];
		$scope.safeOperationType = [];
		$scope.pageAction = 'create';
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
		/*
		** @function appSelectionEvent:- This function will be called when the user selects an application in view.
		*/
		$scope.appSelectionEvent = function() {
			$scope.isApplicationSelected = true;
			console.log("isApplicationSelected::"+$scope.isApplicationSelected);
		}
		/*
		**@function testNameChange:- This function will be called whenever the name in field of testCaseName has been changed.
		*/
		$scope.testNameChange = function() {		
			if($scope.testCaseName.length > 1) {
				$scope.isTestCaseNameSelected = true;
			}
			else {
				$scope.isTestCaseNameSelected = false;
			}
		}
		/*
		* @function createInitialize :- It initializes values of variables at the time of page load.
		*/
		function createInitialize(){

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
			
			$scope.editTestCase = false;
			$scope.testcaseObject = {
				package_id : null,
				testcase_id : null,
				testcase_name:'',
				testcase_description: '',
				teststeps:[{}]
			};

		}
		/*
		**@function getUserDetails :- It will get the user data from the service, if data is not already in either rootScope or 	session.
		*/
		function getUserDetails() {
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
		/*
		**@function addRowEvent:- This function will add a row in the table, whenever invoked from view.
		@param index:- It takes the index of row, after which a new row has to be added.
		*/
		$scope.addRowEvent = function(index){
			$scope.loading = true;
			console.log("Insert the element at::"+index);
			printTestSteps();
			$scope.testStep[$scope.testStep.length] = {keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''};
			var itr = 0;
			console.log("Length::"+$scope.testStep.length);
			for(itr = $scope.testStep.length-1; itr >= index; itr--) {
				console.log("itr::"+itr);
				$scope.testStep[itr] = $scope.testStep[itr-1];
			}
			$scope.testStep[index] = {keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''};
			console.log("New Length::"+$scope.testStep.length);
			printTestSteps();
			$scope.loading = false;
		}
		/*
		**@function removeRowEvent:- This function will remove a row from the table at view, whenever invoked from view.
		@param index:- It takes the index of row, which is to be deleted.
		*/
		$scope.removeRowEvent = function(index){
			console.log("Removing the row::"+index);
			$scope.loading = true;
			var itr = 0;
			for(itr=index; itr < $scope.testStep.length; itr++) {
				$scope.testStep[itr] = $scope.testStep[itr+1];
			}
			$scope.testStep.length = $scope.testStep.length - 1;
			console.log("Length of testSteps::"+$scope.testStep.length+" Array::"+$scope.testStep);
			printTestSteps();
			$scope.loading = false;
		}
		/*
		**@function printTestSteps:- This is only for debugging purpose, prints the value of testStep array
		*/
		function printTestSteps() {
			console.log(".........Printing the test steps......");
			var itr = 0;
			for(itr=0; itr < $scope.testStep.length; itr++) {
				console.log(" "+itr+ "Keyword::"+$scope.testStep[itr].keyword+" Type::"+$scope.testStep[itr].type+"PageObject::"+$scope.testStep[itr].pageObject);
			}
		}
		/*
		**@function getAllApplications :- It will get the data of all allowed applications for the user.
		@param user_id :- Using the user id, the list of allowed applications will be retrieved.
		*/
		function getAllApplications() {
			createTestService.getAppData()
			.then(function(appData) {
				$rootScope.current = $scope.safeAppData = appData;
				//console.log("Application Data::"+$rootScope.current.applicationList[0].app_name);
				//SessionKeeper.save();
			})
			.catch(function(appData){
				$scope.errorStatus = true;
				$scope.errorMessage = "Not able to get application data";
			});
		}
		/*
		**@function getAllOperationNames:- Gets the data of operations from services
		*/
		function getAllOperationNames() {
			createTestService.getOperationData()
			.then(function(operationData){
				$scope.safeOperationData = operationData;
				console.log("Operation Data::"+$scope.safeOperationData.operationList[0].keyword);
			})
			.catch(function(operationData){
				$scope.errorMessage = "Not able to get Operations List Available for application";
				$scope.errorStatus = true;
			});
		}
		/*
		**@function addOperation:- Add the operation selected on the view to the testStep array
		@param opSelected:- Operation selected in the view
		@param index:- Row Number on which the operation is selected in the view
		*/
		$scope.addOperation = function(opSelected, index) {
			$scope.operationSelected = opSelected;
			//console.log("opSelected::"+opSelected+"Index::"+index);
			$scope.testStep[index].keyword = $scope.operationSelected.keyword;
			$scope.testStep[index].type = $scope.operationSelected.type;
			console.log("Index::"+index+" Keyword::"+$scope.testStep[index].keyword+"Type::"+$scope.testStep[index].type);
			getOperationByName(index);
		}
		/*
		**@function getOperationByName:- Retrieve the data about the placeholders and arguments by determining the type of operation(UI or NONUI)
		@param index:- Row number of the row for which this data needs to be retrieved.
		*/
		function getOperationByName(index){
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
			printTestSteps();
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
		/*
		**@function loadPackages:- This function will be called from view, whenever the checkbox for including packages is selected.
		@param app_id:- Application id as selected by user in the view.
		@param group_id:- Group id of the logged user. 
		*/
		$scope.loadPackages = function(){
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
		/*
		**@function reset:- Calling this function would reset the values on page
		*/
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
		}
		/*
		**@function startApplication :- It is called at the time of page load. This is the first function to be called in this controller.
		*/
		function startApplication() {
			//$scope.user = userId;
			createInitialize();
			if(current.userDetails == null || current.userDetails == undefined){
				getUserDetails();
				console.log("Calling Services....");
			}
			else {
				$scope.safeUserData = current.userDetails;
			}
			getAllApplications();
			getAllOperationNames();
			getPageNames();
			console.log("-----------------Initializing Complete--------------------");
			console.log("Application ID: " + $scope.app_id);
			console.log("Package ID: " + $scope.package_id);
			console.log("TestcaseDescrption Name: " + $scope.testCaseName);
			console.log("Testcase Description: " + $scope.testCaseDescription);

			$scope.intializing = false;
		}
		startApplication();
		//$scope.printTestSteps();
		SessionKeeper.save();
};

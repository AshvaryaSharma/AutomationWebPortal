var app = angular.module('testCase',['ngSanitize', 'ui.select','ngTouch', 'angucomplete-alt']);

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


app.controller('testcaseController', function($scope,$http,$timeout, $interval,$rootScope) {

	$scope.startApplication = function(pageAction,testcaseId,userId) {
		console.log("Checking page action: " + pageAction)
		
		$scope.user = userId;
		
		if(pageAction=='create') {
			console.log("Page action is create");
			
			$scope.createInitialize();
			$scope.getUserDetails();
			$scope.getAllApplications();
			$scope.getAllOperationNames();
		} else if(pageAction == 'SaveAsNew') {
			
			$scope.saveInitialize();
			
			
			
			$scope.saveAsNewInitialize(testcaseId);
			/*$scope.getAllOperationNames();
			$scope.getAllApplications();*/
			
			
			
			
			
		} else if(pageAction == 'view') {
			
			$scope.saveInitialize();
			$scope.saveAsNewInitialize(testcaseId);
			$scope.viewTestcase = true;
			
		} else if(pageAction == 'edit') {
			$scope.saveInitialize();
			$scope.editInitialize(testcaseId);
			$scope.editTestCase = true;
			$scope.successMessage = "Test Case Updated Successfully"
			
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
		
		
		$http.post('../webservice/getTestcaseByTestcaseId',testcaseId)
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
		});
		
		
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
		
		$http.post('../webservice/getTestcaseByTestcaseId',testcaseId)
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
				
				
				$scope.setAndSelectApplication($scope.app_id);
				
				$scope.setAndSelectPackage(response.package_id);
				
				
				$scope.testcaseObject.testcase_id = null;
				
				
			})
			.error(function(){
				$scope.errorMessage = "Not able to get testcase for saving as new"
				$scope.errorStatus=true;
			})
			
		console.log("After Application id: " + $scope.app_id);
		console.log("After Package ID:" + $scope.package_id);
		
	}
	
	$scope.getUserDetails = function() {
		
		$http.get("../webservice/getLoggedUserDetails")
		.success(function (response) {
			$scope.userDetail = response.userDetails;
			
			$scope.testattr ="gotdata";
		})
		.error(function(response) {
			
			$scope.errorMessage = response.exceptionMessage;
			$scope.errorStatus = true;
		})
		
	}
	
	
	
	
	$scope.setAndSelectApplication = function(appId) {
		console.log("---------------Selecting and Setting Application ======> " + appId);
		$scope.app_id = appId;
		$scope.applicationSelectEvent();
		
	}
	
	
	$scope.setAndSelectPackage = function(packageId) {
		
		console.log("------------Setting and Selecting Package======> " + packageId);
		$scope.package_id = packageId;
		$scope.packageSelectEvent();
		
	}
	
	
$scope.saveInitialize = function(){
		
		$scope.intializing = true;
		$scope.viewTestcase = false;
		$scope.loading = false;
		$scope.successMessage = "Test Case Created Successfully";
		$scope.successStatus = false;
		$scope.isApplicationSelected = false;
		$scope.errorMessage = null;
		$scope.errorStatus = false;
		/*$scope.applications = [{}];*/
		$scope.applications = [{}];
		$scope.testattr = "test";
		/*$scope.app_id=null;*/
		$scope.packages = [{}];
		/*$scope.package_id = "";*/
		$scope.applicationsLoaded = false;
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
	
	
	$scope.createInitialize = function(){
		
		$scope.intializing = true;
		$scope.viewTestcase = false;
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
		$scope.tempTestStep = {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''};
		$scope.testStep = [{keyword:'',arg1:null,arg2: null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                  
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
		                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''}
		                   ];
		$scope.editTestCase = false;
		$scope.testcaseObject = {
				app_id : null,
				testcase_id : null,
				testcase_name:'',
				testcase_description: '',
				teststeps:[{}]
		};
		
	}
	
	
	$scope.getAllApplications = function() {
		console.log("---------GETTING ALL APPLICATIONS-----------");
		
		$http.post("../webservice/findApplicationsByUserId",$scope.user)
			.success(function (response) {
				$scope.applications = response.applicationList;
				$scope.intializing = false;
				$scope.testattr ="gotdata";
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get application data";
				$scope.errorStatus = true;
			})
			
	}
	
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
		    $scope.person.selected = undefined;
		    
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
	  
	  $scope.operation = {};
	  
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
	$scope.operatorSelectEvent = function(rowNumber,flag) {
		
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
		
		if($scope.testStep[i].operation.keyword == '') {
			
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
			$scope.testStep[i].pageObject = null;
			
			
			
		} else if($scope.testStep[i].operation.type == 'NONUI')  {
			$scope.testStep[i].pageObject = null;
			
			$http.post("../webservice/getNonUiOperationByName",$scope.testStep[i].operation.keyword)
			.success(function(response){
				
				$scope.testStep[i].arg1_ph = response.operation.arg1;
				$scope.testStep[i].arg2_ph = response.operation.arg2;
				$scope.testStep[i].arg3_ph = response.operation.arg3;
				$scope.testStep[i].arg4_ph = response.operation.arg4;
				$scope.testStep[i].arg5_ph = response.operation.arg5;
				
				if(flag) {
					$scope.testStep[i].arg1 = null;
					$scope.testStep[i].arg2 = null;
					$scope.testStep[i].arg3 = null;
					$scope.testStep[i].arg4 = null;
					$scope.testStep[i].arg5 = null;
					$scope.testStep[i].pageObject = null;
				}
				$scope.testattr="Success for: " + temp.keyword + $scope.testStep[i].arg1_ph + $scope.testStep[i].arg2_ph + $scope.testStep[i].arg3_ph + $scope.testStep[i].arg4_ph + $scope.testStep[i].arg5_ph;
			})
			.error(function(){
				$scope.errorMessage = "Not able to get operation value"
				$scope.errorStatus= true;
				$scope.testattr = "Error for:" + temp.keyword;
			})
		} else if($scope.testStep[i].operation.type == 'UI')  {
			
			$http.post("../webservice/getUiOperationByName",$scope.testStep[i].operation.keyword)
			.success(function(response){
				
				$scope.testStep[i].arg1_ph = '';
				$scope.testStep[i].arg2_ph = '';
				$scope.testStep[i].arg3_ph = response.operation.arg1;
				$scope.testStep[i].arg4_ph = response.operation.arg2;
				$scope.testStep[i].arg5_ph = response.operation.arg3;
				
				if(flag) {
					$scope.testStep[i].arg1 = null;
					$scope.testStep[i].arg2 = null;
					$scope.testStep[i].arg3 = null;
					$scope.testStep[i].arg4 = null;
					$scope.testStep[i].arg5 = null;
				}
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
		
		$http.get("../webservice/getAllOperationNames")
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
		$scope.isApplicationSelected = true
		if($scope.app_id == "") {
			$scope.app_id = null;
			$scope.packages = [{}];
			
			$scope.isApplicationSelected = false;
			
		}
		
		$scope.loadApplicationPageNames();
		$scope.loadConfigPackages();
		
		$scope.loading = false;
	}
	
	
	$scope.loadApplicationPageNames = function() {
		
		$scope.loading = true;
		
		
		if($scope.app_id != null)
			{
			$http.post("../webservice/allPageNamesByApplication",$scope.app_id)
			 .success(function(response) {
				$scope.pageNames = response.pageNames;
				$scope.testattr = "getPackages";
			 })
			 .error(function(response) {
				 $scope.errorMessage = response.exceptionMessage;
				 $scope.errorStatus= true;
				
			 })
			
			}
		
		
		
		$scope.loading = false;
		
	}
	
	
	
	$scope.pageNameSelectEvent = function(rowNumber) {
		
		console.log("::::GETTING PageName PAGE OBJECTS");
		$scope.loading = true;
		
		$scope.testStep[rowNumber].pageObject = null;
		$scope.testStep[rowNumber].arg2 = '';
		
		/*var pageId = null;
		
		for(i=0 ; i < $scope.pageNames.length; i++) {
			
			if($scope.pageNames[i].pageName == $scope.testStep[rowNumber].arg1) {
				
				pageId = $scope.pageNames[i].pageid;
				break;
			}
			
		}*/
		console.log(":::::PAGE ID::::" + $scope.testStep[rowNumber].arg1.pageid);
		
		$http.post("../webservice/getPageObjectsByPageId",$scope.testStep[rowNumber].arg1.pageid)
		 .success(function(response) {
			 $scope.testStep[rowNumber].pageObject = response.list;
			$scope.testattr = "getPackages";
		 })
		 .error(function(response) {
			 $scope.errorMessage = response.exceptionMessage;
			 $scope.errorStatus= true;
			
		 })
		 
		 $scope.loading = false;
		
		}
		
	
	
	
	$scope.loadConfigPackages = function() {
		
		if($scope.app_id == null) {
			$scope.packages = null; 
		} else {
			
			$scope.configRequest = {};
			$scope.configRequest.app_id = $scope.app_id;
			$scope.configRequest.group_id = $scope.userDetail.groupId;
			
			$http.post("../webservice/getTestsuiteByAppAndGroup",$scope.configRequest)
			 .success(function(response) {
				$scope.packages = response.testSuite;
				$scope.testattr = "getPackages";
				$scope.applicationsLoaded = true;
				$scope.isApplicationSelected = true;
			 })
			 .error(function() {
				 $scope.errorMessage ="Not able to get any package for Application Selected"
				 $scope.errorStatus= true;
				$scope.testattr= "packageerror";
			 })
			
		}
		
	}
	
	$scope.packageSelectEvent = function() {
		$scope.loading = true;
		
		console.log("----------Package Select Event for Package =======> " + $scope.configTestPackageId);
		if($scope.configTestPackageId == "") {
			$scope.isPackageSelected = false;
			$scope.package_id = null;
			$scope.configParamList = null;
			
		} else {
			
			
			
			$http.post("../webservice/getTestsuiteConfiguration",$scope.configTestPackageId)
			 .success(function(response) {
				 console.log(":::: GOT SUCCESS:::::")
				$scope.configParamList = response.configList;
				$scope.testattr = "getPackages";
				$scope.applicationsLoaded = true;
				$scope.isApplicationSelected = true;
			 })
			 .error(function(response) {
				 $scope.errorMessage = response.exceptionMessage;
				 $scope.errorStatus= true;
				$scope.testattr= "packageerror";
			 })
			 
			 
			$scope.isPackageSelected = true;
			
		}
		
		$scope.loading = false;
	}
	
	$scope.getAllPackagesByApplicationId = function() {
		$scope.loading = true;
			$scope.testattr = "checking package";
		
		$http.post("../webservice/findpackagebyapplicationid",$scope.app_id)
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
	
	/*$scope.addRowEvent = function(rowNum){
		$scope.loading = true;
		var temp = $scope.tempTestStep;
		
		temp.step_num = rowNum + 1;
		$scope.testStep.splice(rowNum,0,temp);
		for(var i=0;i < $scope.testStep.length; i++) {
			
			$scope.testStep[i].step_num = i+1;
			
		}
		
		$scope.loading = false;
	}*/
	
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
			
			if($scope.editTestCase) {
				
				$http.post("../webservice/updateTestCase", $scope.testcaseObject)
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
				
			} else {
				
				$http.post("../webservice/addNewTestCase", $scope.testcaseObject)
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
			                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
			                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
			                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
			                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
			                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''},
			                   {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:''}
			                   ];
			
			$scope.testcaseObject = {
					app_id : null,
					testcase_id : null,
					testcase_name:'',
					testcase_description: '',
					teststeps:[{}]
			};
		
		
	}
	
	$scope.addRowEvent = function(index){
		$scope.loading = true;
		console.log("Insert the element at::"+index);
		
		$scope.testStep[$scope.testStep.length] = {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''};
		var itr = 0;
		console.log("Length::"+$scope.testStep.length);
		for(itr = $scope.testStep.length-1; itr > index; itr--) {
			console.log("itr::"+itr);
			$scope.testStep[itr] = $scope.testStep[itr-1];
		}
		$scope.testStep[index+1] = {keyword:'',arg1:null,arg2:null,arg3:null,arg4:null,arg5:null,arg1_ph:'',arg2_ph:'',arg3_ph:'',arg4_ph:'',arg5_ph:'', pageObject:''};
		console.log("New Length::"+$scope.testStep.length);
		
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
		
		$scope.loading = false;
	}
	
	
	$scope.createTestcaseObject = function() {
		
		$scope.testcaseObject.app_id = $scope.app_id;
		$scope.testcaseObject.testcase_name = $scope.testCaseName;
		$scope.testcaseObject.testcase_description = $scope.testCaseDescription;
		
		for(var i=0; i < $scope.testStep.length; i++) {
			
			
			if(i>0) {
				$scope.testcaseObject.teststeps.push({});
			}
			
			$scope.testcaseObject.teststeps[i].keyword = $scope.testStep[i].operation.keyword;
			$scope.testcaseObject.teststeps[i].type = $scope.testStep[i].operation.type;
			$scope.testcaseObject.teststeps[i].stepNo = i+1;
			
			if($scope.testStep[i].operation.type == 'UI') {
				$scope.testcaseObject.teststeps[i].arg1 = $scope.testStep[i].arg1.pageid;
				$scope.testcaseObject.teststeps[i].arg2 = $scope.testStep[i].arg2.pageObjectId;
			} else if($scope.testStep[i].operation.type == 'NONUI') {
				
				if($scope.testStep[i].arg1.title == undefined) {
					$scope.testcaseObject.teststeps[i].arg1 = $scope.testStep[i].arg1.originalObject;
				} else {
					$scope.testcaseObject.teststeps[i].arg1 = "{Config{" +$scope.testStep[i].arg1.title +"}}";
				}
				
				
				if($scope.testStep[i].arg2.title == undefined) {
					$scope.testcaseObject.teststeps[i].arg2 = $scope.testStep[i].arg2.originalObject;
				} else {
					$scope.testcaseObject.teststeps[i].arg2 = "{Config{" +$scope.testStep[i].arg2.title+"}}";
				}
				
			}
			
			if($scope.testStep[i].arg3 != null) {
				if($scope.testStep[i].arg3.title == undefined) {
					$scope.testcaseObject.teststeps[i].arg3 = $scope.testStep[i].arg3.originalObject;
				} else {
					$scope.testcaseObject.teststeps[i].arg3 = "{Config{" +$scope.testStep[i].arg3.title+"}}";
				}
			}
			
			if($scope.testStep[i].arg4 != null) {
				if($scope.testStep[i].arg4.title == undefined) {
					$scope.testcaseObject.teststeps[i].arg4 = $scope.testStep[i].arg4.originalObject;
				} else {
					$scope.testcaseObject.teststeps[i].arg4 = "{Config{" +$scope.testStep[i].arg4.title+"}}";
				}
			}
			
			if($scope.testStep[i].arg5 != null) {
				
				if($scope.testStep[i].arg5.title == undefined) {
					$scope.testcaseObject.teststeps[i].arg5 = $scope.testStep[i].arg5.originalObject;
				} else {
					$scope.testcaseObject.teststeps[i].arg5 = "{Config{" +$scope.testStep[i].arg5.title+"}}";
				}
				
			}
			
			
			
		}
		
	}
	
	
	$scope.check = function() {
		$scope.loading = true;
		
		console.log("#####--STARTING CHECK--#####");
		console.log("#####--Checking for application id--##### " + $scope.app_id);
		console.log("#####--Checking for package id--##### " + $scope.package_id);
		console.log("#####--Checking for Testcase Name--##### " + $scope.testCaseName);
		console.log("#####--Checking for Testcase Description--##### " + $scope.testCaseDescription);
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
				console.log("####--Checking for Keyword--#### " + $scope.testStep[i].keyword);
				console.log("####--Checking for arg1--#### " + $scope.testStep[i].arg1);
				console.log("####--Checking for arg2--#### " + $scope.testStep[i].arg2);
				console.log("####--Checking for arg3--#### " + $scope.testStep[i].arg3);
				console.log("####--Checking for arg4--#### " + $scope.testStep[i].arg4);
				console.log("####--Checking for arg5--#### " + $scope.testStep[i].arg5);
				if($scope.testStep[i].operation == undefined || $scope.testStep[i].operation.keyword == "") {
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
	
	
	
	
});
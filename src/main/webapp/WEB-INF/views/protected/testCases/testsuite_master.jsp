<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Automation Tool</title>
    
    

    <!-- Bootstrap Core CSS -->
    <link href="../resources/themes/bowerTheme/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../resources/themes/bowerTheme/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../resources/themes/bowerTheme/dist/css/sb-admin-2.css" rel="stylesheet">
	
  <link rel="stylesheet" href="../resources/themes/bowerTheme/ui-select-master/dist/select.css">
  
   <!-- Select2 theme -->
  <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.css">

	<!-- Angucomplete theme -->
  <link rel="stylesheet" href="../resources/themes/bowerTheme/angucomplete-alt-master/angucomplete-alt.css">
	
  <!--
    Selectize theme
    Less versions are available at https://github.com/brianreavis/selectize.js/tree/master/dist/less
  -->
  <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.default.css">
	
   <!--  Custom Fonts -->
    <link href="../resources/themes/bowerTheme/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	 <link href="../resources/themes/bowerTheme/dist/css/tech-m.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body ng-app="testsuitemaster" ng-controller="testsuiteMasterController">
	 <div id="wrapper">
        <!-- Page Content -->
       <div id="page-wrapper">
       	<div class="container-fluid">
       		<div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Test Suite - Add / Edit Testcases</h1>
                    </div>
                    <!-- /.col-lg-12 -->
             </div>
       		<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								Test Suite Details
							</div>
							<div class="panel-body">
								<form role="form">
									<div class="row" ng-show="intializing || loading">
										<div class="col-lg-12">
											<center><img src="../resources/images/loading.gif" alt="Loading" height = "20" width="20"></center>
										
										</div>
									
									
									</div>
								
									<div class="row" ng-show="errorStatus">
										<div class="col-lg-12">
											<div class="alert alert-danger">
												{{errorMessage}}
						
											</div>
										
										</div>
									
									
									</div>
									
									<div class="row" ng-show="successStatus">
										<div class="col-lg-12">
											<div class="alert alert-success">
												{{successMessage}}
						
											</div>
										
										</div>
									
									
									</div>
									<div class="row" ng-show="selectApplication">
										<div class="col-lg-6">
											<div class="row">
												<div class="col-lg-12">
													<label>Select the Application</label>
													<select name="application" id="application" ng-model="app_id" class="form-control" ng-change="applicationSelectEvent()" ng-disabled="loading || intializing">
															<option value="">Select the application</option>
															<option ng-repeat="x in applications" value="{{x.app_id}}" ng-selected="{{x.app_id == app_id}}">{{x.app_name}}</option>
														</select>
												</div>
											</div>
											<br>
											<div class="row">
												<div class="col-lg-12" ng-show="applicationSelected">
													<label>Test Suite Name</label>
													<select name="testsuite" id="testsuite" ng-model="testsuite_id" class="form-control" ng-change="testsuiteSelectEvent()" ng-disabled="loading || intializing">
															<option value="">Select the Testsuites</option>
															<option ng-repeat="x in testsuites" value="{{x.testsuite_id}}" ng-selected="{{x.testsuite_id == testsuite_id}}">{{x.testsuite_name}}</option>
														</select>
												</div>
											</div>
										</div>
										<br>
										<div class="col-lg-6" ng-show="testsuiteSelected">
											<button type="button" class="btn btn-default" ng-click="testsuiteAdd()"  ng-disabled="loading">Add</button>
											<button type="button" class="btn btn-default" ng-click="testsuiteEdit()"  ng-disabled="loading">Edit</button>
												
										</div>
									</div>
							
									<div class="row" ng-show="addEvent">
										
									
										<div class="col-lg-12">
											<h2>Select Test Cases to be Added in Testsuite: <label>{{selectedTestSuite.testsuite_name}}</label></h2>
											<br><br>
												<table class="table table-striped table-bordered">
															<thead>
																<tr>
																	<th><input type="checkbox" ng-model="isAddAllTestcasesChecked" ng-change="toggleAddAllTestcases()" ></th>
																	<th>Testcase Name</th>
																	<th>Testcase Description</th>
																	
																	
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="row in testcases">
																	<td>  <input type="checkbox" checklist-model="testcasesTobeAdded.id" checklist-value="row.testcase_id" ></td>
																	
																	<td>
																		{{row.testcase_name}}
																	</td>
																	<td>
																		{{row.testcase_description}}
																	</td>
																	
																	
																</tr>
															</tbody>
														</table>
											<br><br>
											<button type="button" class="btn btn-default" ng-click="testsuiteTestcaseSelectAdd()"  ng-disabled="loading">Add</button>
											<button type="button" class="btn btn-default" ng-click="testsuiteTestCaseSelectBack()"  ng-disabled="loading">Back</button>
											 
										</div>
									</div>
									<div class="row" ng-show="addEventTestcaseSelected">
										<div class="col-lg-12">
											<div class="row">
												<div class="col-lg-12">
													<h2>Testsuite: <label>{{selectedTestSuite.testsuite_name}}</label></h2>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-12">
													<b><h4>Enter Test Level Parameters:</h4></b>
												</div>
											</div>
											<br>
											<div class="row">
												<div class="col-lg-12">
													<table class="table table-striped table-bordered">
														<thead>
															<tr>
															<th><label>TestcaseName<br>Browser</label></th>
															<th><label>Param1 Name<br>Param1 Value</label></th>
															<th><label>Param2 Name<br>Param2 Value</label></th>
															<th><label>Param3 Name<br>Param3 Value</label></th>
															<th><label>Param4 Name<br>Param4 Value</label></th>
															<th><label>Param5 Name<br>Param5 Value</label></th>
															</tr>
														</thead>
														<tbody>
															<tr  ng-repeat="row in testCasesSelectedToBeAdded">
																<td>
																	<label>Testcase Name:  </label> {{row.testcase_name}}
																	<br><br>
																	<select name="browser" id="broser" ng-model="row.browser" class="form-control" ng-disabled="loading || intializing">
																		<option value="">Select the Browser</option>
																		<option value="IE">IE</option>
																		<option value="FIREFOX">Firefox</option>
																		<option value="CHROME">Chrome</option>
																		<option value="SAFARI">Safari</option>
																		<option value="OPERA">Opera</option>
																	</select>
																</td>
																<td>
																	<input class="form-control" ng-model="row.param1_name" placeholder="Enter Parameter1 Name">
																	<br>
																	<input class="form-control" ng-model="row.param1_value" placeholder="Enter Parameter1 Value">
																</td>
																<td>
																	<input class="form-control" ng-model="row.param2_name" placeholder="Enter Parameter2 Name">
																	<br>
																	<input class="form-control" ng-model="row.param2_value" placeholder="Enter Parameter2 Value">
																</td>
																<td>
																	<input class="form-control" ng-model="row.param3_name" placeholder="Enter Parameter3 Name">
																	<br>
																	<input class="form-control" ng-model="row.param3_value" placeholder="Enter Parameter3 Value">
																</td>
																<td>
																	<input class="form-control" ng-model="row.param4_name" placeholder="Enter Parameter4 Name">
																	<br>
																	<input class="form-control" ng-model="row.param4_value" placeholder="Enter Parameter4 Value">
																</td>
																<td>
																	<input class="form-control" ng-model="row.param5_name" placeholder="Enter Parameter5 Name">
																	<br>
																	<input class="form-control" ng-model="row.param5_value" placeholder="Enter Parameter5 Value">
																</td>
															</tr>
														</tbody>
													</table>
													<br><br>
													<button type="button" class="btn btn-default" ng-click="addTestcasesToTestsuite()" ng-disabled="loading">Add Testcases</button>
													<button type="button" class="btn btn-default" ng-click="backTestcasesToTestsuite()"  ng-disabled="loading">Back</button>
													<button type="button" class="btn btn-default" ng-click="resetTestcasesToTestsuite()"  ng-disabled="loading">Reset</button>
											
												</div>
												
											</div>
										</div>
									</div>
									
									<div class="row" ng-show="editTestcasesForTestsuite">
										<div class="col-lg-12">
											<div class="row">
												<div class="col-lg-12">
													<h2>Testsuite: <label>{{selectedTestSuite.testsuite_name}}</label></h2>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-12">
													<b><h4>Enter Test Level Parameters:</h4></b>
												</div>
											</div>
											<br>
											<div class="row">
												<div class="col-lg-12">
													<table class="table table-striped table-bordered">
														<thead>
															<tr>
															<th><label>TestcaseName<br>Browser</label></th>
															<th><label>Param1 Name<br>Param1 Value</label></th>
															<th><label>Param2 Name<br>Param2 Value</label></th>
															<th><label>Param3 Name<br>Param3 Value</label></th>
															<th><label>Param4 Name<br>Param4 Value</label></th>
															<th><label>Param5 Name<br>Param5 Value</label></th>
															</tr>
														</thead>
														<tbody>
															<tr  ng-repeat="row in testCasesSelectedToBeAdded">
																<td>
																	<label>Testcase Name:  </label> {{row.testcase_name}}
																	<br><br>
																	<select name="browser" id="browser" ng-model="row.browser" class="form-control" ng-disabled="loading || intializing">
																		<option value="">Select the Browser</option>
																		<option value="IE">IE</option>
																		<option value="FIREFOX">Firefox</option>
																		<option value="CHROME">Chrome</option>
																		<option value="SAFARI">Safari</option>
																		<option value="OPERA">Opera</option>
																	</select>
																</td>
																<td>
																	<input class="form-control" ng-model="row.param1_name" placeholder="Enter Parameter1 Name">
																	<br>
																	<input class="form-control" ng-model="row.param1_value" placeholder="Enter Parameter1 Value">
																</td>
																<td>
																	<input class="form-control" ng-model="row.param2_name" placeholder="Enter Parameter2 Name">
																	<br>
																	<input class="form-control" ng-model="row.param2_value" placeholder="Enter Parameter2 Value">
																</td>
																<td>
																	<input class="form-control" ng-model="row.param3_name" placeholder="Enter Parameter3 Name">
																	<br>
																	<input class="form-control" ng-model="row.param3_value" placeholder="Enter Parameter3 Value">
																</td>
																<td>
																	<input class="form-control" ng-model="row.param4_name" placeholder="Enter Parameter4 Name">
																	<br>
																	<input class="form-control" ng-model="row.param4_value" placeholder="Enter Parameter4 Value">
																</td>
																<td>
																	<input class="form-control" ng-model="row.param5_name" placeholder="Enter Parameter5 Name">
																	<br>
																	<input class="form-control" ng-model="row.param5_value" placeholder="Enter Parameter5 Value">
																</td>
															</tr>
														</tbody>
													</table>
													<br><br>
													<button type="button" class="btn btn-default" ng-click="updateTestcasesToTestsuite()" ng-disabled="loading">Update Testcases</button>
													<button type="button" class="btn btn-default" ng-click="backTestcasesToTestsuiteOnEdit()"  ng-disabled="loading">Back</button>
													<!-- <button type="button" class="btn btn-default" ng-click="resetTestcasesToTestsuiteOnEdit()"  ng-disabled="loading">Reset</button> -->
											
												</div>
												
											</div>
										</div>
									</div>
									
									<div class="row" ng-show="listEditTestcasesForTestsuite">
										
									
										<div class="col-lg-12">
											<h2>Select Test Cases to be Edit in Testsuite: <label>{{selectedTestSuite.testsuite_name}}</label></h2>
											<br><br>
												<table class="table table-striped table-bordered">
															<thead>
																<tr>
																	<th><input type="checkbox" ng-model="isEditAllTestcasesChecked" ng-change="toggleEditAllTestcases()" ></th>
																	<th>Testcase Name</th>
																	<th>Testcase Description</th>
																	
																	
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="row in editTestcasesList">
																	<td>  <input type="checkbox" checklist-model="testcasesTobeEdit.id" checklist-value="row.testcase.testcase_id" ></td>
																	
																	<td>
																		{{row.testcase.testcase_name}}
																	</td>
																	<td>
																		{{row.testcase.testcase_description}}
																	</td>
																	
																	
																</tr>
															</tbody>
														</table>
											<br><br>
											<button type="button" class="btn btn-default" ng-click="testsuiteTestcaseSelectUpdate()"  ng-disabled="loading">Update</button>
											<button type="button" class="btn btn-default" ng-click="testsuiteTestCaseDelete()"  ng-disabled="loading">Delete</button>
											
											<button type="button" class="btn btn-default" ng-click="testsuiteTestCaseSelectEditBack()"  ng-disabled="loading">Back</button>
											 
										
									</div>
									
								</form>
							</div>
						</div>
					</div>
				</div>
       	</div>
       </div>
      </div>
     
</body>
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js">
      </script>
      
      <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.6/angular-touch.min.js"></script>
      <!-- Select Sanitize CSS -->
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular-sanitize.js"></script>
	<script src="../resources/userJs/Checklist-model.js"></script>
    <script src="../resources/userJs/testsuite_master.js"></script>

</html>
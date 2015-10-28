<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

 

    <!-- Bootstrap Core CSS -->
    <link href="../resources/themes/bowerTheme/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../resources/themes/bowerTheme/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../resources/themes/bowerTheme/dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../resources/themes/bowerTheme/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	 <link href="../resources/themes/bowerTheme/dist/css/tech-m.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">

        
        <!-- Page Content -->
       <div id="page-wrapper" ng-app="testCase" ng-controller="testcaseController">
       	<div class="container-fluid">
       		<div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Create Test Case</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
       			<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								Enter Test Case Details
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
									
									<div class="row">
										<div class="col-lg-6">
											<div class="row" ng-hide="intializing">
												<div class="col-lg-12">
													
														<label>Select Application</label>
												
														<select name="application" id="application" ng-model="app_id" class="form-control" ng-change="applicationSelectEvent()" ng-disabled="loading">
															<option value="">Select the application</option>
															<option ng-repeat="x in applications" value="{{x.app_id}}">{{x.app_name}}</option>
														</select>
													
													
												</div>
											</div>
											<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-12">
													<label>Select Package</label>
														<select name="package" id="package" ng-model="package_id" class="form-control" ng-change="packageSelectEvent()" ng-disabled="loading">
															<option value="" ng-selected="applicationsLoaded">Select Package</option>
															<option ng-repeat="n in packages" value="{{n.package_id}}">{{n.package_name}}</option>
													
														</select>
												</div>
											</div>
											<div class="row" ng-show="isPackageSelected">
												<div class="col-lg-12">
													<label>Enter Test Case Name</label>
													<input class="form-control" placeholder="Enter Test Case Name" ng-model="testCaseName"  ng-disabled="loading">
												</div>
											
											</div>
											
										</div>
										<div class="col-lg-6">
											<div class="row" ng-show="isPackageSelected">
												<div class="col-lg-12">
													<label>Test Case Description</label>
													<textarea class="form-control" placeholder="Enter Test Case Description" rows="7" ng-model="testCaseDescription"  ng-disabled="loading"></textarea>
												</div>
											</div>
										</div>
									</div>
									<br>
									<div class="row" ng-show="isPackageSelected">
										<div class="col-lg-12">
											<div class="panel panel-default">
												<div class="panel-heading">
													Enter Test Case Steps
												</div>
												<div class="panel panel-body">
													<div class="table-responsive">
														<table class="table table-striped">
															<thead>
																<tr>
																	<th>#</th>
																	<th>Keyword</th>
																	<th>ARG1</th>
																	<th>ARG2</th>
																	<th>ARG3</th>
																	<th>ARG4</th>
																	<th>ARG5</th>
																	<th>+/-</th>
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="row in testStep">
																	<td> <!-- <input type="hidden" ng-model="row.step_num" value="{{testStep.indexOf(row)}}" /> --> {{testStep.indexOf(row) + 1}}</td>
																	
																	<td>
																		<select name="operation" id="operation" class="form-control" ng-model="row.keyword" ng-change="operatorSelectEvent(testStep.indexOf(row))"  ng-disabled="loading">
																			<option value="">-------</option>
																			<option ng-repeat="oprtn in operationNames" value="{{oprtn}}">{{oprtn}}</option>
																		</select>
																	</td>
																	<td>
																		<input class="form-control" placeholder="{{row.arg1_ph}}" ng-model="row.arg1" ng-disabled="(row.arg1_ph =='') || (row.arg1_ph=='NA') || loading">
																	</td>
																	<td>
																		<input class="form-control" placeholder="{{row.arg2_ph}}" ng-model="row.arg2" ng-disabled="(row.arg2_ph =='') || (row.arg2_ph=='NA') || loading">
																	</td>
																	<td>
																		<input class="form-control" placeholder="{{row.arg3_ph}}" ng-model="row.arg3" ng-disabled="(row.arg3_ph =='') || (row.arg3_ph=='NA') || loading">
																	</td>
																	<td>
																		<input class="form-control" placeholder="{{row.arg4_ph}}" ng-model="row.arg4" ng-disabled="(row.arg4_ph =='') || (row.arg4_ph=='NA') || loading">
																	</td>
																	<td>
																		<input class="form-control" placeholder="{{row.arg5_ph}}" ng-model="row.arg5" ng-disabled="(row.arg5_ph =='') || (row.arg5_ph=='NA') || loading">
																	</td>
																	<td>
																		<button type="button" class="btn btn-default btn-circle btn-xs" ng-click="addRowEvent(testStep.indexOf(row) + 1)" ng-disabled="loading"><i class="fa fa-plus-circle"></i></button>
																		<button type="button" class="btn btn-default btn-circle btn-xs"  ng-click="removeRowEvent(testStep.indexOf(row) + 1)"  ng-disabled="loading"><i class="fa fa-minus-circle"></i></button>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
																		
									</div>
									<div class="row">
										
										<div class="col-lg-6">
											<button type="button" class="btn btn-default" ng-click="submitTestcase()"  ng-disabled="loading">Create</button>
											<button type="reset" class="btn btn-default" ng-click="resetAll()"  ng-disabled="loading">Reset</button>
										</div>
									
									</div>
									
								</form>
							</div>
							
						</div>
					</div>
				</div>	
       	
       	</div>
       
       
       </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js">
      </script>
    <!-- <script src="../resources/userJs/operationKeywords/app.js"></script>
    <script src="../resources/userJs/operationKeywords/app_controller.js"></script>
    <script src="../resources/userJs/operationKeywords/keyword_service.js"></script> -->
    <script src="../resources/userJs/TestCase.js"></script>

</body>

</html>

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

    <title>Automation Tool</title>

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
       <div id="page-wrapper" ng-app="viewTestCase" ng-controller="viewTestcaseController">
       	<div class="container-fluid">
       		<div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">View Test Cases</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
       			<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								Test Cases Details
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
											
											
											
										</div>
										
									</div>
									<br>
									<div class="row" ng-show="isApplicationSelected && (testcases.length > 0)">
										<div class="col-lg-12">
											<div class="panel panel-default">
												<div class="panel-heading">
													Test case details for Selected package
												</div>
												<div class="row">
													<div class="col-lg-12">
													<div class="table-responsive">
														<table class="table table-striped table-bordered">
															<col style="width:5%">
															<col style="width:30%">
															<col style="width:45%">
															<col style="width:20%">
															<thead>
																<tr>
																	<th><input type="checkbox" ng-model="isDeleteAllChecked" ng-change="toggleDeleteAll()" ></th>
																	<th>Test Case Name</th>
																	<th>Test Case Description</th>
																	<th>Edit/View/Save As New</th>
																	
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="row in testcases">
																	<td> <input type="checkbox" checklist-model="testcasesTobeDeleted.id" checklist-value="row.testcase_id" > </td>
																	
																	<td>
																		{{row.testcase_name}}
																	</td>
																	<td>
																		{{row.testcase_description}}
																	</td>
																	
																	<td>
																		<a href="editTestCase?id={{row.testcase_id}}" ng-click="">Edit</a> |
																		<a href="view?id={{row.testcase_id}}" ng-click="">View</a> |
																		<a href="saveAs?id={{row.testcase_id}}" ng-click="">Save As New</a>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
												</div>
											</div>
										</div>
										
												<!-- {{testcasesTobeDeleted}} -->						
									</div>
									<div class="row">
										
										<div class="col-lg-6">
											<button type="button" class="btn btn-default" ng-click="deleteTestcases()"  ng-disabled="loading || testcasesTobeDeleted.id.length==0">Delete</button>
											<button type="reset" class="btn btn-default" ng-click="reset()"  ng-disabled="loading">Reset</button>
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

    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js">
      </script>
    
    <script src="../resources/userJs/Checklist-model.js"></script>
    <script src="../resources/userJs/ViewTestCase.js"></script>
	
</body>

</html>

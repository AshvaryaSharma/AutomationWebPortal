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
<body ng-app="testsuite" ng-controller="testsuiteController">
	 <div id="wrapper">
        <!-- Page Content -->
       <div id="page-wrapper">
       	<div class="container-fluid">
       		<div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Create Edit Test Suite</h1>
                    </div>
                    <!-- /.col-lg-12 -->
             </div>
       		<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								New Test Suite Details
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
											<div class="row">
												<div class="col-lg-12">
													<label>Select the Aplication</label>
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
													<input class="form-control" placeholeder="enter Test suite Name" ng-model="updateTestSuite.testsuite_name" ng-disabled="loading">
												</div>
											</div>
										</div>
										<div class="col-lg-6" ng-show="applicationSelected">
											<label>Test Suite Description</label>
											<textarea class="form-control" placeholder="Enter Test Suie Description" rows="7" ng-model="updateTestSuite.testsuite_description"  ng-disabled="loading"></textarea>
												
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6"  ng-show="applicationSelected">
											<button type="button" class="btn btn-default" ng-click="testsuiteCreateEdit()"  ng-disabled="loading">{{button}}</button>
											<button type="button" class="btn btn-default" ng-click="resetTestsuite()"  ng-disabled="loading">Reset</button>
													
										</div>
									</div>
									<br><br>
									<div class="row" ng-show="applicationSelected">
										<div class="col-lg-12">
											<div class="panel panel-default">
												<div class="panel-heading">
													Edit | Delete - Test Suite Information
												</div>
											</div>
											<div class="panel panel-body">
												<table class="table table-striped table-bordered">
															<thead>
																<tr>
																	<th>#</th>
																	<th>Testcase Name</th>
																	<th>Testcase Description</th>
																	<th>Edit/Delete</th>
																	
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="row in testsuites">
																	<td>  {{$index + 1}}</td>
																	
																	<td>
																		{{row.testsuite_name}}
																	</td>
																	<td>
																		{{row.testsuite_description}}
																	</td>
																	
																	<td>
																		<button type="button" class="btn btn-default" ng-click="edit(row.testsuite_id)" ng-disabled="loading">Edit</button>
																		<button type="button" class="btn btn-default"  ng-click="remove(row.testsuite_id)"  ng-disabled="loading">Delete</button>
																	</td>
																</tr>
															</tbody>
														</table>
											</div>
										</div>
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
    <script src="../resources/userJs/testsuite.js"></script>

</html>
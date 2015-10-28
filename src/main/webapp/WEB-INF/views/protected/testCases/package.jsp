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
       <div id="page-wrapper" ng-app="package" ng-controller="packageController">
       	<div class="container-fluid">
       		<div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Package</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
       			<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								Package Details
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
									
									<div class="row" ng-hide="intializing">
										<div class="col-lg-6">
										
											<div class="row">
												<div class="col-lg-12">
													
														<label>Select Package</label>
												
														<select name="application" id="application" ng-model="app_id" class="form-control" ng-change="applicationSelectEvent()" ng-disabled="loading || editPackage">
															<option value="">Select the application</option>
															<option ng-repeat="x in applicationList" value="{{x.app_id}}" ng-selected="{{x.app_id == app_id}}">{{x.app_name}}</option>
														</select>
													
												</div>
											</div>
											
											<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-12">
													
														<label>Enter Package Name</label>
												
														<input class="form-control" placeholder="Enter Application Name" ng-model="package_obj.package_name"  ng-disabled="loading">
													
													
												</div>
											</div>
											<br><br>
											<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-6">
													<button type="button" class="btn btn-default" ng-click="packageCreateEdit()"  ng-disabled="loading">{{button}}</button>
													<button type="button" class="btn btn-default" ng-click="resetApplication()"  ng-disabled="loading">Reset</button>
													
												</div>
												
												
											
											</div>
											
										</div>
										<div class="col-lg-6">
											<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-12">
													<label>Package Description</label>
													<textarea class="form-control" placeholder="Enter Package Description" rows="5" ng-model="package_obj.package_description"  ng-disabled="loading"></textarea>
												</div>
											</div>
										</div>
									</div>
									<br>
									<div class="row" ng-hide="intializing || !isApplicationSelected">
										<div class="col-lg-12">
											<div class="panel panel-default">
												<div class="panel-heading">
													Package Details
												</div>
												<div class="panel panel-body">
													<div class="table-responsive">
														<table class="table table-striped table-bordered">
															<thead>
																<tr>
																	<th>#</th>
																	<th>Package Name</th>
																	<th>Package Description</th>
																	<th>Edit/Delete</th>
																	
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="row in package_list">
																	<td>  {{$index + 1}}</td>
																	
																	<td>
																		{{row.package_name}}
																	</td>
																	<td>
																		{{row.package_description}}
																	</td>
																	
																	<td>
																		<button type="button" class="btn btn-default" ng-click="edit(row.package_id)" ng-disabled="loading">Edit</button>
																		<button type="button" class="btn btn-default"  ng-click="remove(row.package_id)"  ng-disabled="loading">Delete</button>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
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
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js">
      </script>
    <!-- <script src="resources/userJs/operationKeywords/app.js"></script>
    <script src="../resources/userJs/operationKeywords/app_controller.js"></script>
    <script src="../resources/userJs/operationKeywords/keyword_service.js"></script> -->
    <script src="../resources/userJs/Package.js"></script>

</body>

</html>

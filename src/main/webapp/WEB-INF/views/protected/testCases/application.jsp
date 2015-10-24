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
    <link href="resources/themes/bowerTheme/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="resources/themes/bowerTheme/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="resources/themes/bowerTheme/dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="resources/themes/bowerTheme/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
           <!--  <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Automation Tool</a>
            </div> -->
            <!-- /.navbar-header -->
			<img class="navbar navbar-top-links navbar-left" style="margin-left: 10;margin-top: 5; margin-bottom:5" src="resources/images/TechMahindra.png" height="10%" width="10%">
            
            <ul class="nav navbar-top-links navbar-right">
                
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i> ${user}  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="#"><i class="fa fa-user fa-fw"></i> ${user}'s Profile</a>
                        </li>
                        <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->
			<br>
            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        
                        <li>
                            <a href="home">Dashboard</a>
                        </li>
                        <li>
                            <a href="#">Test Cases</a>
                            <ul class="nav nav-second-level">
								<ul class="nav nav-second-level">
								<li><a href="createTestCase">Create Test Case</a></li>
								<li><a href="viewTestcase">View/Edit Test Case</a></li>
								</ul>
							</ul>
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href="createPackage.html">Package</a>
                        </li>
                        <sec:authorize access="hasRole('ADMIN')">
						<li><a href="application">Application</a></li>
						</sec:authorize>
						<li>
							<a href="#">Test Suite</a>
							<ul class="nav nav-second-level">
								<li><a href="createTestSuite.html">Create Test Suite</a></li>
								<li><a href="EditTestSuite.html">View/Edit Test Suite</a></li>
							</ul>
						</li>
						
                    </ul>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <!-- Page Content -->
       <div id="page-wrapper" ng-app="application" ng-controller="applicationController">
       	<div class="container-fluid">
       		<div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Application</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
       			<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								New Application Details
							</div>
							<div class="panel-body">
								<form role="form">
									<div class="row" ng-show="intializing || loading">
										<div class="col-lg-12">
											<center><img src="resources/images/loading.gif" alt="Loading" height = "20" width="20"></center>
										
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
													
														<label>Enter Application Name</label>
												
														<input class="form-control" placeholder="Enter Application Name" ng-model="application.app_name"  ng-disabled="loading">
													
													
												</div>
											</div>
											<br><br>
											<div class="row">
												<div class="col-lg-6">
													<button type="button" class="btn btn-default" ng-click="applicationCreateEdit()"  ng-disabled="loading">{{button}}</button>
													<button type="button" class="btn btn-default" ng-click="resetApplication()"  ng-disabled="loading">Reset</button>
													
												</div>
												
												
											
											</div>
											
										</div>
										<div class="col-lg-6">
											<div class="row">
												<div class="col-lg-12">
													<label>Application Description Description</label>
													<textarea class="form-control" placeholder="Enter Application Description" rows="5" ng-model="application.app_description"  ng-disabled="loading"></textarea>
												</div>
											</div>
										</div>
									</div>
									<br>
									<div class="row" ng-hide="intializing">
										<div class="col-lg-12">
											<div class="panel panel-default">
												<div class="panel-heading">
													Application Details
												</div>
												<div class="panel panel-body">
													<div class="table-responsive">
														<table class="table table-striped table-bordered">
															<thead>
																<tr>
																	<th>#</th>
																	<th>Application Name</th>
																	<th>Application Description</th>
																	<th>Edit/Delete</th>
																	
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="row in applicationList">
																	<td>  {{$index + 1}}</td>
																	
																	<td>
																		{{row.app_name}}
																	</td>
																	<td>
																		{{row.app_description}}
																	</td>
																	
																	<td>
																		<button type="button" class="btn btn-default" ng-click="edit(row.app_id)" ng-disabled="loading">Edit</button>
																		<button type="button" class="btn btn-default"  ng-click="remove(row.app_id)"  ng-disabled="loading">Delete</button>
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
    <script src="resources/themes/bowerTheme/bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="resources/themes/bowerTheme/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="resources/themes/bowerTheme/bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="resources/themes/bowerTheme/dist/js/sb-admin-2.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js">
      </script>
    <!-- <script src="resources/userJs/operationKeywords/app.js"></script>
    <script src="resources/userJs/operationKeywords/app_controller.js"></script>
    <script src="resources/userJs/operationKeywords/keyword_service.js"></script> -->
    <script src="resources/userJs/Application.js"></script>

</body>

</html>

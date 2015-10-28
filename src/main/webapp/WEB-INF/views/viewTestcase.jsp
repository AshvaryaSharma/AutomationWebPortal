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
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Automation Tool</a>
            </div>
            <!-- /.navbar-header -->

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

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        
                        <li>
                            <a href="home.html">Dashboard</a>
                        </li>
                        <li>
                            <a href="#">Test Cases</a>
                            <ul class="nav nav-second-level">
								<ul class="nav nav-second-level">
								<li><a href="createTestCase">Create Test Case</a></li>
								<li><a href="EditTestCase.html">View/Edit Test Case</a></li>
								</ul>
							</ul>
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href="createPackage.html">Package</a>
                        </li>
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
											<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-12">
													<label>Select Package</label>
														<select name="package" id="package" ng-model="package_id" class="form-control" ng-change="packageSelectEvent()" ng-disabled="loading">
															<option value="" ng-selected="applicationsLoaded">Select Package</option>
															<option ng-repeat="n in packages" value="{{n.package_id}}">{{n.package_name}}</option>
													
														</select>
												</div>
											</div>
											
											
										</div>
										<div class="col-lg-6">
											<div class="row" ng-show="isPackageSelected">
												<div class="col-lg-12">
													<label>Package Description</label>
													<textarea class="form-control" placeholder="{{package_description}}" rows="4" disabled></textarea>
												</div>
											</div>
										</div>
									</div>
									<br>
									<div class="row" ng-show="isPackageSelected && (testcases.length > 0)">
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
    
    <script src="resources/userJs/Checklist-model.js"></script>
    <script src="resources/userJs/ViewTestCase.js"></script>
	
</body>

</html>

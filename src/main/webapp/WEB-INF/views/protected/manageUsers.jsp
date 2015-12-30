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
<body ng-app="users" ng-controller="addUserController">

	 <div id="page-wrapper">
       	<div class="container-fluid">
       	
       		<div class="row">
       		
                    <div class="col-lg-12">
                        <h1 class="page-header">Create New User</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
       			<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								Enter New Users Details
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
										<div class="col-lg-12">
											
											<div class="row">
												<div class="col-lg-2">
													<label>Username</label>
													<input type="text" ng-model="ssoid" class="form-control" placeholder="Enter Username" ng-change="checkUserExists()">
												</div>
												<div class="col-lg-2" ng-show="ifUsernameNotExist">
													<div class="alert alert-success">
													<img src="../resources/images/correct.png"  alt="Loading" height = "30" width="30"><b>Username can be used</b>
													</div>
												</div>
												<div class="col-lg-3" ng-show="ifUsernameExist">
													<div class="alert alert-danger">
														<img src="../resources/images/incorrect.png"  alt="Loading" height = "30" width="30"><b>Username already Exists! Choose a different one</b>
						
													</div>
												</div>
												
											</div>
											<br>
											<div class="row">
												<div class="col-lg-2">
													<label>Password</label>
													<input type="password" ng-model="password" class="form-control" placeholder="Enter Password" ng-change="checkPasswordMatch()">
											
												</div>
												
											
											
												<div class="col-lg-2">
													<label>Confirm Password</label>
													<input type="password" ng-model="confirmPassword" class="form-control" placeholder="Confirm Password" ng-change="checkPasswordMatch()">
											
												</div>
												<div class="col-lg-2" ng-show="ifPasswordMatch">
													<div class="alert alert-success">
														<img src="../resources/images/correct.png"  alt="Loading" height = "30" width="30"><b>Password's Match</b>
													</div>
												</div>
												<div class="col-lg-3" ng-show="ifPasswordNotMatch">
														<div class="alert alert-danger">
														<img src="../resources/images/incorrect.png"  alt="Loading" height = "30" width="30"><b>Password's do not match</b>
														</div>
													
												</div>
											
											</div>
											<br>
											<div class="row">
												<div class="col-lg-2">
													<label>First Name</label>
													<input type="text" ng-model="firstname" class="form-control" placeholder="Enter Firstname">
											
												</div>
											
												<div class="col-lg-2">
													<label>Last Name</label>
													<input type="text" ng-model="lastname" class="form-control" placeholder="Enter Lastname">
											
												</div>
											
												<div class="col-lg-2">
													<label>Email</label>
													<input type="email" ng-model="email" class="form-control" placeholder="Enter Email Address">
											
												</div>
												
												
												
												
											</div>
											<br>
											<div class="row">
												<div class="col-lg-2">
													<label>Select Team</label>
													<select name="group" id="group" ng-model="groupid" class="form-control" ng-change="" ng-disabled="loading">
															<option value="">Select the application</option>
															<option ng-repeat="x in groupList" value="{{x.groupid}}" ng-selected="{{x.groupid == group_id}}">{{x.team_name}}</option>
														</select>
											
												</div>
											</div>
											
											<br>
											<div class="row">
												<div class="col-lg-2">
													<label>Select Roles</label>
													<select name="role" id="group" ng-model="role" class="form-control" ng-change="" ng-disabled="loading" multiple>
															
															<option ng-repeat="x in roleList" value="{{x.id}}" ng-selected="">{{x.type}}</option>
														</select>
												</div>
											
											</div>
											{{role}}
											<br><br>
											<div class="row">
												<div class="col-lg-2">
													<button type="button" class="btn btn-default" ng-click="saveUser()">Save User</button>
													<button type="reset" class="btn btn-default" ng-click="reset()">Reset</button>
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
	


</body>
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js">
      </script>
      
      <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.6/angular-touch.min.js"></script>
      <!-- Select Sanitize CSS -->
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular-sanitize.js"></script>
    <script src="../resources/userJs/addUsers.js"></script>

</html>
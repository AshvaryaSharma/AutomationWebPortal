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

<body>

    <div id="wrapper">
        <!-- Page Content -->
       <div id="page-wrapper" ng-app="testCase" ng-controller="testcaseController" ng-init="startApplication('${testcaseAction}',${testcaseId},'${user}')">
       	<div class="container-fluid">
       		<div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">${heading}</h1>
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
												
														<select name="application" id="application" ng-model="app_id" class="form-control" ng-change="applicationSelectEvent()" ng-disabled="loading || viewTestcase || editTestCase">
															<option value="">Select the application</option>
															<option ng-repeat="x in applications" value="{{x.app_id}}" ng-selected="{{x.app_id == app_id}}">{{x.app_name}}</option>
														</select>
														
														<!-- <ui-select ng-model="person.selected" theme="select2" ng-disabled="disabled" style="min-width: 300px;" title="Choose a person">
													    <ui-select-match placeholder="Select a person in the list or search his name/age...">{{$select.selected.app_name}}</ui-select-match>
													    <ui-select-choices repeat="person in people | propsFilter: {app_name: $select.search, app_id: $select.search}">
													      <div ng-bind-html="person.app_name | highlight: $select.search"></div>
													      <small>
													        
													        id: <span ng-bind-html="''+person.app_id | highlight: $select.search"></span>
													      </small>
													    </ui-select-choices>
													  </ui-select> -->
													
													
												</div>
											</div>
											<br>
											<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-12">
													<label>Enter Test Case Name</label>
													<input class="form-control" placeholder="Enter Test Case Name" ng-model="testCaseName"  ng-disabled="loading || viewTestcase">
												</div>
											
											</div>
											<br>
											<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-6">
													<label><input type="checkbox"  ng-model="isPackageSelected"  ng-disabled="loading || viewTestcase" value="true">
													Load package attributes</label>
													
												</div>
												<div class="col-lg-6" ng-show="isPackageSelected">
													
													<select name="configuration" id="application" ng-model="configTestPackageId" class="form-control" ng-change="packageSelectEvent()" ng-disabled="loading || viewTestcase">
															<option value="">Select Package</option>
															<option ng-repeat="x in packages" value="{{x.testsuite_id}}" >{{x.testsuite_name}}</option>
													</select>
													
												</div>
											
											</div>
											
										</div>
										<div class="col-lg-6">
											<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-12">
													<label>Test Case Description</label>
													<textarea class="form-control" placeholder="Enter Test Case Description" rows="7" ng-model="testCaseDescription"  ng-disabled="loading || viewTestcase"></textarea>
												</div>
											</div>
										</div>
									</div>
									<br>
									
									<div class="row" ng-show="isApplicationSelected">
												<div class="col-lg-12">
												<p>Note: To enter a Test Attribute in the fiels use format as: <label>{Test{"variable_name"}}</label></p>
									<p>Example: For Using Test Attribute "URL" as input enter: <label>{Test{URL}}</label></p>
									
												</div>
											
											</div>
									
									<div class="row" ng-show="isApplicationSelected">
										
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
																		<!-- <select name="operation" id="operation" class="form-control" ng-model="row.keyword" ng-change="operatorSelectEvent(testStep.indexOf(row),true)"  ng-disabled="loading || viewTestcase">
																			<option value="">-------</option>
																			<option ng-repeat="oprtn in operationNames" value="{{oprtn}}" ng-selected="{{oprtn == row.keyword}}">{{oprtn}}</option>
																		</select> -->
																		
																		<ui-select ng-model="row.operation"  ng-disabled="disabled || viewTestcase"  title="Choose an Operation" ng-change="operatorSelectEvent(testStep.indexOf(row),true)">
																	    <ui-select-match placeholder="Select or Search an operation">{{$select.selected.keyword}}</ui-select-match>
																	    <ui-select-choices repeat="operation in operationNames.operationList | propsFilter: {keyword: $select.search, type: $select.search}">
																	      <b><div ng-bind-html="operation.keyword | highlight: $select.search" ></div></b>
																	    <small>
																	        
																	        Type: <span ng-bind-html="''+operation.type | highlight: $select.search"></span>
																	      </small>
																	    </ui-select-choices>
																	  </ui-select>
																		
																	</td>
																	<td>
																		<ui-select ng-model="row.arg1" ng-disabled="disabled || viewTestcase" title="Choose an Page" ng-change="pageNameSelectEvent(testStep.indexOf(row))" ng-if="row.operation.type == 'UI'">
																	    <ui-select-match placeholder="Select or Search an Page Name">{{$select.selected.pageName}}</ui-select-match>
																	    <ui-select-choices repeat="page in pageNames | propsFilter: {pageName: $select.search}">
																	      <b><div ng-bind-html="page.pageName | highlight: $select.search" ></div></b>
																	    <small ng-if="page.url !== '' && page.url != null">
																	        
																	        URL: <span ng-bind-html="''+page.url | highlight: $select.search"></span>
																	      </small>
																	    </ui-select-choices>
																	  </ui-select>
																		
																		<div ng-if="row.operation.type == 'NONUI' || row.operation == null">
																		 <div angucomplete-alt id="ex1" placeholder="{{row.arg1_ph}}" maxlength="50" pause="100" selected-object="row.arg1" disable-input="(row.arg1_ph =='') || (row.arg1_ph=='NA') || loading || viewTestcase" local-data="configParamList" search-fields="parameter_name" title-field="parameter_name" minlength="1" input-class="form-control form-control-small" match-class="highlight" override-suggestions="true"  initial-value="row.arg1">
																	          </div>
																		</div>
																		
																	</td>
																	<td>
																		<ui-select ng-model="row.arg2" ng-disabled="disabled || viewTestcase" title="Choose an Page Object" ng-change="" ng-if="row.operation.type == 'UI'">
																	    <ui-select-match placeholder="Select or Search an Page Object">{{$select.selected.pageObjectName}}</ui-select-match>
																	    <ui-select-choices repeat="page in row.pageObject | propsFilter: {pageObjectName: $select.search, pageObjectType: $select.search}">
																	      <b><div ng-bind-html="page.pageObjectName | highlight: $select.search" ></div></b>
																	    <small ng-if="page.pageObjectType !== '' && page.pageObjectType != null">
																	        
																	        Type: <span ng-bind-html="''+page.pageObjectType | highlight: $select.search"></span>
																	      </small>
																	    </ui-select-choices>
																	  </ui-select>
																		<div ng-if="row.operation.type == 'NONUI' || row.operation == null">
																		 <div angucomplete-alt id="ex1" placeholder="{{row.arg2_ph}}" maxlength="50" pause="100" selected-object="row.arg2" disable-input="(row.arg2_ph =='') || (row.arg2_ph=='NA') || loading || viewTestcase" local-data="configParamList" search-fields="parameter_name" title-field="parameter_name" minlength="1" input-class="form-control form-control-small" match-class="highlight" override-suggestions="true" initial-value="row.arg2">
																	          </div>
																		</div>
																	</td>
																	<td>
																			
																	          <div angucomplete-alt id="ex1" placeholder="{{row.arg3_ph}}" maxlength="50" pause="100" selected-object="row.arg3" disable-input="(row.arg3_ph =='') || (row.arg3_ph=='NA') || loading || viewTestcase" local-data="configParamList" search-fields="parameter_name" title-field="parameter_name" minlength="1" input-class="form-control form-control-small" match-class="highlight" override-suggestions="true" initial-value="row.arg3">
																	          </div>
																	        
																	        
																		<!-- <input class="form-control" placeholder="{{row.arg3_ph}}" ng-model="row.arg3" ng-disabled="(row.arg3_ph =='') || (row.arg3_ph=='NA') || loading || viewTestcase">
																	 --></td>
																	<td>
																		 <div angucomplete-alt id="ex1" placeholder="{{row.arg4_ph}}" maxlength="50" pause="100" selected-object="row.arg4" disable-input="(row.arg4_ph =='') || (row.arg4_ph=='NA') || loading || viewTestcase" local-data="configParamList" search-fields="parameter_name" title-field="parameter_name" minlength="1" input-class="form-control form-control-small" match-class="highlight" override-suggestions="true"  initial-value="row.arg4">
																	          </div>
																	</td>
																	<td>
																		 <div angucomplete-alt id="ex1" placeholder="{{row.arg5_ph}}" maxlength="50" pause="100" selected-object="row.arg5" disable-input="(row.arg5_ph =='') || (row.arg5_ph=='NA') || loading || viewTestcase" local-data="configParamList" search-fields="parameter_name" title-field="parameter_name" minlength="1" input-class="form-control form-control-small" match-class="highlight" override-suggestions="true"  initial-value="row.arg5">
																	          </div>
																	</td>
																	<td>
																		<button type="button" class="btn btn-default btn-circle btn-xs" ng-click="addRowEvent($index)" ng-disabled="loading || viewTestcase"><i class="fa fa-plus-circle"></i></button>
																		<button type="button" class="btn btn-default btn-circle btn-xs"  ng-click="removeRowEvent($index)"  ng-disabled="loading || viewTestcase"><i class="fa fa-minus-circle"></i></button>
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
											<button type="button" class="btn btn-default" ng-click="submitTestcase()"  ng-disabled="loading || viewTestcase">${button}</button>
											<button type="reset" class="btn btn-default" ng-click="resetAll()"  ng-disabled="loading || viewTestcase">Reset</button>
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
      
      <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.6/angular-touch.min.js"></script>
      <!-- Select Sanitize CSS -->
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular-sanitize.js"></script>
	
	
	<script src="../resources/themes/bowerTheme/angucomplete-alt-master/angucomplete-alt.js"></script>
	<!-- ui-select files -->
  <script src="../resources/themes/bowerTheme/ui-select-master/dist/select.js"></script>
    <!-- <script src="../resources/userJs/operationKeywords/app.js"></script>
    <script src="resources/userJs/operationKeywords/app_controller.js"></script>
    <script src="resources/userJs/operationKeywords/keyword_service.js"></script> -->
    <script src="../resources/userJs/TestCaseNew.js"></script>
    
    

</body>

</html>

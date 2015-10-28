<!DOCTYPE html>
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
    <link href="resources/themes/bowerTheme/dist/css/tech-m.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

<!------------------------------------------------------------------------------------------------------------------------------ -->
        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Package Information</h1>
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
									<div class="row">
										<div class="col-lg-6">
											
											<div class="row">
												<div class="col-lg-12">
													<label>Package Name</label>
													<select class="form-control">
														<option selected>Select Package</option>
														<option>Package 1 - MyAtt</option>
														<option>Package 2 - SMB</option>
														<option>Package 3 - OPSS</option>
														<option>Package 4 - TBMCSR</option>
														
													</select>
												</div>
											</div>
											<br>
											<div class="row">
												<div class="col-lg-6">
													<button class="btn btn-default" data-toggle="modal" data-target="#myModal">Add New Package</button>
													
													<!-- Modal -->
                            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                                        </div>
                                        <div class="modal-body">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>
                                <!-- /.modal-dialog -->
                            </div>
                            <!-- /.modal -->

													
												</div>
												<div class="col-lg-6">
													<button class="btn btn-default disabled">Add Test Case to Package</button>
												</div>
											</div>
										</div>
										<div class="col-lg-6">
											
											<div class="well well-sm">
												<h4>Test Package Description</h4>
												<p>Details information about the package goes here. Package information to be loaded on the selection made. This information to be hidded before that</p>
											</div>
											
										</div>
									</div>
									<br>
									<div class="row">
										<div class="col-lg-12">
													<div class="table-responsive">
														<table class="table table-striped table-bordered">
															<col style="width:5%">
															<col style="width:20%">
															<col style="width:30%">
															<col style="width:15%">
															<col style="width:10%">
															<thead>
																<tr>
																	<th>#</th>
																	<th>Test Case Name</th>
																	<th>Test Case Description</th>
																	<th>Edit/Delete</th>
																	<th>Download</th>
																	
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		<label>1</label>
																	</td>
																	<td>
																		Test Case 1
																	</td>
																	<td>
																		Description for test case goes here in detail
																	</td>
																	<td>
																		<p><a href="EditTestCase.html">Edit</a>/ <a href="DeleteTestCase.html">Delete</a>/ <a href="#">Save As New</a></p>
																	</td>
																	
																	<td>
																	<center>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\Excel-icon.png" alt="Download Excel">
																		</a>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\file-code-icon.png" >
																		</a>
																	</center>
																	</td>
																</tr>
																<tr>
																	<td>
																		<label>2</label>
																	</td>
																	<td>
																		Test Case 2
																	</td>
																	<td>
																		Description for test case goes here in detail
																	</td>
																	<td>
																		<p><a href="EditTestCase.html">Edit</a>/ <a href="DeleteTestCase.html">Delete</a>/ <a href="#">Save As New</a></p>
																	</td>
																	
																	<td>
																		<center>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\Excel-icon.png" alt="Download Excel">
																		</a>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\file-code-icon.png" >
																		</a>
																	</center>
																	</td>
																</tr>
																<tr>
																	<td>
																		<label>3</label>
																	</td>
																	<td>
																		Test Case 3
																	</td>
																	<td>
																		Description for test case goes here in detail
																	</td>
																	<td>
																		<p><a href="EditTestCase.html">Edit</a>/ <a href="DeleteTestCase.html">Delete</a>/ <a href="#">Save As New</a></p>
																	</td>
																	<td>
																		<center>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\Excel-icon.png" alt="Download Excel">
																		</a>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\file-code-icon.png" >
																		</a>
																	</center>
																	</td>
																</tr>
																<tr>
																	<td>
																		<label>4</label>
																	</td>
																	<td>
																		Test Case 4
																	</td>
																	<td>
																		Description for test case goes here in detail
																	</td>
																	<td>
																		<p><a href="EditTestCase.html">Edit</a>/ <a href="DeleteTestCase.html">Delete</a>/ <a href="#">Save As New</a></p>
																	</td>
																	<td>
																		<center>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\Excel-icon.png" alt="Download Excel">
																		</a>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\file-code-icon.png" >
																		</a>
																	</center>
																	</td>
																</tr>
																<tr>
																	<td>
																		<label>5</label>
																	</td>
																	<td>
																		Test Case 5
																	</td>
																	<td>
																		Description for test case goes here in detail
																	</td>
																	<td>
																		<p><a href="EditTestCase.html">Edit</a>/ <a href="DeleteTestCase.html">Delete</a>/ <a href="#">Save As New</a></p>
																	</td>
																	<td>
																		<center>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\Excel-icon.png" alt="Download Excel">
																		</a>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\file-code-icon.png" >
																		</a>
																	</center>
																	</td>
																</tr>
																<tr>
																	<td>
																		<label>6</label>
																	</td>
																	<td>
																		Test Case 6
																	</td>
																	<td>
																		Description for test case goes here in detail
																	</td>
																	<td>
																		<p><a href="EditTestCase.html">Edit</a>/ <a href="DeleteTestCase.html">Delete</a>/ <a href="#">Save As New</a></p>
																	</td>
																	<td>
																		<center>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\Excel-icon.png" alt="Download Excel">
																		</a>
																		<a href="#">
																			<img src="D:\Downloads\webToolShivani\bootstrap_project\images\file-code-icon.png" >
																		</a>
																	</center>
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
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->

    </div>
	</body>
	</html>
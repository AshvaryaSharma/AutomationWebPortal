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
    <link href="../resources/themes/bowerTheme/dist/css/tech-m.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../resources/themes/bowerTheme/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

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
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom:0 vertical-align: middle">
		<div class="row" style="vertical-align: middle">
            <div class="col-ld-2 col-md-2 col-sm-12 col-xs-12">
                
                <a class="navbar-brand" href="index.html"><img class="navbar navbar-top-links navbar-left" style="margin-left: 10;margin-top: 5; margin-bottom:15" src="../resources/images/logo_techm.png">
            </a>
            </div>
            <!-- /.navbar-header -->
			<div class="col-ld-3 col-md-3 col-sm-12 col-xs-12">
				<table style="border-style: none">
				<tr>
				<td>
				<span class="badge">
					Welcome <strong>${user}</strong>
				</span>
				</td>
				</tr>
				<tr>
				<td>
				<strong>Team: </strong> <b>${team}</b>
				</td>
				</tr>
				</table>
			</div>
			<div class="col-ld-7 col-md-7 col-sm-12 col-xs-12" style="vertical-align: middle">
				<div class="row" style="vertical-align: middle">
				<div class="col-ld-6 col-md-6 col-sm-6 col-xs-6" style="vertical-align: middle">
				<table>
				<tr>
					<td><a href="../home" style="color: #ffffff"><span class="glyphicon glyphicon-home"> Home</span></a>
					&nbsp &nbsp
					<a href="../logout" style="color: #ffffff"><span class="fa fa-power-off"> Logout</span></a></td>
				</tr>
				<tr>
				<td colspan="2">
				<span class="each word" style="vertical-align: middle">
					<span class="first-letter">S</span>
					implified 
					<span class="first-letter">A</span>
					utomation 
					<span class="first-letter">F</span>
					ramework for
					<span class="first-letter">E</span>
					fficiency
				</span>
				</td>
				</tr>
				</table>
				</div>
				<div class="col-ld-6 col-md-6 col-sm-6 col-xs-6">
					<a  href="index.html"><img src="../resources/images/safe.png" style="margin-left: 10;margin-top: 5; margin-bottom:15"></a>
				</div>
				</div>
				
			</div>
            <!-- /.navbar-top-links -->
		</div>
           <!-- <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        
                        <li>
                            <a href="index.html">Dashboard</a>
                        </li>
                        <li>
                            <a href="testCases.html">Test Cases</a>
                            <ul class="nav nav-second-level">
								<ul class="nav nav-second-level">
								<li><a href="testcases.html">Create Test Case</a></li>
								<li><a href="EditTestCase.html">View/Edit Test Case</a></li>
								</ul>
							</ul>
                            
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
                </div>
                
            </div> -->
            <!-- /.navbar-static-side -->
        </nav>
		<!---------------------------------------------------------------------------------------------------------------------------- -->
		<nav class="navbar navbar-inverse" role="banner">
            
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
               
                </div>
				
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav" style="font-weight:bold;">
                        <li id="lGSDPMenu" class="dropdown">
                            <a id="GSDPMenu" class="dropdown-toggle" data-toggle="dropdown">Test Cases<i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a id="GSDPAprSubMenu" href="createTestCase">Create Testcase</a></li>
								<li><a id="GSDPAprSubMenu" href="viewTestcase">View Testcases</a></li>
                                
                            </ul>
                        </li>
						
                        <sec:authorize access="hasRole('DBA')">
                        
						<li id="lAnnMenu" class="dropdown">
							<a id="AnnMenu" href="application">Applications</a>
                            <ul class="dropdown-menu">
                                
                            </ul>
                        </li>
						</sec:authorize>
						
                       
                          	
                      	<li id="lContactUs" class="dropdown">
                        <a id="TestSuites" class="dropdown-toggle" data-toggle="dropdown">Test Suites<i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
                           	 <sec:authorize access="hasRole('ADMIN')"><li><a id="GSDPAprSubMenu" href="testsuite">Add/EditTestsuite</a></li>
                           	 </sec:authorize>
								<li><a id="GSDPAprSubMenu" href="testsuiteMaster">Add Testcases to Testsuite</a></li>
                            </ul>
                        </li>			
                    </ul>
                    	 
				</div>
              
            
              
        </nav>
		</div>
		 		
	</body>
</html>
	
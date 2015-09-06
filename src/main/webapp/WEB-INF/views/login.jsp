<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<title>Automation Tool Web Portal</title>
	
	<!-- Bootstrap Core CSS -->
    <link href="resources/themes/bowerTheme/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="resources/themes/bowerTheme/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="resources/themes/bowerTheme/dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="resources/themes/bowerTheme/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	
</head>
<body>

<div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign In</h3>
                    </div>
                    <div class="panel-body">
                        <form:form method="post" action="${loginUrl}">
                            <fieldset>
                            	
                            	<c:if test="${param.error != null}">
                            		<div class="form-group">
									<div class="alert alert-danger">Invalid Username and Password</div>
									</div>
								</c:if>
								<c:if test="${param.logout != null}">
                            		<div class="form-group">
									<div class="alert alert-success">You have been logged out successfully.</div>
									</div>
								</c:if>
                            
                                <div class="form-group">
                                    <input type="text" class="form-control" id="username" name="ssoId" placeholder="Enter Username" required autofocus/>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" id="password" name="password" placeholder="Enter Password" required />
                                </div>
                                <input type="hidden" name="${_csrf.parameterName}"   value="${_csrf.token}" />
                            
                                <!-- Change this to a button or input when using this as a form -->
                                <input class="btn btn-lg btn-success btn-block" type="submit" value="Login" />
                            </fieldset>
                        </form:form>
                    </div>
                </div>
            </div>
        </div>
    </div>




<!-- jQuery -->
    <script src="resources/themes/bowerTheme/bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="resources/themes/bowerTheme/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="resources/themes/bowerTheme/bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="resources/themes/bowerTheme/dist/js/sb-admin-2.js"></script>
    
    
    
</body>
</html>
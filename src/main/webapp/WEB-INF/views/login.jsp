<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>TechMahindra | Login - SAFE Home</title>
    <!-- core CSS -->
    <link href="resources/themes/bowerTheme/loginTheme/bootstrap.css" rel="stylesheet" />
    <link href="resources/themes/bowerTheme/loginTheme/font-awesome.min.css" rel="stylesheet" />
    <link href="resources/themes/bowerTheme/loginTheme/main.css" rel="stylesheet" />
    <link href="resources/themes/bowerTheme/loginTheme/responsive.css" rel="stylesheet" />
    <link href="resources/themes/bowerTheme/loginTheme/customcss.css" rel="stylesheet" />
    <link href="resources/themes/bowerTheme/loginTheme/style.css" rel="stylesheet" />
    <link href="resources/themes/bowerTheme/loginTheme/form-style.css" rel="stylesheet" />
    
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
		<script src="js/html5shiv.js"></script>
		<script src="js/respond.min.js"></script>
    <![endif]-->
</head>
<!--/head-->
<body class="body-bg">
    <form:form method="post" action="${loginUrl}">






    

    <div class="container" style="padding-top: 20px; padding-bottom: 20px;">
        <div class="row">
            <div class="col-sm-2 col-sm-offset-4 col-xs-8" style="border: 0px solid;">
                
                    <img src="resources/themes/bowerTheme/loginTheme/logo_techm.png" alt="" />
            </div>
            <div class="col-sm-2 col-xs-4" style="border: 0px solid;">
                <img src="resources/themes/bowerTheme/loginTheme/safe.png" class="pull-right" alt="safe logo" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 col-sm-4 col-sm-offset-4 form-box">
                <div class="form-top">
                    <div class="form-top-left">
                        <h4>
                            User Log in</h4>
                        <span>Please use your User ID and Password for authentication:</span>
                    </div>
                    <!--<div class="form-top-right">
                        <i class="fa fa-key"></i>
                    </div>-->
                </div>
                <div class="form-bottom">
                    <div class="login-form form-horizontal">
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
                            <label for="form-username" class="col-sm-4" width="60%">
                                Username *</label>
                                <div class="col-sm-8">
                            <input name="ssoId" type="text" id="username" tabindex="1" autocomplete="off" class="form-username form-control" autofocus/>
                                </div>
                            
                        </div>
                        <div class="form-group">
                            <label  for="form-password" class="col-sm-4" width="60%">
                                Password *</label>
                                <div class="col-sm-8">
                            <input name="password" type="password" id="password" tabindex="2" autocomplete="off" class="form-password form-control" required />
                                </div>
							<input type="hidden" name="${_csrf.parameterName}"   value="${_csrf.token}" />
                            
                        </div>
                        
                        <input id="LoginButton" tabindex="3" class="btn-login btn-block text-center" type="submit" value="Login">
                    </div>
					
                </div>
            </div>
        </div>
    




</form:form>
    <br />
    <br />
    <div class="row">
        <div id="footerlink" class="text-center" style="margin-top: 28px; color:White; font-size:15px">
            <b>System for Automating your Application 
				</b>
        </div>
        <br />
        <div class="col-sm-8 col-sm-offset-2">
            <div class="text-center">
                <p style="color: black;">
                    &copy; 2015 Tech Mahindra Ltd. All rights reserved.
                </p>
            </div>
        </div>
    </div>
    </div>
    <!--/.container-->
    
</body>
</html>

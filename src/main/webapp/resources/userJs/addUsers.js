angular.module('users',[]).controller('addUserController', function($scope,$http) {
	
	console.log("Starting initialising User APP");
	$scope.loading = false;
	$scope.intializing = true;
	$scope.ifUsernameExist = false;
	$scope.ifUsernameNotExist = false;
	$scope.ifPasswordMatch = false;
	$scope.ifPasswordNotMatch = false;
	$scope.errorStatus = false;
	$scope.successStatus = false;
	
	
	//$scope.roleList = [{id:1, role_name: "USER"},{id:2, role_name: "ADMIN"},{id:3, role_name: "DBA"}]
	
	$scope.$watch('role', function(nowSelected){
	    // reset to nothing, could use `splice` to preserve non-angular references
	    $scope.selectedValue = [];

	    if( ! nowSelected ){
	        // sometimes selected is null or undefined
	        return;
	    }

	    // here's the magic
	    angular.forEach(nowSelected, function(val){
	        $scope.selectedValue.push( val );
	    });
	});
	
	$scope.getAllRoles = function() {
		$scope.loading = true;
		$http.get("../webservice/getAllRoles")
			.success(function(response){
				$scope.roleList = response.rolesList;
				$scope.loading = false;
				$scope.intializing = false;
			})
			.error(function(response) {
				$scope.errorMessage = response.errorMessage;
				$scope.errorStatus = true;
				$scope.loading = false;
				$scope.intializing = false;
			})
			
			
			
	}
	
	
	
	$scope.getAllGroups = function() {
		$scope.loading = true;
		$http.get("../webservice/getAllGroups")
			.success(function(response){
				$scope.groupList = response.groupList;
				$scope.loading = false;
				$scope.intializing = false;
			})
			.error(function(response) {
				$scope.errorMessage = response.errorMessage;
				$scope.errorStatus = true;
				$scope.loading = false;
				$scope.intializing = false;
			})
			
			
			
	}
	
	$scope.checkPasswordMatch = function() {
		
		if(($scope.password == $scope.confirmPassword) && ($scope.password !=null && $scope.confirmPassword !=null)) {
			$scope.ifPasswordMatch = true;
			$scope.ifPasswordNotMatch = false;
		} else if (($scope.password !=null && $scope.confirmPassword !=null) && ($scope.password != $scope.confirmPassword)) {
			
			$scope.ifPasswordMatch = false;
			$scope.ifPasswordNotMatch = true;
		}
		
	};
	
	$scope.checkUserExists = function() {
		if($scope.ssoid != null || $scope.ssoid !='') {
			$scope.loading = true;
			$http.post("../webservice/checkUserExists",$scope.ssoid)
				.success(function(response){
					$scope.ifUsernameExist = true;
					$scope.ifUsernameNotExist = false;
					$scope.loading = false;
					
				})
				.error(function(response) {
					$scope.ifUsernameExist = false;
					$scope.ifUsernameNotExist = true;
					
					$scope.loading = false;
				
				})
		} else if(($scope.ssoid == null) || ($scope.ssoid=='')) {
			$scope.loading = true;
			$scope.ifUsernameExist = false;
			$scope.ifUsernameNotExist = false;
			$scope.loading = false;
		}
		
		
		
	}
	
	
	
	
	$scope.saveUser = function() {
		
		$scope.check();
		$scope.requestObject =null;
		if(!$scope.errorStatus) {
			$scope.createNewUserRequest();
		}
		
	};
	
	
	$scope.createNewUserRequest = function() {
		
		var temp = null;
		
		temp.userDetails.ssoId =  $scope.ssoid;
		temp.userDetails.firstName = $scope.firstname;
		temp.userDetails.password = $scope.password;
		temp.userDetails.lastName = $scope.lastname;
		temp.userDetails.email = $scope.email;
		temp.userDetails.groupid = $scope.groupid;
		temp.userDetails.state = "Active";
		temp.roles = $scope.role;
		
		$scope.requestObject = temp;
		console.log(temp);
		
	}
	
	$scope.check = function() {
		$scope.errorStatus = false;
		$scope.successStatus = false;
		if($scope.ifUsernameExist) {
			$scope.errorMessage = "Enter a Valid Username";
			$scope.errorStatus = true;
		} else if ($scope.ifPasswordNotMatch) {
			$scope.errorMessage = "Password and Confirm Password should be same";
			$scope.errorStatus = true;
			
		}else if(($scope.password == null) || ($scope.password == '')) {
			$scope.errorMessage = "Enter Password";
			$scope.errorStatus = true;
			
		} else if(($scope.firstname == null) || ($scope.firstname == '')) {
			$scope.errorMessage = "Enter Firstname";
			$scope.errorStatus = true;
			
		}  else if(($scope.lastname == null) || ($scope.lastname == '')) {
			$scope.errorMessage = "Enter Lastname";
			$scope.errorStatus = true;
			
		} else if(($scope.email == null) || ($scope.email == '')) {
			$scope.errorMessage = "Enter Email that is valid";
			$scope.errorStatus = true;
			
		} else if($scope.email.$invalid) {
			$scope.errorMessage = "Enter a valid Email";
			$scope.errorStatus = true;
		} else if(($scope.groupid == null) || ($scope.groupid == '')) {
			$scope.errorMessage = "Select the Group for user";
			$scope.errorStatus = true;
			
		}
		
		
	}
	
	$scope.reset = function() {
		$scope.ifUsernameExist = false;
		$scope.ifUsernameNotExist = false;
		$scope.ifPasswordMatch = false;
		$scope.ifPasswordNotMatch = false;
		$scope.errorStatus = false;
		$scope.successStatus = false;
		$scope.ssoid = '';
		$scope.firstname = '';
		$scope.lastname = '';
		$scope.email = '';
		$scope.groupid = '';
	}
	$scope.getAllGroups();
	$scope.getAllRoles();
	console.log("End Initialising");
	
});


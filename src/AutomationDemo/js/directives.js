'use strict';
app.directive('safeHeader', function(){
	console.log("Inside Header...");
	return {
		restrict: 'E',
		templateUrl : 'partials/header.html',
		controller : ''
	};
});
app.directive('safeFooter', function(){
	console.log("Inside Footer...");
	return {
		restrict: 'E',
		templateUrl : 'partials/footer.html',
		controller: ''
	};
});
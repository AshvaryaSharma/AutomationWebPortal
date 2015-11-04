'use strict';
var safeServices = angular.module('safeServices',['ngResource']);
safeServices.factory('createTestService', function($resource, $http) {
	console.log("Inside Services...");
	var createTestService = {
		getAppData: function() {
			var appData = $http.get('json/ApplicationListSample.json')
			.then(function(response){
				console.log(response);
				return response.data;
			}); 
		return appData;
		},
		getOperationData: function() {
			var operationData = $http.get('json/OperationListSample.json')
			.then(function(response){
				console.log(response);
				return response.data;
			})
		return operationData;
		}
	};
	return createTestService;
});
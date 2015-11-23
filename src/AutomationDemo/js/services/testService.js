'use strict';
var safeServices = angular.module('safeServices',['ngResource']);
safeServices.factory('createTestService', function($resource, $http) {
	console.log("Inside Services...");
	var createTestService = {
		getAppData: function() {
			var appData = $http.get('json/ApplicationListSample.json')
			.then(function(response){
				console.log("===========Application Data in Service::"+response);
				return response.data;
			}).
			catch(function(response){
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
		},
		getUserData: function() {
			var userData = $http.get('json/UserDetails.json')
			.then(function(response) {
				console.log(response);
				return response.data;
			})
		return userData;
		},
		//getUIOperationByName : function(operationKeyword){
		getUIOperationByName : function(){
			//var uiOperation = $http.post('json/getUiOperationByName.json',operationKeyword) 
			var uiOperation = $http.get('json/getUiOperationByName.json') 
			.then(function(response){
				console.log(response);
				return response.data;
			})
		return uiOperation;
		},
		//getNonUIOperationByName : function(operationKeyword){
		getNonUIOperationByName : function(){
			//var nonUiOperation = $http.post('json/getNonUiOperationByName.json',operationKeyword)
			var nonUiOperation = $http.get('json/getNonUiOperationByName.json') 
			.then(function(response){
				console.log(response);
				return response.data;
			})
		return nonUiOperation;
		} 
		
	};
	return createTestService;
});
'use strict';
 
App.factory('keywordService', ['$http', '$q', function($http, $q){
 
    return {
         
    	listAllKeywords: function() {
            return $http.get('http://localhost:8080/AutomationToolWebPortal/webservice/keywords')
            .then(
                    function(response){
                    	 
                        return response.data;
                       
                    }, 
                    function(errResponse){
                        console.error('Error while fetching keywords');
                        return $q.reject(errResponse);
                    }
            );
        },
    };
    
}]);
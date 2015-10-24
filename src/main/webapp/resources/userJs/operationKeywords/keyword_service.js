'use strict';
 
App.factory('keywordService', ['$http', '$q', function($http, $q){
 
    return {
         
    	listAllKeywords: function(keyword) {
            return $http.post('http://localhost:8080/AutomationToolWebPortal/webservice/keywords',keyword)
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
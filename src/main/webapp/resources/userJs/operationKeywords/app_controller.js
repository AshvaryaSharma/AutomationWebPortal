'use strict';
 
App.controller('AppController', ['$scope', 'keywordService', function($scope, KeywordService) {
          var self = this;
          self.keywords;
          self.keywordObject=null;
               
          self.listAllKeywords = function(){
        	  KeywordService.listAllKeywords()
                  .then(
                               function(d) {
                                    self.keywords = d;
                                    console.out('Successfull');
                               },
                                function(errResponse){
                                    console.error('Error while fetching Keywords');
                                }
                       );
          };
}]);
'use strict';
 
App.controller('AppController', ['$scope', 'keywordService', function($scope, KeywordService) {
          var self = this;
          self.keywords;
          self.keywordObject=null;
               
          self.listAllKeywords = function(keyword){
        	  KeywordService.listAllKeywords(keyword)
                  .then(
                               function(d) {
                                    self.keywords = d;
                                    console.out('Successfull' + d);
                               },
                                function(errResponse){
                                    console.error('Error while fetching Keywords');
                                }
                       );
          };
}]);
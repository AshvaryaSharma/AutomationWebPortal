'use strict';

var app = angular.module('demo', ['ngSanitize', 'ui.select']);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */
app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);
        
      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

app.controller('DemoCtrl', function($scope, $http, $timeout, $interval) {
  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.setInputFocus = function (){
    $scope.$broadcast('UiSelectDemo1');
  };

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  };

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  };

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  

  

  $scope.counter = 0;
  $scope.someFunction = function (item, model){
    $scope.counter++;
    $scope.eventResult = {item: item, model: model};
  };

  $scope.removed = function (item, model) {
    $scope.lastRemoved = {
        item: item,
        model: model
    };
  };

  $scope.tagTransform = function (newTag) {
    var item = {
        name: newTag,
        email: newTag.toLowerCase()+'@email.com',
        age: 'unknown',
        country: 'unknown'
    };

    return item;
  };

  

  $scope.person = {};

  
  
  $scope.people = [];
  
  $scope.getAllApplications = function() {
		console.log("---------GETTING ALL APPLICATIONS-----------");
		
		$http.get("http://localhost:8080/AutomationToolWebPortal/webservice/findAllApplications")
			.success(function (response) {
				$scope.people = response;
				$scope.intializing = false;
				$scope.testattr ="gotdata";
			})
			.error(function() {
				
				$scope.errorMessage = "Not able to get application data"
				$scope.errorStatus = true;
			})
			
	}

  $scope.getAllApplications();

  

  $scope.appendToBodyDemo = {
    remainingToggleTime: 0,
    present: true,
    startToggleTimer: function() {
      var scope = $scope.appendToBodyDemo;
      var promise = $interval(function() {
        if (scope.remainingTime < 1000) {
          $interval.cancel(promise);
          scope.present = !scope.present;
          scope.remainingTime = 0;
        } else {
          scope.remainingTime -= 1000;
        }
      }, 1000);
      scope.remainingTime = 3000;
    }
  };

  
});

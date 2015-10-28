


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute','myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', pageName: 'Add Test Scripts'} );
    $routeProvider.when('/tables', {templateUrl: 'partials/tables.html', controller: 'TableCtrl', pageName: 'Add Test Scripts'});
    $routeProvider.when('/forms', {templateUrl: 'partials/forms.html'});
    $routeProvider.when('/blankPage', {templateUrl: 'partials/blankPage.html'});
    $routeProvider.otherwise({redirectTo: '/dashboard'});
  }]);


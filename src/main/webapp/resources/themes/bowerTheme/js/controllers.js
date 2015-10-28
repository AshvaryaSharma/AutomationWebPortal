

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('TableCtrl', ['$scope',function ($scope) {



        $scope.options = [
            { name: 'click', id: 'FieldId', arg1: 'FieldValue', arg2: '', arg3 : '', arg4:'', arg5:'' },
            { name: 'mousedown',  id: 'FieldId', arg1: 'FieldValue', arg2: '', arg3 : '', arg4:'', arg5:'' },
            { name: 'keydown',  id: 'FieldId', arg1: 'FieldValue', arg2: '', arg3 : '', arg4:'', arg5:''}
        ];

        var Event = { name: '', arg1: '', arg2 : '', arg3:'', arg4: ''} ;

        $scope.option = $scope.options[0];

        $scope.EventList = [
           angular.copy(Event)
        ];

        $scope.addEvent = function(){
            $scope.EventList.push(angular.copy(Event));
        };



    }])
.controller('MyCtrl6',['$scope', function($scope){

    }]);
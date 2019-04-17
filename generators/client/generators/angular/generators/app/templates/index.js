import angular from 'angular';

const app = angular.module('myApp', []);

app.directive('main', () => {
    return {
        restrict: 'E',
        template: '<div>hello {{name}}</div>',
        controller: function ($scope) {
            $scope.name = 'your name';
        }
    }
});

angular.element(function() {
    angular.bootstrap(global.document, ['myApp']);
});

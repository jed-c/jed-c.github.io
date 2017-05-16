//define new angular module and add dependencies in 2nd argument
var myModule = angular.module("mosesMapAngularModule", ["ui.router", "ngResource"]);

myModule.controller('FirstController', ['$scope', function($scope) {
    $scope.greet = 'Hi Im First Controller !';
}]);


myModule.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
        url: '/home',
        controller: 'homeController',
        controllerAs: 'vm',
        templateUrl: 'home.html'
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('home.detail', {
        url: 'detail/:projectName',
        controller: 'detailController',
        controllerAs: 'vm',
        templateUrl: 'detail.html',
        params: {
            "title": " ",
            "borough": " ",
            "year": " ",
            "image": " ",
            "info": " ",
            "link": " "
        }

    });

});

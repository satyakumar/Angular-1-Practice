var app = angular.module('app', []);
app.directive("progressBar", function () {
    return {
        scope: {
            value: '@defaultVal'
            , id: '@id'
        , }
        , controller: 'progressBarCtrl'
        , restrict: 'AE'
        , templateUrl: 'templates/progress-bar.html'
    , }
});
app.controller("progressBarCtrl", function ($scope, $rootScope, $element) {
    $rootScope[$scope.id] = {
        id: $scope.$id
        , value: $scope.value
        , bar: $scope.id
    }
    $scope.doProg = function (data) {
        //console.log($scope.id,data)
        if ($scope.id === data.bar) {
            $scope.value = parseInt(data.barCurrentVal) + parseInt(data.barNewVal);
            if ($scope.value <= 0) $scope.value = 0;
            if ($scope.value >= 230) $scope.value = 230;
            $rootScope[$scope.id].value = $scope.value;
        }
    }
    $scope.$on('eventFired', function (event, data) {
        $scope.doProg(data);
    })
});
app.directive("buttons", function () {
    return {
        restrict: 'AE'
        , templateUrl: 'templates/buttons.html'
        , controller: 'btnCtrl'
    , }
});
app.controller("btnCtrl", function ($scope, $rootScope, $element, doProgressService) {
    $scope.prop = {
        "type": "select"
        , "name": "Progress Bar"
        , "value": "progress-bar1"
        , "values": ["progress-bar1", "progress-bar2", "progress-bar3"]
    };
    $scope.progress = function (val) {
        $rootScope.selectedBar = $scope.prop.value;
        doProgressService.doProgress(val);
    }
});
app.service("doProgressService", function ($rootScope) {
    this.doProgress = function (val) {
        $rootScope.$broadcast('eventFired', {
            bar: $rootScope.selectedBar
            , barCurrentVal: $rootScope[$rootScope.selectedBar].value
            , barNewVal: val
        , });
    }
});
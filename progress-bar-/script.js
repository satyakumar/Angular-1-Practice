var app = angular.module('app', []);
app.directive("progressBar",function() {
  return {
    controller: 'progressBarCtrl',
    link:function(scope,elem,attrs) { console.log(scope);
        scope.prop = {
            "type": "select", 
            "name": "Progress Bar",
            "value": "Progress Bar 1", 
            "values": [ "Progress Bar 1", "Progress Bar 2", "Progress Bar 3"] 
        };
    scope.progress = function(v) {
      alert(v);
        console.log(scope.prop.value);
    }
      //if(attrs.id === 'bar1') attrs.defaultVal = 100;
      //console.log(attrs ,scope.prop.value);
      //$rootScope.ltVal = attrs.defaultVal;
    },
    restrict: 'AE' ,
    templateUrl: 'templates/progress-bar.html',
  }

});
app.controller("progressBarCtrl",function($scope,$rootScope,$element) {
 /* $scope.progress = function(v) {
      alert(v);
  }*/
 
});


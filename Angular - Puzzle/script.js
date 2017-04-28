// Code goes here
(function() {
  "use strict";
  var puzzleApp = angular.module("puzzleApp",[]);
  puzzleApp.controller("puzzleCtrl",["$scope","$timeout",function($scope,$timeout) {
    $scope.allIcons = {};
    $scope.matchedIcons = [];
    $scope.i = 1;
    $scope.doFlip = function(elem,className,boolean,time) {  
      $timeout(function() {
        if(className == "flip") 
        elem.flipClass = boolean;
        if(className == "match") 
        elem.matchClass = boolean;
      },time);
    };
  }]);
  puzzleApp.directive("grids",function() {
    return {
      templateUrl: "grid-template.html",
      scope: {
        icon: "@items",
      },
      link: function(scope,iElem,iAttr) {  
        var iconsObj = scope.$parent.allIcons;
        scope.flipClass = scope.matchClass = false;
        scope.flip = function(index,icon) { 
          if(scope.flipClass || scope.matchClass) {
            return;
          }
          scope.flipClass = true;
          if(scope.$parent.i%2 == 0) { 
              if(iAttr.items === iconsObj.icon) { 
                  scope.$parent.matchedIcons.push(iAttr.items);
                  scope.$parent.doFlip(scope,'flip',false,1000);
                  scope.$parent.doFlip(scope,'match',true,1000);
                  scope.$parent.doFlip(iconsObj.elemScope,'flip',false,1000);
                  scope.$parent.doFlip(iconsObj.elemScope,'match',true,1000);
                  if(scope.$parent.matchedIcons.length == 8) { 
                    alert("Game Over!")
                  }
              } else { 
                  scope.$parent.doFlip(scope,'flip',false,1000);
                  scope.$parent.doFlip(iconsObj.elemScope,'flip',false,1000);
              }
          } else { 
            iconsObj.elemScope = scope;
            iconsObj.icon = iAttr.items;
          }
          ++scope.$parent.i;
        }
      }
    }
  });
})();

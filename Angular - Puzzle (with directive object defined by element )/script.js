// Code goes here
(function() {
  "use strict";
  var puzzleApp = angular.module("puzzleApp",[]);
  puzzleApp.controller("puzzleCtrl",["$scope","$timeout",function($scope,$timeout) {
    $scope.allIcons = {};
    $scope.matchedIcons = [];
    $scope.i = 1;
    $scope.flipClass = false;
    $scope.doFlip = function(elem,classNames,time) {
      $timeout(function() {elem.toggleClass(classNames);},time);
    };
  }]);
  puzzleApp.directive("grids",function() {
    return {
      templateUrl: "grid-template.html",
      scope: {
        icon: "=items",
      },
      link: function(scope,iElem,iAttr) {  
        var iconsObj = scope.$parent.allIcons;
        scope.flip = function(index,icon) { 
          if(iElem.children().children().eq(index).children().hasClass("matched") || iElem.children().children().eq(index).children().hasClass("flipped")) {
            return;
          }
          iElem.children().children().eq(index).children().toggleClass("flipped");
          if(scope.$parent.i%2 == 0) { 
              if(icon === iconsObj.icon) { 
                  scope.$parent.matchedIcons.push(icon); 
                  scope.$parent.doFlip(iElem.children().children().eq(index).children(),"flipped matched",1000);
                  scope.$parent.doFlip(iconsObj.elem.children().children().eq(iconsObj.index).children(),"flipped matched",1000);
                  if(scope.$parent.matchedIcons.length == 8) { 
                    alert("Game Over!");
                  }
              } else {
                  scope.$parent.doFlip(iElem.children().children().eq(index).children(),"flipped",1000);
                  scope.$parent.doFlip(iconsObj.elem.children().children().eq(iconsObj.index).children(),"flipped",1000);
              }
          } else {
            iconsObj.index = index;
            iconsObj.elem = iElem;
            iconsObj.icon = icon;
          }
          ++scope.$parent.i;
        }
      }
    }
  });
})();

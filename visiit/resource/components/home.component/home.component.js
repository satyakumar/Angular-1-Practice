(function() {
   "use strict";
    angular.module("visiitApp")
    .component("homeComponent",{
        templateUrl: "resource/components/home.component/home.component.html",
        controllerAs: "homeComp",
        controller:[homeCtrl],
        
    })
    function homeCtrl() {
        
    }
}());
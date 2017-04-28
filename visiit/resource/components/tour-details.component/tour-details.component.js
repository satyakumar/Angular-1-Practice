(function () {
    "use strict";
    angular.module("visiitApp")
    .component("tourDetails",{
        templateUrl: "resource/components/tour-details.component/tour-details.component.html",
        controller: ["$http",detailsCtrl],
        controllerAs: "detailctrl",
    })
    function detailsCtrl($http) {
        var vm = this;
        vm.$routerOnActivate = function(next,previous) {
            vm.pkId = next.params.title; 
             $http.get("http://adminsite.visiit.com/viewDetails?packStr="+vm.pkId)
                    .then(function(res) {
                 console.log(res.data.packageViewDetailsModel);
             })
             .catch(function(res) {
                 console.log("Error :-", res);
             })
             
        }
        /*vm.$onInit = function() {
             console.log(vm.pkId)
        }*/
    }
})();
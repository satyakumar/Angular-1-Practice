(function () {
    "use strict";
    angular.module("visiitApp").component("hotDeals", {
        templateUrl: "resource/components/hot-deals.component/hot-deals.component.html"
        , controllerAs: "hotDeals"
        , controller: ["$http", "$interval", hotDealsCtrl]
    , })

    function hotDealsCtrl($http, $interval) {
        var vm = this;
        var resultObj = '';
        $http.get("http://adminsite.visiit.com/getAllSplPackagesByOrder?order=1").then(function (res) {
            console.log(res.data.packageModels);
            angular.forEach(res.data.packageModels, function (key, value) {
                    key.tinyUrlClean = key.imageUrl.replace(/,/g, "");
                    /*if(value == 1 || value == 10) {
                         key.tinyUrlClean =  '/package/PK00000266/tile/bangkok-city.jpg';
                    }*/
            });
            vm.hot_deals = res.data.packageModels;
        }).catch(function (res) {
            console.log("Error:- ", res);
        });
        /*slider*/
        var elem,index,allSpans,i=0;
        vm.homeslider = function () {  
            elem = angular.element(document.querySelector('.hot-deals-slider'));
            allSpans = angular.element(document.querySelector('#hot-deals')).find('span');
            allSpans.eq(i).removeClass("hot-deals-slider");
            allSpans.eq(i).addClass('ng-hide'); 
            i += 1; 
            if(vm.hot_deals && i == vm.hot_deals.length - 1) i = 0;
            allSpans.eq(i).addClass('.hot-deals-slider');
            allSpans.eq(i).removeClass('ng-hide');
            
        }
        $interval(function () {
            vm.homeslider();
        }, 4000);
       
    }
})();
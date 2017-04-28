(function () {
    "use strict";
    angular.module("visiitApp").component("seasonDeals", {
        templateUrl: "resource/components/seasonal-deals.component/seasonal-deals.component.html"
        , controller: ["$http","$interval", seasonCtrl]
        , controllerAs: 'seasonctrl'
    , });

    function seasonCtrl($http,$interval) {
        var vm = this;
        $http.get("http://adminsite.visiit.com/getAllSplPackagesByType?type=summer-special").then(function (res) {
            console.log(res.data.packageModels);
            angular.forEach(res.data.packageModels, function (key, value) {
                key.tinyUrlClean = key.imageUrl.replace(/,/g, "");
                if(value == 2 || value == 5) {
                         key.tinyUrlClean =  '/package/PK00000124/1';
                    }
            });
            vm.seasonObj = res.data.packageModels;
        }).catch(function (err) {
            console.log("error:- ", err);
        });
        /*slider*/
        var allSpans,i=0;
        vm.homeslider = function () {  
            allSpans = angular.element(document.querySelector('#season-deals')).find('span');
            //allImgs.eq(i).removeClass("hot-deals-slider");
            allSpans.eq(i).addClass('ng-hide'); 
            i += 1; 
            if(vm.seasonObj && i == vm.seasonObj.length - 1) i = 0;
            //allImgs.eq(i).addClass('.hot-deals-slider');
            allSpans.eq(i).removeClass('ng-hide');
        }
        $interval(function () {
            vm.homeslider();
        }, 4000);
    }
    
})();

 
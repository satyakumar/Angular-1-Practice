(function() {
   "use strict";
    angular
    .module("visiitApp",["ui.bootstrap","ngComponentRouter"])
    .value("$routerRootComponent","homePage")
    .component("homePage",{
        templateUrl:'/resource/root-template.html',
        controllerAs: 'rCtrl',
        controller:[rootCtrl],
        $routeConfig: [
          { 
            path: "/",
            component: "homeComponent",
            name: "Home"  
          },
          {   
            path:"/popular-trips",
              component: "popularTripComponent",
              name: "Popular Trips"
          },
          {
            path: "/package-details/:title",
            component: "tourDetails",
            name:"Tour Details"
          }
        ],
    });
    function rootCtrl() {
        
    }
})();
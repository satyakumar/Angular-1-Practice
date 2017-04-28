angular.module("mtyLazyLoading", ["ui.bootstrap"]).value("$routerRootComponent", "getList").component('getList', {
    templateUrl: './templates/home.html'
    , controllerAs: 'homeModel'
    , controller: ["$http", "$uibModal", homeCtrl]
});

function homeCtrl($http, $uibModal) {
    var vm = this;
    var uibModalInstance = $uibModal.open({
        templateUrl: 'templates/popup.html'
        , controllerAs: 'popupModel'
        , controller: ["$uibModalInstance", popupCtrl]
    });
    $http.get("https://jsonplaceholder.typicode.com/posts").then(function (response) {
        console.log(response)
        vm.posts = response.data;
    }).catch(function (e) {
        console.log("error", e);
    });
    vm.postDetails = function(id,body) { 
         var uibModalInstance = $uibModal.open({
            /*templateUrl: 'templates/popup-content.html',*/
            templateUrl: 'templates/popup.html',
            controllerAs: 'popupModel',
            controller: function($uibModalInstance) {
                pcModel = this;
                pcModel.id = id;
                pcModel.body = body;
                pcModel.close = function () {
                $uibModalInstance.close();
                    }
            },
        });
    }
}

function popupCtrl($uibModalInstance) {
    pModel = this;
    pModel.id = "Hai";
    pModel.body = "Welcome to Home page";
    pModel.close = function () {
        console.log('to close');
        $uibModalInstance.close();
    }
}
/*function popupContentCtrl($id,$body,$uibModalInstance) { 
    pcModel = this;
    pcModel.id = $id;
    pcModel.body = $body;
    pcModel.close = function () {
        console.log('to close');
        $uibModalInstance.close();
    }
}*/
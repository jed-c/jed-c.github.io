myModule.controller("detailController", function($stateParams, dataService) {
    var vm = this;
    vm.data = dataService;
    vm.stateParams = $stateParams
});
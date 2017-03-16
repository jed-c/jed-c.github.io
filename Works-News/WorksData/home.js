myModule.controller("homeController", function($resource, dataService) {
    var vm = this;
    vm.data = dataService;
});




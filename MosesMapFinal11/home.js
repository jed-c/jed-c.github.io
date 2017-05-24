myModule.controller("homeController", function($resource, $state) {
    var vm = this;
    vm.projecttype = [{
        id: "Bridge",
        image: "c01bridge.gif"
    }, {
        id: "Road",
        image: "c02road.gif"
    }, {
        id: "Parking Garage",
        image: "c03garage.gif"
    }, {
        id: "Office",
        image: "c04office.gif"
    }, {
        id: "Beach",
        image: "c05beach.gif"
    }, {
        id: "Aquarium",
        image: "c06aquarium.gif"
    }, {
        id: "City Park",
        image: "c07park.gif"
    }, {
        id: "Park",
        image: "c08park.gif"
    }, {
        id: "Golf Course",
        image: "c09golf.gif"
    }, {
        id: "Playground Park",
        image: "c10playground.gif"
    }, {
        id: "Pool",
        image: "c11pool.gif"
    }, {
        id: "Housing",
        image: "c12housing.gif"
    }, {
        id: "Civic Center",
        image: "c13civic.gif"
    }, {
        id: "Lincoln Center",
        image: "c14cultural.gif"
    }, {
        id: "University",
        image: "c15university.gif"
    }, {
        id: "School",
        image: "c16school.gif"
    }, 


    ];


vm.iclickedit = (project) => {
    console.log($state);
    $state.go("home", {
        project
    })

}
vm.featuresArrayHolder = featuresArrayHolder;
});

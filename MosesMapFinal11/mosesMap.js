myModule.directive("mapDirective", function($state, $timeout) {
    return {
        scope: {

        },
        link: (scope, element, attributes) => {

            mapboxgl.accessToken = 'pk.eyJ1IjoiamVkLWMiLCJhIjoiY2oxamswaGJzMDFiZzJ3cGtwa2Yzdzd1dCJ9.kSiot5p9XP1V7nJ_y-fSig';

            var bounds = [
                [-74.684502, 40.217842],
                [-71.559139, 41.385473]
            ];

            $timeout(() => {

                var mosesMap = new mapboxgl.Map({
                    container: 'mosesMap',
                    style: 'mapbox://styles/jed-c/cj252yyw1000p2snz5wr0ssib',
                    center: [-73.912505, 40.662370],
                    zoom: 9,
                    maxBounds: bounds
                });


                jedSetup(mosesMap, $state, $timeout);

            });
        },
        templateUrl: 'mosesMap.html'
    }
});

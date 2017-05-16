var colorMap = {
    "Aquarium": "#270562", //look
    "Beach": "#B34700",
    "Bridge": "#7A7A52",
    "City Park": "#339900", //find
    "Civic Center": "#774A8E", //find
    "Golf Course": "#66CC00",
    "Housing": "#5C5C8A",
    "Lincoln Center": "#BE4D6B", //find
    "Office": "#74452F", //find
    "Park": "#006600", //find
    "Parking Garage": "#552C18",
    "Playground Park": "#009966",
    "Pool": "#477CFF",
    "Road": "#42210B",
    "School": "#9A2E36", //find
    "University": "#8A5563" //find
}



myModule.directive("timelineDirective", function($state) {
    return {
        scope: {
            timelineData: "=",

        },
        link: (scope, element, attributes) => {
            scope.$watch("timelineData", (newVal, oldVal) => {
                if (!newVal) {
                    return;
                }

                var width = window.innerWidth,
                    barHeight = 15;

                var circleRadius = 4;    


                var graphicsWidth = window.innerWidth*.6;
                var graphicsHeight = newVal.maxCount*(circleRadius*2);

                var minYear = 1920;
                var maxYear = 1980;

                var height = graphicsHeight + 50;


                var margin = {
                    left: 0,
                    top: 5
                }

                var x = d3.scale.linear()
                    .domain([minYear, maxYear])
                    .range([0, graphicsWidth]);

                var y = d3.scale.linear()
                    .domain([0, newVal.maxCount])
                    .range([graphicsHeight, 0]);

                //console.log(element.find("svg")[0]);

                var chart = d3.select(element.find("svg")[0])
                    .attr("width", width)
                    .attr("height", height)
                    .attr("fill", "grey")                    
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var circles = chart.selectAll("g")
                    .data(newVal)
                    .enter().append("g");

                //here
                circles.append("ellipse")
                    .attr("rx", (d, i) => circleRadius)
                    .attr("ry", (d, i) => circleRadius)
                    .attr("fill", (d, i) => colorMap[d.properties.project])
                    .attr("cx", (d, i) => 50 + x(d.properties.year))
                    .attr("cy", (d, i) => graphicsHeight - (d.currentYearCount)*(circleRadius*2))
                    .on("click", (d, i) => {
                        $state.go("home.detail", {
                            projectName: d.properties.title,
                            title: d.properties.title,
                            borough: d.properties.borough,
                            year: d.properties.year,
                            image: d.properties.image,
                            info: d.properties.info
                        })
                    })
                    //.attr("y", (d, i) => "height" - y(d.count));



                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickFormat((d, i) => d);



                // var yAxis = d3.svg.axis()
                //     .scale(y)
                //     .orient("left")
                //     .tickFormat((d, i) => d);


                chart.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(50," + (height - 50) + ")")
                    .call(xAxis);

                // chart.append("g")
                //     .attr("class", "y axis")
                //     .attr("transform", "translate(50,0)")
                //     .call(yAxis);

            })
        },
        template: '<svg></svg>'
    }
});


// bar.append("text")
//     .attr("x", function(d) {
//         return x(d) - 3; })
//     .attr("y", barHeight / 2)
//     .attr("dy", ".35em")
//     .text(function(d) {
//         return d; });

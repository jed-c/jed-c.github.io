myModule.directive("barGraphDirective", function($resource, dataService) {
    return {
        scope: {
            barGraphData: "=",

        },
        link: (scope, element, attributes) => {
            scope.$watch("barGraphData", (newVal, oldVal) => {
                //console.log(newVal);
                if (!newVal || !newVal.countByYear) {
                    return;
                }
                var data = newVal.countByYear;
                //console.log(data);

                var width = 420,
                    barHeight = 15;

                var height = 400;

                var graphicsWidth = 350;
                var graphicsHeight = 350;

                var minYear = 1920;
                var maxYear = 2020;

                var margin = {
                    left: 0,
                    top: 5
                }

                var x = d3.scale.linear()
                    .domain([minYear, maxYear])
                    .range([0, graphicsWidth]);

                var y = d3.scale.linear()
                    .domain([0, 110])
                    .range([graphicsHeight, 0]);

                //console.log(element.find("svg")[0]);

                var chart = d3.select(element.find("svg")[0])
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var bar = chart.selectAll("g")
                    .data(data)
                    .enter().append("g");

                //here
                bar.append("rect")
                    .attr("width", (d, i) => graphicsWidth / (maxYear - minYear))
                    .attr("height", (d, i) => graphicsHeight - y(d.count))
                    .attr("fill", "forestgreen")
                    .attr("x", (d, i) => 50 + x(d.year))
                    .attr("y", (d, i) => y(d.count));
                    //.attr("y", (d, i) => "height" - y(d.count));

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickFormat((d, i) => d);

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .tickFormat((d, i) => d);


                chart.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(50," + (height - 50) + ")")
                    .call(xAxis);

                chart.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(50,0)")
                    .call(yAxis);

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

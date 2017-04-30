var table;

function preload() {
    table = loadTable("newMosesTable.csv", "csv", "header");
}

var iconLookUpMap = {
    "Aquarium": "t1",
    "Beach": "t2",
    "Bridge": "t3",
    "City Park": "t4",
    "Civic Center": "t5",
    "Golf Course": "t6",
    "Housing": "t7",
    "Lincoln Center": "t8",
    "Office": "t9",
    "Park": "t10",
    "Parking Garage": "t11",
    "Playground Park": "t12",
    "Pool": "t13",
    "Road": "t14",
    "School": "t15",
    "University": "t16"
}

function setup() {
    var featuresArray = [];

    for (var i = 0; i < table.getRowCount(); i++) {
        var row = table.getRow(i);
        //console.log(row.get(4), iconLookUpMap[row.get(4)]);

        featuresArray.push({

            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [row.get(2), row.get(3)]
            },
            "properties": {
                "title": row.get(0),
                "icon": iconLookUpMap[row.get(4)]
            }
        });
    }

    mosesMap.on('load', function() {
        mosesMap.addLayer({
            "id": "pointsKewl",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": featuresArray
                }
            },
            "layout": {
                "icon-image": "{icon}",
                "icon-allow-overlap": true,
                "icon-padding": 5,
                "text-field": "{title}",
                "text-optional": true,
                "text-allow-overlap": false,
                "text-padding": 15,
                "text-size": {
                    "stops": [
                        [9, 0],
                        [10, 6],
                        [11, 8],
                        [12, 10],
                        [13, 12],
                        [14, 14],
                        [15, 16],
                    ]
                },
                "text-font": ["Olsen SC Offc Pro Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        });
    });
}

function draw() {

}

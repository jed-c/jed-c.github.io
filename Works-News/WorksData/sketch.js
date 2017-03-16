var jedsReducedData;
var largestBar = 0;
var ralewayFont;

function preload() {
    data = loadJSON(`newMosesProjectData.json`);
    ralewayFont = loadFont('Raleway-Light.ttf');


}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(ralewayFont);
    noStroke();
    fill(255, 0, 0);
    textSize(10);
    smooth();


    function objToArray(obj) {
        var newArray = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newArray[parseInt(key)] = obj[key];
            }
        }
        return newArray;
    }

    var dataArray = objToArray(data);

    jedsReducedData = dataArray.filter((obj) => {
        return obj[0].body.response.docs.length !== 0;
    });

    jedsReducedData = jedsReducedData.map((curr) => {
        curr = objToArray(curr);
        const startDate = new Date();
        startDate.setYear(curr[0].year);

        //console.log(curr)
        var articleCount = curr.reduce((idx, page, memo) => {
            console.log(page)
            memo += page.body.response.docs.length;
            return memo;
        }, 0);
        return {
            projectName: curr[0].projectName,
            startDate: startDate,
            articleCount: articleCount
        }
    });

   // console.log(jedsReducedData)


    largestBar = jedsReducedData.reduce((idx, projectDataPoint, currentLargest) => {
        if (currentLargest > projectDataPoint.articleCount) {
            return currentLargest
        } else {
            return projectDataPoint.articleCount
        }
    }, 0);
}

function draw() {
    background(255);


    for (i = 0; i < jedsReducedData.length; i++) {

        var howWide = jedsReducedData[i].articleCount;

        fill(0);

        rect(20, i * 10, howWide, 10);
        text(jedsReducedData[i].projectName + " ____" + jedsReducedData[i].articleCount, 75 + largestBar, 10 + i * 10);
    }
}




//small change

// var reducedData = [{
//     projectName: '',
//     year: 1999,
//     countBucket: [{
//             bucketId: '1990-1999',
//             startDate: new Date(1990),
//             endDate: new Date(2000),
//             articleCount: 10
//         }, {
//             bucketId: '2000-2009',
//             startDate: new Date(2000),
//             endDate: new Date(2010),
//             articleCount: 18
//         },
//         {} //...
//     ]
// }]

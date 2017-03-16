var request = require("request");
var csvParse = require('csv-parse/lib/sync');
var fs = require('fs');
var request = require('sync-request');
var contents = fs.readFileSync('mosesDataTable.csv', 'utf8');
var parsedContents = csvParse(contents);
var nytData = {}
var sleep = require('thread-sleep');
var start = Date.now();
var end = Date.now();

// Return true if it has no more docs.
function theWorksData(projectName, year, page) {
    console.log('about to query ', projectName, year, page);

    var projectDate = "19240101";
    var res = request('GET', "https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        qs: {
            'api-key': "a1ba5b1f338c48e6b28bea03ed1a24f5",
            'q': '"' + projectName + '"',
            'begin_date': projectDate,
            'page': page
        }
    })

    body = JSON.parse(res.getBody());
    console.log(JSON.stringify(body));
    if (!nytData[projectName]) {
        nytData[projectName] = {};
    }
    nytData[projectName][page] = {
        projectName: projectName,
        year: year,
        body: body,
        page: page
    }
    return body.response.docs.length === 0;
}

for (let i = 61; i < parsedContents.length; i++) {
    var page = 0;
    var hasMorePages = true;
    while (hasMorePages) {
        try {
            hasMorePages = ! theWorksData(parsedContents[i][0], parsedContents[1][4], page);
        } catch (e) {
            console.error('got a exception', e);
            continue;
        }

        page++;

        if (page == 99) {
            hasMorePages = false;
            page = 0;
        }
        var contents = fs.writeFileSync("./truDataOutputSunday30000" + i + "_" + page + ".json", JSON.stringify(nytData));
        sleep(5000);
    }
}


//var contents = fs.writeFileSync("./newDataOutput.json", JSON.stringify(nytData));


// function requestt(i, page){
//     console.log("project -"+i+" and page - "+page);
//     theWorksData(parsedContents[i][0], parsedContents[i][4], page)
//     var contents = fs.writeFileSync(`newerOutput/dataOutputTs${i}-${page}.json`, JSON.stringify(nytData));
//     page++;

//     if(page == 99){
//         i++;
//         page=0;
//     }
//     if(i<parsedContents.length){
//         setTimeout(function(){
//             requestt(i,page);
//         },2500);
//     }
// }

// requestt(0,parsedContents[i][0], parsedContents[i][4], page0);
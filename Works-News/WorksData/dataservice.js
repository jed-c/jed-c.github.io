myModule.factory("dataService", function($resource) {
    var data = $resource("newMosesProjectData.json").query();
    var factoryData = {};

    data.$promise.then((data) => {
        factoryData.jedsReducedData = makeReducedData(data);
        factoryData.projects = makeReducedDataTWO(factoryData.jedsReducedData);
        console.log(factoryData.projects);
    })
    return factoryData;
});

var dateFormat = "YYYY-MM-DDTHH:mm:ssZ"
var sortableFormat = "YYYYMMDDHHmmss"



function parsedDate(article) {
    article.parsedDate = moment(article.pub_date, dateFormat);
    article.sortableTime = parseInt(article.parsedDate.format(sortableFormat));
    return article;
}

function makeReducedDataTWO(jedsReducedData) {

    return jedsReducedData.reduce((memo, object) => {
        memo[object.projectName] = object;
        return memo;
    }, {})
}


function makeReducedData(dataArray) {

    function objToArray(obj) {
        var newArray = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newArray[parseInt(key)] = obj[key];
            }
        }
        return newArray;
    }

    dataArray = objToArray(dataArray);
    var jedsReducedData = dataArray.filter((obj) => {
        return obj[0].body.response.docs.length !== 0;
    });

    jedsReducedData = jedsReducedData.map((curr) => {
        curr = objToArray(curr);
        const startDate = new Date();
        startDate.setYear(curr[0].year);

        //console.log(curr)
        var articleCount = curr.reduce((memo, page, idx) => {
            // console.log(page)
            memo += page.body.response.docs.length;
            return memo;
        }, 0);
        var articles = curr.reduce((memo, page, idx) => {
            //console.log(curr, memo);
            memo = memo.concat(page.body.response.docs)
            return memo;
        }, []);
        articles = articles.map(parsedDate);

        var countByYear = articles.reduce((memo, article) => {
            var year = parseInt(article.parsedDate.year());
            if (!memo[year]) {
                memo[year] = 0;
            }
            memo[year] += 1;
            return memo;
        }, {})

        var countByYearJed = [];
        Object.keys(countByYear).forEach(year => countByYearJed.push({count: countByYear[year], year: parseInt(year)}));  

        countByYearJed.sort((a, b) => a.year-b.year);  
        // countByYear = countByYear.reduce((memo, count, year) => {
        //     memo.push({ count, year })
        //     return memo;
        // }, [])

        return {
            projectName: curr[0].projectName,
            startDate: startDate,
            articleCount: articleCount,
            articles: articles,
            countByYear: countByYearJed
        }
    });
    return jedsReducedData;

}


function setup() {
    createCanvas(windowWidth, windowHeight);
    // load the colors.json file
    loadJSON('colors.json', showData);
    textAlign(CENTER);

}

function showData(data) {
    fill(data.green);
    textSize(150);
    text(data.green, width/2, height/2);
}

   	console.log("hi it's working");

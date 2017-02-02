
function setup() {
    createCanvas(windowWidth, windowHeight);
    // load the colors.json file
    loadJSON('colors.json', showData);
    textAlign(CENTER);

}

function showData(data) {
    fill(data.green);
    textSize(150);
    text(data.yellow, width/2, height/2);
}

   	console.log("wow hi lol");

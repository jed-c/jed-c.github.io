
function setup() {
    createCanvas(windowWidth, windowHeight);
    // load the colors.json file
    loadJSON('colors.json', showData);
    textAlign(CENTER);

}

function showData(data) {
    fill(data.red);
    textSize(150);
    text(data.red, width/2, height/2);
}

   	console.log("hello world ?????????");

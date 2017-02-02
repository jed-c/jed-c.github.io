
function setup() {
    createCanvas(windowWidth, windowHeight);
    // load the colors.json file
    loadJSON('colors.json', showData);
    textAlign(CENTER);

}

/*
function showData(data) {
    fill(data.black);
    textSize(150);
    text(data.black, width/2, height/2);
}
*/

   	console.log("waiting on a change");

function setup() {
	createCanvas(windowWidth, windowHeight);
}



function draw() {

	noStroke();

	fill(0);

	for(var i = 0; i < 25; i ++){
		fill(map(i,0, 25, 0, 255),map(i,0, 25, 255, 0),map(i,0, 25, 255, 0));
		var yPosition = map(i, 0, 25, 0, height-100);
		ellipse(windowWidth/2, 25+i+yPosition, 25+i, 25+i);
	}

}
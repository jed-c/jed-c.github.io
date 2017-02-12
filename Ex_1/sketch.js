function setup() {
	createCanvas(windowHeight, windowWidth);

}

function draw() {

	fill(255, 0, 0);
	stroke(0, 0, 255);
	strokeWeight(3);

	rect(150, 150, 75, 75);


	fill(0, 255, 0);
	stroke(255, 0, 0);
	ellipse(300, 300, 200, 200);


	fill(255, 0, 255);
	stroke(0, 255, 0);
	triangle(400, 100, 300, 200, 500, 200);
  
}
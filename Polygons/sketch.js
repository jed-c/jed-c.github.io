var x = [];
var y = [];

function setup() {
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(0);	
	stroke(200,0,0);
	
	//draw a rectangle
	fill(0, 170, 200, 150);

	rect(mouseX-100, mouseY-100, 100, 100, 20);
	
	// draw a line 	
	line(windowWidth/2, windowHeight/2,mouseX, mouseY);

	// draw a polygon with the values
	fill(100, 0, 0, 150);
	beginShape();
	for(var i=0; i<x.length; i++){
		vertex(x[i], y[i]);
		// var coordinateText = x[i] + "," +y[i];
		text(x[i] + "," +y[i], x[i], y[i]);
	}
	endShape(CLOSE);

}

function mouseReleased(){
	// console.log("click: " + mouseX + ", " + mouseY);

	append(x, mouseX);
	append(y, mouseY);

	console.log(x);
	// x.push();


}
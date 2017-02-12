function setup() {
	createCanvas(windowWidth, windowHeight);
}



function draw() {

	noStroke();

	var numberOfSteps = 15;
	var startCircumference = 10;
	var endCircumference = 100;
	var circumferenceStepSize = numberOfSteps / windowHeight * (startCircumference + endCircumference);
	var priorCircumference = 5;
	var priorY = 0
	var spaceInBetween = 1

	for(var i = 0; i < 25; i ++){
		fill(map(i,0, 25, 0, 255),map(i,0, 25, 255, 0),map(i,0, 25, 0, 255));
			var nextCircumference = priorCircumference + circumferenceStepSize;
		var nextY = priorY + priorCircumference/2 + nextCircumference/2 + spaceInBetween;
		ellipse(windowWidth/2, nextY, nextCircumference /2, nextCircumference /2);

		priorY = nextY;
		priorCircumference = nextCircumference;
	}
}

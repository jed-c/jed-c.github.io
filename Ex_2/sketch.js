var enlarge = 5;

function setup() {
	createCanvas(windowWidth, windowHeight);

}

function draw() {

	}

	function mousePressed() {

		noStroke();

		fill(random(0, 100), random(0, 175), random(0, 255));

		enlarge = enlarge + 1;

		rectMode(CENTER);
		if (mouseX <= width/2) {
			rect(mouseX, mouseY, enlarge, enlarge);
		} else {
			ellipse(mouseX, mouseY, enlarge, enlarge);



		}
	}

	function mouseReleased() {

		noStroke();

		fill(random(0, 100), random(0, 175), random(0, 255), random(0, 200));

		enlarge = enlarge + 1;

		rectMode(CENTER);
		if (mouseX <= width/2) {
			rect(mouseX, mouseY, enlarge, enlarge);
		} else {
			ellipse(mouseX, mouseY, enlarge, enlarge);
			}
		}
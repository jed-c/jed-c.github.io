
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
}

function draw() {

	var squareSizeW = windowWidth/8;
	var squareSizeH = windowHeight/8;

	noStroke();
	for(var x = 0; x < squareSizeW; x++) {
		for(var y = 0; y < squareSizeH; y++) {
			var isBlack = (x + y) % 2;
			fill(isBlack ? 255 : 0);
			rect(x * squareSizeW, y * squareSizeH, squareSizeW, squareSizeH);
			
			fill(255, 0, 0);
			textAlign(CENTER);
			textStyle(BOLD);
			text(String.fromCharCode(97 + x) + (y + 1), x * squareSizeW + squareSizeW/2, y * squareSizeH + squareSizeH/2);
		}
	}
}

var poem;

function preload() {
	poem = loadStrings('poem.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	fill(255);
	textSize(25);
	for (i = 0; i < poem.length; i++)
		text(poem[i], 60, 50+i*50);
}


function mousePressed() {
	shuffle(poem, true);
}
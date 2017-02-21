var table;
var font;
var fontsize = 20;
var treeRoot;
var levels = ["Borough", "Incident Zip", "Descriptor"];
var legend = { 
	"Borough" : [0,128,0],
	"Incident Zip" : [255,140,0],
	"Descriptor" : [139,69,19],
	//"Unique Key" : [255, 79, 0, 100]
	}

//treeRoot is an instance of TreeNode 


class TreeNode {
	constructor(nodeType, id) {
		this.nodeType = nodeType;
		this.rows = [];
		this.children = [];
		this.id = id;
		this.childRowCount = 0;
	}
}

// instance variables^^^^^



function insert(tree, row, levels) {

	var isLeaf = levels.length === 0;

	tree.childRowCount++;
	if (isLeaf) {
		tree.rows.push(row); 
		return;
	}

	var borough = row.get(levels[0]);
	var childTree = undefined;
	for(var i = 0; i < tree.children.length; i++){
		if (tree.children[i].id === borough) {
			childTree = tree.children[i];
			break;
		}
	}

	if (childTree === undefined) {
		childTree = new TreeNode(levels[0], borough);
		tree.children.push(childTree);
	}
	
	var remainingLevels = levels.slice(1);
	insert (childTree, row, remainingLevels);
	
}

function drawTree(tree, centerPosition, radius, startAngle, endAngle){
	//for every child, draw a line from the center postion outward
	for(var i = 0; i < tree.children.length; i++){
		var angle = startAngle + (endAngle - startAngle) * (i/tree.children.length)
		
		//only set color if there's an id
	
		var childTree = tree.children[i];
		if (childTree.nodeType) {
			var color = legend[childTree.nodeType];
			stroke(color[0], color[1], color[2]);
		}

		var endPosition = { 

			x: Math.cos(Math.PI + angle)*radius * Math.log(1 + childTree.childRowCount)/10 + centerPosition.x, 
			y: Math.sin(Math.PI + angle)*radius * Math.log(1 + childTree.childRowCount)/10 + centerPosition.y
		}

		strokeWeight(1);
		//strokeWeight(Math.log(1 + childTree.childRowCount));
		line(centerPosition.x, centerPosition.y, endPosition.x, endPosition.y);
		//if there are any more children on the tree, be recursive
		var isLeaf = childTree.children.length === 0;

		if (!isLeaf) {
			drawTree(childTree, endPosition, radius/3, startAngle, endAngle);
		} else {
			fill(0, 0, 255, 150);
			ellipse(endPosition.x, endPosition.y, 1, 1);
		}
	}
}

function preload() {
	table = loadTable("Damaged_Trees_jc_format.csv", "csv", "header");
	font = loadFont('Anonymous Pro Minus.ttf');

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);

	textFont(font);
    textSize(fontsize);

	treeRoot = new TreeNode();

	var rows = table.getRows();
	for(var i = 0; i < rows.length; i++){
		insert(treeRoot, rows[i], levels);
	}
}

function draw() {

	stroke(0);
	strokeWeight(1);
	var startSize = windowWidth/10;


	for(var i = 0; i < treeRoot.children.length; i++) {
		var position = {
			x: startSize+(windowWidth*i/treeRoot.children.length)+50, 
			y: windowHeight-100
		};
		var bounds = font.textBounds(treeRoot.children[i].id, 0, 0, fontsize);
		var textPosition = {
			x: position.x-bounds.w / 2,
			y: position.y + bounds.h+15 
		};
		drawTree(treeRoot.children[i], position, startSize, 0, Math.PI);
		fill(0);
		stroke(0);
		text(treeRoot.children[i].id, textPosition.x, textPosition.y);
	}
}


'use strict';

var table;
var treeRoot;
var levels = ["Borough", "Incident Zip", "Descriptor"];
var legend = { 
	"Borough" : [0,128,0],
	"Incident Zip" : [255,140,0],
	"Descriptor" : [139,69,19],
//	"Unique Key" : [255, 0, 175, 100]
	}


class TreeNode {
	constructor(nodeType, id) {
		this.nodeType = nodeType;
		this.rows = [];
		this.children = [];
		this.id = id;
		}
	}

function insert(tree, row, levels) {
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


	var isLeaf = levels.length === 1;

	if (isLeaf) {
	childTree.rows.push(row);
	} else {
		var remainingLevels = levels.slice(1);
		insert (childTree, row, remainingLevels);
	}
}

function drawTree(tree, centerPosition, radius){
	//for every child, draw a line from the center postion outward
	for(var i = 0; i < tree.children.length; i++){
		var endPosition = { 
			x: Math.cos((i/tree.children.length)*(Math.PI*2))*radius + centerPosition.x, 
			y: Math.sin((i/tree.children.length)*(Math.PI*2))*radius + centerPosition.y
		}
	
		//only set color if there's an id
	
		var childTree = tree.children[i];
		if (childTree.nodeType) {
			var color = legend[childTree.nodeType];
			stroke(color[0], color[1], color[2]);
		}
		line(centerPosition.x, centerPosition.y, endPosition.x, endPosition.y);
		//if there are any more children on the tree, be recursive
		var isLeaf = childTree.children.length === 0;

		if (!isLeaf) {
			drawTree(childTree, endPosition, radius/3);
		} else {
			fill(0, 0, 255, 150);
			ellipse(endPosition.x, endPosition.y, 2, 2);
		}

	}

}

function preload() {
	table = loadTable("Damaged_Trees_jc_format.csv", "csv", "header");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	
	treeRoot = new TreeNode();

	var rows = table.getRows();
	for(var i = 0; i < rows.length; i++){
		insert(treeRoot, rows[i], levels);

	}
}

function draw() {

	stroke(0);
	strokeWeight(1);

	drawTree(treeRoot, {x: windowWidth/2, y: windowHeight/2}, windowWidth/4);


}
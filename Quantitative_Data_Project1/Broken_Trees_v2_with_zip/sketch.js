var table;
var dataTreeRoot;
var levels = ["Borough", "Incident Zip", "Descriptor", "Unique Key"];
var legend = { 
	"Borough" : [205,133,63],
	"Incident Zip" : [255,140,0],
	"Descriptor" : [139,69,19],
 	"Unique Key" : [255, 79, 0, 100]
	}

var tree = [];
var leaves = [];
var count = 0;
var graphicsTreeRoot = undefined; 



class DataTreeNode {
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
		childTree = new DataTreeNode(levels[0], borough);
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



function preload() {
	table = loadTable("Damaged_Trees_jc_format.csv", "csv", "header");
}



class Branch {
	constructor(begin, end) {
	  this.begin = begin;
  	this.end = end;
  	this.finished = false;
	}
	setNodeType(nodeType) {
		this.nodeType = nodeType;
	}

  show() {
  	if (this.nodeType) {
 			var color = legend[this.nodeType];
 			stroke(color[0], color[1], color[2]);
		} else {
			stroke(139,69,19);
		}
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branchA() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 6);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  }

  branchB() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 4);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  }
}



function setup() {
	createCanvas(windowWidth, windowHeight);

 	dataTreeRoot = new DataTreeNode();
	var rows = table.getRows();
	for(var i = 0; i < rows.length; i++){
		insert(dataTreeRoot, rows[i], levels);
	}
	

	var a = createVector(width / 2, height);
	var b = createVector(width / 2, height*.75);
	graphicsTreeRoot = new Branch(a, b);

	nextLevel(dataTreeRoot, graphicsTreeRoot); 
}



function nextLevel(dataTree, graphicsTree) {

	//stop if no more

	if (dataTree.children.length === 0) {
		return;
	}

	//go to next level if 1 child remainds

	if (dataTree.children.length === 1){
		nextLevel(dataTree.children[0], graphicsTree);
	} else {

		var leftDataChildren = dataTree.children.slice(0, Math.floor(dataTree.children.length/2));
		var leftData = new DataTreeNode(dataTree.nodeType);
		leftData.children = leftDataChildren;

		var rightDataChildren = dataTree.children.slice(Math.floor(dataTree.children.length/2));
		var rightData = new DataTreeNode(dataTree.nodeType);
		rightData.children = rightDataChildren;

		graphicsTree.left = graphicsTree.branchA();
		graphicsTree.left.setNodeType(leftDataChildren[0].nodeType);
		graphicsTree.right = graphicsTree.branchB();
		graphicsTree.right.setNodeType(rightDataChildren[0].nodeType);
		
		nextLevel(leftData, graphicsTree.left);
		nextLevel(rightData, graphicsTree.right);
	}
}



function drawGraphicsTree(graphicsTree) {
	if (graphicsTree) {
		graphicsTree.show();
		drawGraphicsTree(graphicsTree.left);
		drawGraphicsTree(graphicsTree.right);
	}
}



function draw() {
  background(255);
  drawGraphicsTree(graphicsTreeRoot);
}

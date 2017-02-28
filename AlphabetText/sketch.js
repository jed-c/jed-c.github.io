/* text from § 12. THIRD LATERAN COUNCIL via http://www.gutenberg.org/files/54250/54250-0.txt */

// hash map for all words
var hash = [];
// hash map for all sorted words
var sorted = [];
var textX = 0;
var textY = 0;

function setup() {
createCanvas(windowWidth, windowHeight);
loadStrings('AlphabetText.txt', callback);
}

function callback(poem) {
// go through each line
for (i in poem) {
  // separate lines into words
  var li = poem[i].split(' '); 
  // go through each letter in each word
  for (var k in li) {
      // replace each of the letters we don't want
      var clean = li[k].replace(/[.,\'"-?!@#$%^&*()_~{}]/g, '');
      // add to the hash
      if (hash[clean] >= 1)
        hash[clean] += 1;
      else
        hash[clean] = 1;
  			}
		}

// make a copy of the hash
for (var key in hash){
 sorted.push([key, hash[key]]);

	}

sorted.sort(); 

}

function draw() {
background(0);

translate(textX, 20);
translate(20, textY);

for(var i=0; i<sorted.length; i++) {
	
	fill(255);
    var txtSize = sorted[i][1] * 30;
    textSize(txtSize);
    text(sorted[i][0], 50, 50*i, map(50+i+20, 0, 50+i+20, 0, windowHeight));
 
    
    var txtWidth = textWidth(sorted[i][0]);

	}
}

function mouseDragged() {
textY += mouseY - pmouseY;
}
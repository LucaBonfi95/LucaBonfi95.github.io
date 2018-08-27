/**
 * 
 */

//MAIN

var render = 0;

function update(progress) {
	if (ga.ready == true) {
		render++;
		draw();
		ga.nextGeneration();
	}
	document.getElementById("fitness").innerText = "Fitness: "+ga.generation.phenotypes[ga.generation.fittest()].fitness();
	document.getElementById("render").innerText = "Render: "+render;
	document.getElementById("progress").innerText = "Progress: "+ga.generation.progress;
}

function draw() {
	view.drawRawImage(ga.generation.phenotypes[ga.generation.fittest()]);
}

function loop(timestamp) {
	var progress = timestamp - lastRender;
	
	update(progress);
	
	lastRender = timestamp;
	if (!stopflag)
		window.requestAnimationFrame(loop);
}

function start() {
	stopflag = false;
	window.requestAnimationFrame(loop);
}

function stop() {
	stopflag = true;
}

var genotypes = [];

//for (var i = 0; i < MAX_POPULATION; i++) {
//	genotypes.push(new FloatArrayGenotype([]));
//	for (var j = 0; j < MAX_POLYGONS * (MAX_VERTICES * 3 + 3 + 1); j++) 
//		genotypes[i].values.push(Math.random() * 10000 );
//}

for (var i = 0; i < MAX_POPULATION; i++) {
	genotypes.push(new ExpressionGenotype(Exp.random(4,2)));
}


var ga = new GA(new Generation(genotypes));

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var view = new View(ctx);

var stopflag = false;
var lastRender = 0;
start();
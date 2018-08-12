/**
 * 
 */

//MAIN

var render = 0;

function update(progress) {
	ga.nextGeneration();
}

function draw() {
	view.draw(ga.generation.phenotypes[ga.generation.fittest()]);
	//view.draw(ga.generation.phenotypes[0].encode().decode());
	document.getElementById("fitness").innerText = "Fitness: "+ga.generation.phenotypes[ga.generation.fittest()].fitness();
	document.getElementById("render").innerText = "Render: "+render;
}

function loop(timestamp) {
	var progress = timestamp - lastRender;
	render++;
	
	update(progress);
	draw();

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

var initialGen = [];
var comp;
for (var i = 0; i < MAX_POPULATION; i++) 
	initialGen.push(PolygonComposition.random(MAX_POLYGONS));

var ga = new GA(new Generation([],initialGen));
ga.generation.updateGenotypes();

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var view = new View(ctx);

var stopflag = false;
var lastRender = 0;
start();
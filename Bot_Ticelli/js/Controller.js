/**
 * 
 */

//MAIN

function update(progress) {
	ga.nextGeneration();
}

function draw() {
	view.draw(new PolygonComposition([ga.generation.phenotypes[ga.generation.fittest()]]));
}

function loop(timestamp) {
	var progress = timestamp - lastRender;

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

var initialComp = [];
var comp;
for (var i = 0; i < MAX_POPULATION; i++) 
	initialComp.push(Polygon.random());

var ga = new GA(new Generation([],initialComp), DEFAULT_MUTATION_PROBABILITY);
ga.generation.updateGenotypes();

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var view = new View(ctx);

var stopflag = false;
var lastRender = 0;
start();
/**
 * 
 */

//MAIN

function update(progress) {
	ga.nextGeneration();
	comp = ga.composition;
}

function draw() {
	view.draw(comp);
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

var comp = PolygonComposition.random(MAX_POLYGONS);
var ga = new GA(new PolygonGenerationFactory());
ga.composition = comp;
ga.generation = ga.factory.newGeneration(comp);

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var view = new View(ctx);

var stopflag = false;
var lastRender = 0;
start();
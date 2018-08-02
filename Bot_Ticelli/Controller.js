/**
 * 
 */

//MAIN

var pol1 = new Polygon([{x:300, y:100},{x:400, y:50},{x:500, y:100},{x:450, y:200},{x:400, y:300},{x:300, y:200}], new Color(0, 255, 0));
var pol2 = new Polygon([{x:500, y:200},{x:600, y:150},{x:900, y:1000}], new Color(0, 0, 255));
var pol3 = new Polygon([{x:1300, y:200},{x:1200, y:50},{x:700, y:600}], new Color(255, 255, 0));
var pol4 = new Polygon([{x:500, y:500},{x:500, y:600},{x:600, y:600},{x:600,y:500}], new Color(255, 0, 0));
//var comp = new PolygonComposition([pol1, pol1, pol1, pol1, pol1, pol1, pol1, pol1, pol1, pol1]);
//var comp = new PolygonComposition([pol1, pol2, pol3, pol4]);
var comp = PolygonComposition.random(MAX_POLYGONS);

var ticks = 0;

var ga = new GA(new PolygonGenerationFactory());
ga.composition = comp;
ga.generation = ga.factory.newGeneration(comp);

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var view = new View(ctx);

function update(progress) {
	ticks += progress;

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
	window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);
/**
 * 
 */

// MAIN

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var pol1 = new Polygon([{x:300, y:100},{x:400, y:50},{x:500, y:100},{x:450, y:200},{x:400, y:300},{x:300, y:200}], "#00FF00");
var pol2 = new Polygon([{x:500, y:200},{x:600, y:150},{x:900, y:1000}], "#FF0000");
var pol3 = new Polygon([{x:1300, y:200},{x:1200, y:50},{x:700, y:600}], "#00FFFF");
var comp = new PolygonComposition([pol1, pol2, pol3], canvas.width, canvas.height);
var view = new View(ctx);

var ticks = 0;

function update(progress) {
	ticks += progress;
	
	if (ticks > 16.667) {
		ticks -= 16.667;
		comp.polygons[1].rotate(0.01);
	}
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
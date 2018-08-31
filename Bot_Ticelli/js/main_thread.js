/**
 * 
 */

//MAIN

var render = 0;
var genotypes = [];
var gaInfo, c, ctx, view, stopflag, lastRender, worker;

function update(e) {

	gaInfo = e.data;
	
	if (gaInfo.ready == true) {
		draw();
		document.getElementById("fitness").innerText = "Fitness: "+gaInfo.fitness;
		document.getElementById("render").innerText = "Generation: "+gaInfo.generation;
	}
	document.getElementById("progress").innerText = "Status: "+gaInfo.status;
	
}

function draw() {
	view.drawRawImage(gaInfo.imgData);
}

function start() {
	init();
}

function stop() {
	stopflag = true;
}

function init() {
	stopflag = false;
	
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	view = new View(ctx);

	lastRender = 0;
	
	worker = new Worker('../js/ga_thread.js');
	worker.onmessage = update;
	worker.postMessage('as');
}

if (typeof (OffscreenCanvas) == "undefined")
	alert("Your browser does not support OffscreenCanvas, you need Google Chrome 69+. Available here: https://www.google.com/chrome/beta/");
init();
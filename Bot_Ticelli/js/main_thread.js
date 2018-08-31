/**
 * 
 */

//MAIN

var render = 0;
var genotypes = [];
var gaInfo, view, stopflag, worker;

function update(e) {
	gaInfo = e.data;
	view.update(gaInfo);
}

function start() {
	init();
}

function stop() {
	stopflag = true;
}

function init() {
	stopflag = false;

	view = new View();

	worker = new Worker('../js/ga_thread.js');
	worker.onmessage = update;
	worker.postMessage('as');
}

if (typeof (OffscreenCanvas) == "undefined")
	alert("Your browser does not support OffscreenCanvas, you need Google Chrome 69+. Available here: https://www.google.com/chrome/beta/");
init();
/**
 * 
 */

//MAIN

var render = 0;
var genotypes = [];
var gaInfo, view, worker, selectedPhenotype;

function update(e) {
	gaInfo = e.data;
	view.update(gaInfo);
}

function togglePause() {
	view.togglePause();
	worker.postMessage(new Command(CMD_TOGGLE_PAUSE, []));
}

function updateFitnessMode(newFitnessMode) {
	fitnessMode = newFitnessMode;
	worker.postMessage(new Command(CMD_SET_FITNESS_MODE, [fitnessMode]));
} 

function selectPhenotype(index) {
	selectedPhenotype = index;
	view.selectPhenotype(index);
}

function setFitness(value) {
	value = parseInt(value, 10);
	gaInfo.newPhenotypes[selectedPhenotype].fitness = value;
	worker.postMessage(new Command(CMD_SET_FITNESS, [selectedPhenotype, value]));
}

function nextGeneration() {
	worker.postMessage(new Command(CMD_NEXT_GENERATION, []));
}

function start() {
	init();
}

function init() {
	stopflag = false;

	view = new View();

	worker = new Worker('../js/ga_thread.js');
	worker.onmessage = update;
	worker.postMessage(new Command(CMD_INIT, []));
}

if (typeof (OffscreenCanvas) == "undefined")
	alert("Your browser does not support OffscreenCanvas, you need Google Chrome 69+. Available here: https://www.google.com/chrome/beta/");
init();
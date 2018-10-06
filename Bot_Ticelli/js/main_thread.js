/**
 * 
 */

//MAIN

var render = 0;
var genotypes = [];
var gaInfo, view, worker, selectedPhenotype, params;

function cmdHandler(e) {
	var cmd = e.data;
	if (cmd.name == CMD_UPDATE_VIEW) {
		gaInfo = cmd.args[0];
		view.update(gaInfo);
	}
	if (cmd.name == CMD_UPDATE_PARAMS) {
		view.updateParams(cmd.args[0], cmd.args[1]);
	}
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

function getHdImage() {
	worker.postMessage(new Command(CMD_REQ_HD_IMAGE, [selectedPhenotype]));
}

function changeCommonParam(index, value) {
	var p = parseFloat(value);
	if (p != NaN)
		worker.postMessage(new Command(CMD_CHANGE_COMMON_PARAM, [index, p]));
}

function changeGenotypeParam(index, value) {
	var p = parseFloat(value);
	if (p != NaN)
		worker.postMessage(new Command(CMD_CHANGE_GENOTYPE_PARAM, [index, p]));
}

function start() {
	worker.postMessage(new Command(CMD_INIT, []));
	view.start();
}

function init() {
	stopflag = false;

	view = new View();

	worker = new Worker('../js/ga_thread.js');
	worker.onmessage = cmdHandler;
}

if (typeof (OffscreenCanvas) == "undefined")
	alert("Your browser does not support OffscreenCanvas, you need Google Chrome 69+. If you are using Google Chrome, make sure to update it to the latest version.");
init();
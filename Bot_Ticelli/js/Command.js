/**
 * 
 */

// init
const CMD_INIT = "init";
// togglePause
const CMD_TOGGLE_PAUSE = "togglePause";
// setFitnessMode <fitnessMode>
const CMD_SET_FITNESS_MODE = "setFitnessMode";
// nextGeneration
const CMD_NEXT_GENERATION = "nextGeneration";
// setFitness <id> <fitness>
const CMD_SET_FITNESS = "setFitness";

const FITNESS_MODE_AUTO = 0;
const FITNESS_MODE_MANUAL = 1;

class Command {
	
	constructor(name, args) {
		this.name = name;
		this.args = args;
	}
	
}
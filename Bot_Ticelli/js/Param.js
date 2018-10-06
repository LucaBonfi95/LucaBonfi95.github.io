class Param {
	
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
	
}

const MAX_POPULATION_INDEX = 0;
const WIDTH_INDEX = 1;
const HEIGHT_INDEX = 2;
const HD_WIDTH_INDEX = 3;
const HD_HEIGHT_INDEX = 4;

var parameters = Array(5);

parameters[MAX_POPULATION_INDEX] = new Param("Population", MAX_POPULATION);
parameters[WIDTH_INDEX] = new Param("Preview Width", WIDTH);
parameters[HEIGHT_INDEX] = new Param("Preview Height", HEIGHT);
parameters[HD_WIDTH_INDEX] = new Param("HD Width", HD_WIDTH);
parameters[HD_HEIGHT_INDEX] = new Param("HD Height", HD_HEIGHT);
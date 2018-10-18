class Param {
	
	constructor(name, value, tip) {
		this.name = name;
		this.value = value;
		this.tip = tip;
	}
	
}

const MAX_POPULATION_INDEX = 0;
const WIDTH_INDEX = 1;
const HEIGHT_INDEX = 2;
const HD_WIDTH_INDEX = 3;
const HD_HEIGHT_INDEX = 4;
const CROSSOVER_ENABLED_INDEX = 5;
const MUTATION_ENABLED_INDEX = 6;

const MAX_POPULATION_TIP = 
	'The number of individuals handled by the genetic algorithm. Must be an even number.';
const WIDTH_TIP = 
	'Width (pixels) of the preview images, the higher the slower.';
const HEIGHT_TIP = 
	'Height (pixels) of the preview images, the higher the slower.';
const HD_WIDTH_TIP = 
	'Width (pixels) of the HD rendered images (created after pressing the "HD Render" button).';
const HD_HEIGHT_TIP = 
	'Height (pixels) of the HD rendered images (created after pressing the "HD Render" button).';
const CROSSOVER_ENABLED_TIP = 
	'Enables or disables crossover between genotypes (0 = disabled, 1 = enabled)';
const MUTATION_ENABLED_TIP = 
	'Enabled or disables genotypes mutation (0 = disabled, 1 = enabled)';

var parameters = Array(7);

parameters[MAX_POPULATION_INDEX] = new Param("Population", MAX_POPULATION, MAX_POPULATION_TIP);
parameters[WIDTH_INDEX] = new Param("Preview Width", WIDTH, WIDTH_TIP);
parameters[HEIGHT_INDEX] = new Param("Preview Height", HEIGHT, HEIGHT_TIP);
parameters[HD_WIDTH_INDEX] = new Param("HD Width", HD_WIDTH, HD_WIDTH_TIP);
parameters[HD_HEIGHT_INDEX] = new Param("HD Height", HD_HEIGHT, HD_HEIGHT_TIP);
parameters[CROSSOVER_ENABLED_INDEX] = new Param("Crossover Enabled", CROSSOVER_ENABLED, CROSSOVER_ENABLED_TIP);
parameters[MUTATION_ENABLED_INDEX] = new Param("Mutation Enabled", MUTATION_ENABLED, MUTATION_ENABLED_TIP);
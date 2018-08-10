/**
 * 
 */

class Genotype {
	
	constructor() {}
	
	decode() {
		throw new Error('Override me!');
	}
	
	mutate() {
		throw new Error('Override me!');
	}
	
	crossover(genotype) {
		throw new Error('Override me!');
	}
	
}
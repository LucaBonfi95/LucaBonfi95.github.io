/**
 * 
 */

class Genotype {
	
	constructor(updateProgressCallback) {
		this.updateProgressCallback = updateProgressCallback;
	}
	
	decode() {
		throw new Error('Override me!');
	}
	
	mutate() {
		throw new Error('Override me!');
	}
	
	crossover(genotype) {
		throw new Error('Override me!');
	}
	
	clone(genotype) {
		throw new Error('Override me!');
	}
	
}
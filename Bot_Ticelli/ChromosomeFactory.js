/**
 * 
 */

class ChromosomeFactory {
	
	constructor() {
		
	}
	
	newIndividual(chromosome) {
		throw new Error('Override me');
	}
	
	newChromosome(individual) {
		throw new Error('Override me');
	}
	
}
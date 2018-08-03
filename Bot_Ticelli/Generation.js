/**
 * 
 */

class Generation {
	
	constructor(chromosomes, individuals, chFactory) {
		this.chromosomes = chromosomes;
		this.individuals = individuals;
		this.chFactory = chFactory;
	}
	
	fittest() {
		var max = 0, ret = 0, temp = 0;
		for (var i = 0; i < this.individuals.length; i++) {
			temp = individuals[i].fitness();
			if (temp > max) {
				max = temp;
				ret = i;
			}
		}
		return ret;
	}
	
	updateIndividuals() {
		for (var i = 0; i < this.chromosomes.length; i++)
			this.individuals.push(this.chFactory.newIndividual(this.chromosomes[i]));
	}
	
	updateChromosomes() {
		for (var i = 0; i < this.individuals.length; i++) 
			this.chromosomes.push(this.chFactory.newChromosome(this.individuals[i]));
	}
	
}
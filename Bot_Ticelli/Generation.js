/**
 * 
 */

class Generation {
	
	constructor(chromosomes, individuals) {
		this.chromosomes = chromosomes;
		this.individuals = individuals;
	}
	
	fittest() {
		var max = 0, ret = 0, temp = 0;
		for (var i = 0; i < this.individuals.length; i++) {
			temp = this.individuals[i].fitness();
			if (temp > max) {
				max = temp;
				ret = i;
			}
		}
		return ret;
	}
	
	updateIndividuals() {
		var newIndividuals = [];
		for (var i = 0; i < this.individuals.length; i++)
			newIndividuals.push(this.individuals[i].decode(this.chromosomes[i]));
		this.individuals = newIndividuals;
	}
	
	updateChromosomes() {
		var newChromosomes = [];
		for (var i = 0; i < this.individuals.length; i++) 
			newChromosomes.push(this.individuals[i].encode());
		this.chromosomes = newChromosomes;
	}
	
}
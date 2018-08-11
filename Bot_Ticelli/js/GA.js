/**
 * 
 */
class GA {

	constructor(initialGeneration, mutationProbability) { 
		this.generation = initialGeneration;
		this.mutationProbability = mutationProbability;
	}
	
	nextGeneration() {
		var genotype1, genotype2, nextGen;
		nextGen = new Generation([],this.generation.phenotypes);
		for (var i = 0; i < this.generation.genotypes.length; i+=2) {
			genotype1 = this.extract();
			do
				genotype2 = this.extract();
			while (genotype2 == genotype1);
			
			genotype1 = this.generation.genotypes[genotype1].clone();
			genotype2 = this.generation.genotypes[genotype2].clone();
			
			genotype1.crossover(genotype2);
			genotype1.mutate();
			genotype2.mutate();

			nextGen.genotypes.push(genotype1);
			nextGen.genotypes.push(genotype2);
		}
		nextGen.updatePhenotypes();		
		this.generation = nextGen;
	}

	extract() {
		var probs = [];
		for (var i = 0; i < this.generation.genotypes.length; i++) {
			if (i == 0)
				probs.push(this.generation.phenotypes[i].fitness());
			else
				probs.push(probs[i - 1] + this.generation.phenotypes[i].fitness());
		}
		var r = Math.random() * probs[probs.length - 1];
		for (var i = 0; i < this.generation.genotypes.length; i++) {
			if (i == 0 && probs[0] >= r)
				return 0;
			else if (probs[i - 1] <= r && r <= probs[i])
				return i;
		}
	}

}
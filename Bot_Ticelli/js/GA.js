/**
 * 
 */
class GA {

	constructor(initialGeneration) { 
		this.generation = initialGeneration;
	}
	
	nextGeneration() {
		var genotype1, genotype2, newGenotypes, attempts;
		newGenotypes = [];
		for (var i = 0; i < this.generation.genotypes.length; i+=2) {
			genotype1 = this.extract();
			attempts = 0;
			do {
				attempts++;
				genotype2 = this.extract();
			}
			while (genotype2 == genotype1 && attempts <= 10);
			
			genotype1 = this.generation.genotypes[genotype1].clone();
			genotype2 = this.generation.genotypes[genotype2].clone();
			
			genotype1.crossover(genotype2);
			genotype1.mutate();
			genotype2.mutate();

			newGenotypes.push(genotype1);
			newGenotypes.push(genotype2);
		}
		this.generation = new Generation(newGenotypes);
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
		return Math.floor(Math.random() * this.generation.genotypes.length);
	}

}
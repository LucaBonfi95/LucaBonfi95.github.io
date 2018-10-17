/**
 * 
 */
class GA {

	constructor(initialGenotypes, updateCallback) { 
		this.isInit = false;
		this.ready = false;
		this.status = "Idle";
		this.currentGeneration = 0;
		this.newGenotypes = initialGenotypes;
		this.newPhenotypes = [];
		this.updateCallback = updateCallback;
		this.generation = new Generation(initialGenotypes, []);
	}
	
	init() {
		this.isInit = true;
		this.updatePhenotypes();
		this.generation.phenotypes = this.newPhenotypes;
		this.ready = true;
		this.status = "Idle";
		this.raiseUpdate();
	}
	
	nextGeneration() {
		var genotype1, genotype2, crossoverEnabled, mutationEnabled;
		
		this.currentGeneration++;
		
		if (this.generation.phenotypes == [])
			this.generation.phenotypes = this.updatePhenotypes();
		
		this.ready = false;
		this.status = "Creating new genotypes";
		this.newGenotypes = [];
		
		crossoverEnabled = parameters[CROSSOVER_ENABLED_INDEX].value;
		mutationEnabled = parameters[MUTATION_ENABLED_INDEX].value;
		
		for (var i = 0; i < parameters[MAX_POPULATION_INDEX].value; i+=2) {
			genotype1 = this.extract();
			genotype2 = this.extract();
			
			genotype1 = this.generation.genotypes[genotype1].clone();
			genotype2 = this.generation.genotypes[genotype2].clone();
			
			if (crossoverEnabled === 1) {
				genotype1.crossover(genotype2);
			}	

			if (mutationEnabled === 1) { 
				genotype1.mutate();
				genotype2.mutate();
			}

			this.newGenotypes.push(genotype1);
			this.newGenotypes.push(genotype2);
			this.raiseUpdate();
		}
		this.updatePhenotypes();
		this.generation = new Generation(this.newGenotypes, this.newPhenotypes);
		this.ready = true;
		this.status = "Idle";
		this.raiseUpdate();
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
	
	updatePhenotypes() {
		this.newPhenotypes = [];
		this.status = this.status = "Creating new phenotypes ["+this.newPhenotypes.length+"/"+this.generation.genotypes.length+"]";
		this.raiseUpdate();
		for (var i = 0; i < this.newGenotypes.length; i++) {
			this.newPhenotypes.push(this.newGenotypes[i].decode());
			this.status = "Creating new phenotypes ["+this.newPhenotypes.length+"/"+this.newGenotypes.length+"]";
			this.raiseUpdate();
		}
	}
	
	raiseUpdate() {
		if (this.updateCallback != null)
			this.updateCallback();
	}

}
/**
 * 
 */
class GA {

	constructor(initialGenotypes, updateCallback) { 
		this.isInit = false;
		this.ready = false;
		this.status = "Idle";
		this.currentGeneration = 0;
		this.newGenotypesCreated = 0;
		this.newPhenotypesCreated = 0;
		this.updateCallback = updateCallback;
		this.generation = new Generation(initialGenotypes, []);
	}
	
	init() {
		this.isInit = true;
		this.generation.phenotypes = this.updatePhenotypes();
		this.ready = true;
		this.raiseUpdate();
	}
	
	nextGeneration() {
		if (this.generation.phenotypes == [])
			this.generation.phenotypes = this.updatePhenotypes();
		
		this.ready = false;
		this.status = "Creating new genotypes";
		var genotype1, genotype2, newGenotypes, attempts;
		newGenotypes = [];
		for (var i = 0; i < this.generation.genotypes.length; i+=2) {
			this.newGenotypesCreates = i;
			this.raiseUpdate();
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
		this.raiseUpdate();
		var newPhenotypes = this.updatePhenotypes();
		this.generation = new Generation(newGenotypes, newPhenotypes);
		this.ready = true;
		this.currentGeneration++;
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
		this.status = "Creating new phenotypes";
		var newPhenotypes = [];
		for (var i = 0; i < this.generation.genotypes.length; i++) {
			this.newPhenotypesCreated = i;
			this.status = "Creating new phenotypes ["+this.newPhenotypesCreated+"/"+this.generation.genotypes.length+"]";
			this.raiseUpdate();
			newPhenotypes.push(this.generation.genotypes[i].decode());
		}
		return newPhenotypes;
	}
	
	raiseUpdate() {
		if (this.updateCallback != null)
			this.updateCallback();
	}

}
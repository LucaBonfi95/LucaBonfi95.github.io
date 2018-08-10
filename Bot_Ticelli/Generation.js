/**
 * 
 */

class Generation {
	
	constructor(genotypes, phenotypes) {
		this.genotypes = genotypes;
		this.phenotypes = phenotypes;
	}
	
	fittest() {
		var max = 0, ret = 0, temp = 0;
		for (var i = 0; i < this.phenotypes.length; i++) {
			temp = this.phenotypes[i].fitness();
			if (temp > max) {
				max = temp;
				ret = i;
			}
		}
		return ret;
	}
	
	updatePhenotypes() {
		var newPhenotypes = [];
		for (var i = 0; i < this.genotypes.length; i++)
			newPhenotypes.push(this.genotypes[i].decode());
		this.phenotypes = newPhenotypes;
	}
	
	updateGenotypes() {
		var newGenotypes = [];
		for (var i = 0; i < this.phenotypes.length; i++) 
			newGenotypes.push(this.phenotypes[i].encode());
		this.genotypes = newGenotypes;
	}
	
}
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
	
}
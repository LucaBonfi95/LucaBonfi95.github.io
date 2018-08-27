/**
 * 
 */

class Generation {
	
	constructor(genotypes) {
		this.genotypes = genotypes;
		this.progress = 0;
		this.updatePhenotypes();
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
		for (var i = 0; i < this.genotypes.length; i++) {
			newPhenotypes.push(this.genotypes[i].decode());
			this.progress = 100 * i / this.genotypes.length;
		}
		this.phenotypes = newPhenotypes;
	}
	
}
/**
 * 
 */

class Generation {
	
	constructor(chromosomes) {
		this.chromosomes = chromosomes;
	}
	
	clone() {
		return new Generation(this.chromosomes.clone());
	}
	
}
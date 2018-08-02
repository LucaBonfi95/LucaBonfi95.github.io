/**
 * 
 */

class Chromosome {
	
	constructor(bits) { 
		this.bits = bits;
	}
	
	clone() {
		return new Chromosome(this.bits.clone());
	}
	
}
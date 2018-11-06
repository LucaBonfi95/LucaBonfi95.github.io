/**
 * 
 */

var ifsParameters = new Array(13);

class IFSGenotype extends Genotype {
	
	static random(dimensions, transformations) {
		return new IFSGenotype();
	}
	
	constructor() {
		super();
		this.decoder = new RawImageIFSGenotypeDecoder();
	}
	
	decode() {
		return this.decoder.decode(this);
	}
	
	mutate() {
		
	}
	
	crossover(genotype) {
		
	} 
	
	clone() { 
		return new IFSGenotype();
	}
	
}
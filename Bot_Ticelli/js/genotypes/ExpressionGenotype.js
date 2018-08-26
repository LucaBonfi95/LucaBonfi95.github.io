/**
 * 
 */

class ExpressionGenotype extends Genotype {
	
	constructor(exp) {
		super();
		this.exp = exp;
		this.decoder = new RawImageExpressionGenotypeDecoder();
	}
	
	decode() {
		return this.decoder.decode(this);
	}
	
	mutate() {
		return this;
	}
	
	crossover(genotype) {
		
	} 
	
	clone() { 
		return new ExpressionGenotype(this.exp.clone());
	}
	
}
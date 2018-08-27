/**
 * 
 */

class ExpressionGenotype extends Genotype {
	
	static random(levels, variables) {
		return new ExpressionGenotype(Exp.random(levels, variables));
	}
	
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
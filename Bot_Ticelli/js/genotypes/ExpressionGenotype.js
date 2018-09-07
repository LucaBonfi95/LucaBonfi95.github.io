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
		var exp1, exp2, child1, child2, temp, level;
		
		level = Math.floor(Math.random() * EXPRESSION_LEVELS);
		exp1 = this.exp;
		exp2 = genotype.exp;
		child1 = 0;
		child2 = 0;
		
//		console.log("[1] before crossover: "+this.exp.toString());
//		console.log("[2] before crossover: "+genotype.exp.toString());
		
		for (var i = 0; i < level; i++) {
			if (i != 0 && child1 != -1 && child2 != -1) {
				exp1 = exp1.children[child1];
				exp2 = exp2.children[child2];
			}
			
			child1 = Math.floor(Math.random() * exp1.children.length);
			child2 = Math.floor(Math.random() * exp2.children.length);
		}
		
//		console.log(exp1.children[child1].toString());
//		console.log(exp2.children[child2].toString());
		
		temp = exp1.children[child1];
		exp1.children[child1] = exp2.children[child2];
		exp2.children[child2] = temp;
		
//		console.log("[1] after crossover: "+this.exp.toString());
//		console.log("[2] after crossover: "+genotype.exp.toString());
		
	} 
	
	clone() { 
		return new ExpressionGenotype(this.exp.clone());
	}
	
}
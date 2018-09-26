/**
 * 
 */

var eg_maxConstValue = 10;
var eg_factorSigma = 0.2;
var eg_structureMutationProbability = 0.01;
var eg_valueMutationProbability = 0.5;
var eg_maxMutation = 400;
var eg_maxLambda = 0.2;
var eg_minLambda = -0.2;
var eg_mutationSigma = 0.2;

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
		var level, exp, child;

		if (Math.random() < eg_structureMutationProbability) {

			level = random_int(EXPRESSION_LEVELS - 1) + 1;
			exp = this.exp;
			child = [];

//			console.log("[] before mutation: "+this.exp.toString());

			for (var i = 0; i < level; i++) {
				if (i != 0 && child != []) 
					exp = exp.children[child[0]][child[1]][child[2]];

				child = [];
				child.push(Math.floor(Math.random() * exp.children.length));
				child.push(Math.floor(Math.random() * exp.children[child[0]].length));
				child.push(Math.floor(Math.random() * exp.children[child[0]][child[1]].length));
			}

			exp.children[child[0]][child[1]][child[2]] = Exp.random(EXPRESSION_LEVELS - level, 2);

//			console.log("[] after mutation: "+this.exp.toString());
			
		}
		
		this.mutateValues(this.exp, EXPRESSION_LEVELS);
		
	}
	
	mutateValues(exp, level) {
		if (level == 0) {
			if (exp.value != undefined)
				if (Math.random() < eg_valueMutationProbability)
					exp.value = random_normal(exp.value, eg_mutationSigma); 
		}
		else {
			if (Math.random() < eg_valueMutationProbability)
				exp.constant = random_normal(exp.constant, eg_mutationSigma);
			for (var i = 0; i < exp.children.length; i++) {
				if (Math.random() < eg_valueMutationProbability)
					exp.coefficients[i] = random_lognormal(exp.coefficients[i], eg_factorSigma);
				for (var j = 0; j < exp.children[i].length; j++)
					for (var k = 0; k < exp.children[i][j].length; k++)
						this.mutateValues(exp.children[i][j][k], level - 1);
			}
			
		}
	}
	
	crossover(genotype) {
		var exp1, exp2, child1, child2, temp, level;
		
		level = random_int(EXPRESSION_LEVELS - 1) + 1;
		exp1 = this.exp;
		exp2 = genotype.exp;
		child1 = [];
		child2 = [];
	
//		console.log("[1] before crossover: "+this.exp.toString());
//		console.log("[2] before crossover: "+genotype.exp.toString());
		
		for (var i = 0; i < level; i++) {
			if (i != 0 && child1 != [] && child2 != []) {
				exp1 = exp1.children[child1[0]][child1[1]][child1[2]];
				exp2 = exp2.children[child2[0]][child2[1]][child2[2]];
			}
			
			child1 = [];
			child2 = [];
			child1.push(Math.floor(Math.random() * exp1.children.length));
			child2.push(Math.floor(Math.random() * exp2.children.length));
			child1.push(Math.floor(Math.random() * exp1.children[child1[0]].length));
			child2.push(Math.floor(Math.random() * exp2.children[child2[0]].length));
			child1.push(Math.floor(Math.random() * exp1.children[child1[0]][child1[1]].length));
			child2.push(Math.floor(Math.random() * exp2.children[child2[0]][child2[1]].length));
		}
		
//		console.log(exp1.children[child1].toString());
//		console.log(exp2.children[child2].toString());
		
		temp = exp1.children[child1[0]][child1[1]][child1[2]];
		exp1.children[child1[0]][child1[1]][child1[2]] = exp2.children[child2[0]][child2[1]][child2[2]];
		exp2.children[child2[0]][child2[1]][child2[2]] = temp;
		
//		console.log("[1] after crossover: "+this.exp.toString());
//		console.log("[2] after crossover: "+genotype.exp.toString());
		
	} 
	
	clone() { 
		return new ExpressionGenotype(this.exp.clone());
	}
	
}
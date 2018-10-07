/**
 * 
 */
const EG_MAX_CONST_VALUE = 10;
const EG_FACTOR_SIGMA = 0.2;
const EG_STRUCTURE_MUTATION_PROBABILITY = 0.01;
const EG_VALUE_MUTATION_PROBABILITY = 0.5;
const EG_MUTATION_SIGMA = 0.2;
const EG_EXPRESSION_LEVELS = 4;
const MAX_AFF_VALUE = 1;

const EG_MAX_CONST_VALUE_INDEX = 0;
const EG_FACTOR_SIGMA_INDEX = 1;
const EG_STRUCTURE_MUTATION_PROBABILITY_INDEX = 2;
const EG_VALUE_MUTATION_PROBABILITY_INDEX = 3;
const EG_MUTATION_SIGMA_INDEX = 4;
const EG_EXPRESSION_LEVELS_INDEX = 5;

var egParameters = new Array(6);

egParameters[EG_MAX_CONST_VALUE_INDEX] 
	= new Param("Max Constant Value", EG_MAX_CONST_VALUE);
egParameters[EG_FACTOR_SIGMA_INDEX] 
	= new Param("Factor Sigma", EG_FACTOR_SIGMA);
egParameters[EG_STRUCTURE_MUTATION_PROBABILITY_INDEX] 
	= new Param("Structural Mutation Probability", EG_STRUCTURE_MUTATION_PROBABILITY);
egParameters[EG_VALUE_MUTATION_PROBABILITY_INDEX] 
	= new Param("Value Mutation Probability", EG_VALUE_MUTATION_PROBABILITY);
egParameters[EG_MUTATION_SIGMA_INDEX] 
	= new Param("Value Mutation Sigma", EG_MUTATION_SIGMA);
egParameters[EG_EXPRESSION_LEVELS_INDEX]
	= new Param("Expression Levels", EG_EXPRESSION_LEVELS);

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
		var level, exp, child, structureMutationProb, expressionLevels;
		
		structureMutationProb = egParameters[EG_STRUCTURE_MUTATION_PROBABILITY_INDEX].value;
		expressionLevels = egParameters[EG_EXPRESSION_LEVELS_INDEX].value;
		
		if (Math.random() < structureMutationProb) {

			level = random_int(expressionLevels - 1) + 1;
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

			exp.children[child[0]][child[1]][child[2]] = Exp.random(expressionLevels - level, 2);

//			console.log("[] after mutation: "+this.exp.toString());
			
		}
		
		this.mutateValues(this.exp, expressionLevels);
		
	}
	
	mutateValues(exp, level) {
		
		var valueMutationProb, mutationSigma, factorSigma;
		
		valueMutationProb = egParameters[EG_VALUE_MUTATION_PROBABILITY_INDEX].value;
		mutationSigma = egParameters[EG_MUTATION_SIGMA_INDEX].value;
		factorSigma = egParameters[EG_FACTOR_SIGMA_INDEX].value;
		
		if (level == 0) {
			if (exp.value != undefined)
				if (Math.random() < valueMutationProb)
					exp.value = random_normal(exp.value, mutationSigma); 
			if (exp.defaultValue != undefined)
				if (Math.random() < valueMutationProb)
					exp.defaultValue = random_normal(exp.defaultValue, mutationSigma);
			if (exp.constant != undefined)
				if (Math.random() < valueMutationProb)
					exp.constant = random_normal(exp.constant, mutationSigma);
			if (exp.coefficient != undefined)
				if (Math.random() < valueMutationProb)
					exp.coefficient = random_lognormal(exp.coefficient, factorSigma);
		}
		else {
			if (Math.random() < valueMutationProb)
				exp.constant = random_normal(exp.constant, mutationSigma);
			for (var i = 0; i < exp.children.length; i++) {
				if (Math.random() < valueMutationProb)
					exp.coefficients[i] = random_lognormal(exp.coefficients[i], factorSigma);
				for (var j = 0; j < exp.children[i].length; j++)
					for (var k = 0; k < exp.children[i][j].length; k++)
						this.mutateValues(exp.children[i][j][k], level - 1);
			}
			
		}
	}
	
	crossover(genotype) {
		var exp1, exp2, child1, child2, temp, level;
		
		level = random_int(egParameters[EG_EXPRESSION_LEVELS_INDEX].value - 1) + 1;
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
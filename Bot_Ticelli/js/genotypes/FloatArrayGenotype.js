/**
 * 
 */

var mutationProbability = 0.01;
var maxMutation = 400;
var maxLambda = 0.2;
var minLambda = -0.2;
var sigma = 100;

class FloatArrayGenotype extends Genotype{
	
	constructor(values) {
		super();
		this.values = values;
		this.decoder = new PolygonFloatArrayGenotypeDecoder();
	}
	
	decode() {
		return this.decoder.decode(this);
	}
	
	// Mutation occurs adding a random number to an allele
	
	// Uniform Distribution
	
//	mutate() {
//		var mutation;
//		for (var i = 0; i < this.values.length; i++) {
//			if (Math.random() < mutationProbability) {
//				mutation = Math.random() * maxMutation;
//				if (Math.random() < 0.5)
//					mutation = -mutation;
//				this.values[i] += mutation;
//			}
//		}
//	}
	
	// Versiera
	
//	mutate() {
//		var mutation;
//		for (var i = 0; i < this.values.length; i++) {
//			if (Math.random() < mutationProbability) {
//				mutation = 10 * Math.tan(Math.random() * Math.PI / 2);
//				if (Math.random() < 0.5)
//					mutation = -mutation;
//				this.values[i] += mutation;
//			}
//		}
//	}
	
	// Gaussian
	
	mutate() {
		var mutation;
		for (var i = 0; i < this.values.length; i++) {
			if (Math.random() < mutationProbability) {
				mutation = sigma * randn_bm();
				this.values[i] += mutation;
			}
		}
	}
	
	crossover(genotype) {
		var lambda, temp;
		for (var i = 0; i < this.values.length; i++) {
			lambda = Math.random() * (maxLambda - minLambda) + minLambda;
			if (Math.random() < 0.5)
				lambda = 1 - lambda;
			temp = this.values[i];
			this.values[i] = lambda * temp + (1 - lambda) * genotype.values[i];
			genotype.values[i] = lambda * genotype.values[i] + (1 - lambda) * temp;
		}
	}
	
	clone() {
		var newValues = [];
		for (var i = 0; i < this.values.length; i++)
			newValues[i] = this.values[i];
		return new FloatArrayGenotype(newValues);
	}
	
}
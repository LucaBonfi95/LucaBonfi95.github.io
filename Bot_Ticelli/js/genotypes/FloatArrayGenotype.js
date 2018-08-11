/**
 * 
 */

var countP = 0;
var countM = 0;

class FloatArrayGenotype extends Genotype{
	
	constructor(values) {
		super();
		this.values = values;
		this.decoder = new PolygonFloatArrayGenotypeDecoder();
		this.mutationProbability = 0.1;
		this.maxMutation = 400;
		this.maxLambda = 1;
	}
	
	decode() {
		return this.decoder.decode(this);
	}
	
	mutate() {
		var mutation;
		for (var i = 0; i < this.values.length; i++) {
			if (Math.random() < this.mutationProbability) {
				mutation = Math.random() * this.maxMutation;
				if (Math.random() < 0.5) {
					mutation = -mutation;
					countM++;
				}
				else
					countP++;
				this.values[i] += mutation;
			}
		}
	}
	
	crossover(genotype) {
		var lambda, temp;
		for (var i = 0; i < this.values.length; i++) {
			lambda = Math.random() * this.maxLambda;
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
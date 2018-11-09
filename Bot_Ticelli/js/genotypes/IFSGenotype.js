/**
 * 
 */
const IFS_ZOOM = 1;
const IFS_ITERATIONS = 4;
const IFS_MUTATION_PROBABILITY = 0.5;
const IFS_MUTATION_SIGMA = 0.01;

const IFS_ZOOM_INDEX = 0;
const IFS_ITERATIONS_INDEX = 1;
const IFS_MUTATION_PROBABILITY_INDEX = 2;
const IFS_MUTATION_SIGMA_INDEX = 3;

const IFS_ZOOM_TIP = 'Do you really need an explanation on the meaning of "zoom"? WTF mate.';
const IFS_ITERATIONS_TIP = 'Number of iterations, the higher the better will be the results.';
const IFS_MUTATION_PROBABILITY_TIP = 'Probability that a mutation has to occur.';
const IFS_MUTATION_SIGMA_TIP = 'Mutation standard deviation.';

var ifsParameters = new Array(4);
ifsParameters[IFS_ZOOM_INDEX] = new Param("Zoom", IFS_ZOOM, IFS_ZOOM_TIP);
ifsParameters[IFS_ITERATIONS_INDEX] = new Param("Iterations", IFS_ITERATIONS, IFS_ITERATIONS_TIP);
ifsParameters[IFS_MUTATION_PROBABILITY_INDEX] = new Param("Mutation Chance", IFS_MUTATION_PROBABILITY, IFS_MUTATION_PROBABILITY_TIP);
ifsParameters[IFS_MUTATION_SIGMA_INDEX] = new Param("Mutation Sigma", IFS_MUTATION_SIGMA, IFS_MUTATION_SIGMA_TIP);

class IFSGenotype extends Genotype {
	
	static random(dimensions, transformations, updateProgressCallback) {
		var t = [];
		for (var i = 0; i < transformations; i++)
			t.push(Transformation.random(dimensions));
		return new IFSGenotype(t, updateProgressCallback);
	}
	
	constructor(transformations, updateProgressCallback) {
		super(updateProgressCallback);
		this.transformations = transformations;
		this.decoder = new DFRawImageIFSGenotypeDecoder(updateProgressCallback);
	}
	
	decode() {
		return this.decoder.decode(this);
	}
	
	mutate() {
		var chance, sigma;
		chance = ifsParameters[IFS_MUTATION_PROBABILITY_INDEX].value;
		sigma = ifsParameters[IFS_MUTATION_SIGMA_INDEX].value;
		for (var i = 0; i < this.transformations.length; i++) {
			for (var j = 0; j < this.transformations[i].coefficients.length; j++) {
				for (var k = 0; k < this.transformations[i].coefficients.length; k++)
					if (Math.random() < chance)
						this.transformations[i].coefficients[j][k] = random_lognormal(this.transformations[i].coefficients[j][k], sigma);
				if (Math.random() < chance)
					this.transformations[i].translation[j] = random_normal(this.transformations[i].translation[j], sigma);
			}
		}
	}
	
	crossover(genotype) {
		
	} 
	
	clone() { 
		var transformationsClone = [];
		for (var i = 0; i < this.transformations.length; i++)
			transformationsClone.push(this.transformations[i].clone());
		return new IFSGenotype(transformationsClone, this.updateProgressCallback);
	}
	
}
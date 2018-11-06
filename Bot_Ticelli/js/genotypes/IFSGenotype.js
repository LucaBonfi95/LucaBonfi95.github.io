/**
 * 
 */
const IFS_ZOOM = 2;
const IFS_ITERATIONS = 5;

const IFS_ZOOM_INDEX = 0;
const IFS_ITERATIONS_INDEX = 1;

const IFS_ZOOM_TIP = 'Do you really need an explanation on the meaning of "zoom"? WTF mate.';
const IFS_ITERATIONS_TIP = 'Number of iterations, the higher the better will be the results.';

var ifsParameters = new Array(2);
ifsParameters[IFS_ZOOM_INDEX] = new Param("Zoom", IFS_ZOOM, IFS_ZOOM_TIP);
ifsParameters[IFS_ITERATIONS_INDEX] = new Param("Iterations", IFS_ITERATIONS, IFS_ITERATIONS_TIP);

class IFSGenotype extends Genotype {
	
	static random(dimensions, transformations) {
		return new IFSGenotype();
	}
	
	constructor(transformations) {
		super();
		this.transformations = transformations;
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
		var transformationsClone = [];
		for (var i = 0; i < this.transformations.length; i++)
			transformationsClone.push(this.transformations[i].clone());
		return new IFSGenotype(transformationsClone);
	}
	
}
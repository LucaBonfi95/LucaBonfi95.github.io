/**
 * 
 */

class RawImage extends Phenotype {
	
	constructor(imageData) {
		super();
		this.imageData = imageData;
		this.fitnessCache = null;
	}
	
	fitness() {
		if (this.fitnessCache == null)
			this.fitnessCache = 1;
		return this.fitnessCache;
	}
	
}
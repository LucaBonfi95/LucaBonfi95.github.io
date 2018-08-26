/**
 * 
 */

class RawImage extends Phenotype {
	
	constructor(imageData) {
		super();
		this.imageData = imageData;
	}
	
	fitness() {
		return Math.random();
	}
	
}
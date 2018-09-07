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
		if (this.fitnessCache == null) {
			if (fitnessMode == FITNESS_MODE_AUTO) {
				this.fitnessCache = Math.random();
			}
			else if (fitnessMode == FITNESS_MODE_MANUAL) {
				this.fitnessCache = DEFAULT_FITNESS;
			}
		}
		return this.fitnessCache;
	}
	
}
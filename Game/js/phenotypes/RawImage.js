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
				this.fitnessCache = 0;
				for (var i = 0; i < this.imageData.data.length; i+=4){
					if (this.imageData.data[i] > 0)
						this.fitnessCache++;
				}
				console.log(this.fitnessCache);
				this.fitnessCache = this.fitnessCache / (this.imageData.width * this.imageData.height);
				this.fitnessCache = Math.pow(this.fitnessCache, 10);
			}
			else if (fitnessMode == FITNESS_MODE_MANUAL) {
				this.fitnessCache = DEFAULT_FITNESS;
			}
		}
		return this.fitnessCache;
	}
	
}
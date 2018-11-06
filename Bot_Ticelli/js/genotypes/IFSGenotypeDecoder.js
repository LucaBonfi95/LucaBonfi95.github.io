/**
 * 
 */

/**
 * 
 */

class IFSGenotypeDecoder {
	
	constructor() {}
	
	decode(ifsGenotype) {
		throw new Error('Override me!');
	}
	
}

class RawImageIFSGenotypeDecoder extends IFSGenotypeDecoder {

	constructor() {
		super();
		this.width = parameters[WIDTH_INDEX].value;
		this.height = parameters[HEIGHT_INDEX].value;
	}
	
	decode(ifsGenotype) {
		var canvas, rawImage, index;
		canvas = new OffscreenCanvas(this.width, this.height);
		this.ctx = canvas.getContext("2d");
		rawImage = new RawImage(this.ctx.getImageData(0, 0, this.width, this.height));
		index = 0;
		for (var i = 0; i < this.height * this.width; i++) {
			for (var color = 0; color < 3; color++) 
				rawImage.imageData.data[index++] = 100;
			rawImage.imageData.data[index++] = 255;
		}	
		return rawImage;
	}
	
}
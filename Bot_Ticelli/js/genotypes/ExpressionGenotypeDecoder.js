/**
 * 
 */

class ExpressionGenotypeDecoder {
	
	constructor() {}
	
	decode(expressionGenotype) {
		throw new Error('Override me!');
	}
	
}

class RawImageExpressionGenotypeDecoder extends ExpressionGenotypeDecoder {

	constructor() {
		super();
		this.width = parameters[WIDTH_INDEX].value;
		this.height = parameters[HEIGHT_INDEX].value;
	}
	
	decode(expressionGenotype) {
		var x1, y1, pixel, index, temp, lambda, res1, res2, width, height, canvas, rawImage, zoom, polar, samples, pixels, grayscale;
		canvas = new OffscreenCanvas(this.width, this.height);
		this.ctx = canvas.getContext("2d");
		rawImage = new RawImage(this.ctx.getImageData(0, 0, this.width, this.height));
		width = parameters[WIDTH_INDEX].value;
		height = parameters[HEIGHT_INDEX].value;
		zoom = egParameters[EG_ZOOM_INDEX].value;
		polar = egParameters[EG_POLAR_COORDINATES_INDEX].value;
		grayscale = egParameters[EG_GRAYSCALE_INDEX].value;
		if (grayscale == 1) {
			samples = new Array(width * height);
			pixels = new Array(width * height);
		}
		else {
			samples = new Array(width * height * 3);
			pixels = new Array(width * height * 3);
		}	
		
		// Collect samples
		
		index = 0;
		for (var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				for (var color = 0; color < (1-grayscale) * 2 + 1; color++) {
					x1 = (width / this.width) * (x - this.width/2) / zoom;
					y1 = (height / this.height) * (y - this.height/2) / zoom;
					if (polar == 1) {
						temp = x1;
						x1 = Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2));
						y1 = Math.atan2(y1,temp);
						lambda = (y1 + Math.PI)/(2*Math.PI);
						if (grayscale == 0) {
							res1 = expressionGenotype.exp.evaluate([x1, (y1 - Math.PI)/2, color]); 
							res2 = expressionGenotype.exp.evaluate([x1, (y1 + Math.PI)/2, color]);
						}
						else {
							res1 = expressionGenotype.exp.evaluate([x1, (y1 - Math.PI)/2]); 
							res2 = expressionGenotype.exp.evaluate([x1, (y1 + Math.PI)/2]);
						}
						samples[index++] = lambda * res1 + (1-lambda) * res2;
					}
					else {
						if (grayscale == 0) 
							samples[index++] = expressionGenotype.exp.evaluate([x1, y1, color]);
						else
							samples[index++] = expressionGenotype.exp.evaluate([x1, y1]);
					}
				}
//				samples[index++] = 1000*x1; // DEBUG
			}
		}
				
		// Normalize samples
		
		// atan normalization
//		for (var i = 0; i < samples.length; i++) {
//			pixels[i] = Math.floor(128 * (1 + 2 / Math.PI * Math.atan(Math.PI * samples[i] / 256)));
//		}
		
		// sgm normalization
//		for (var i = 0; i < samples.length; i++) {
//			pixels[i] = Math.floor(256 * (1 / (1 + Math.exp(-samples[i] / 256))));
//		}
		
		// z-score normalization
		var mu = 0;
		var sigma = 0;
		for (var i = 0; i < samples.length; i++)
			mu += samples[i];
		mu /= samples.length;
		for (var i = 0; i < samples.length; i++)
			sigma += Math.pow(samples[i] - mu, 2);
		sigma = Math.sqrt(sigma / (samples.length - 1));
		for (var i = 0; i < samples.length; i++) {
			pixels[i] = Math.floor(128 * (1 + (samples[i] - mu) / sigma));
		}
		
		// no normalization 
//		for (var i = 0; i < pixels.length; i++) {
//			pixels[i] = Math.floor(127 + samples[i]);
//		}
		
		// mod normalization 
//		for (var i = 0; i < pixels.length; i++) {
//			if (samples[i] >= 0)
//				pixels[i] = Math.floor((127 + samples[i]) % 256);
//			else
//				pixels[i] = Math.floor(256 - (256 - 127 - samples[i]) % 256);
//		}
		
		// Saturate pixels 
		
		for (var i = 0; i < pixels.length; i++) {
			if (pixels[i] > 255) pixels[i] = 255;
			if (pixels[i] < 0) pixels[i] = 0;
		}
		
		// Create image
		
		index = 0;
		for (var i = 0; i < this.height * this.width; i++) {
			if (grayscale == 1) {
				for (var color = 0; color < 3; color++) {
					rawImage.imageData.data[index++] = pixels[i];
				}
				rawImage.imageData.data[index++] = 255;
			}
			else {
				for (var color = 0; color < 3; color++) {
					rawImage.imageData.data[index++] = pixels[i * 3 + color];
				}
				rawImage.imageData.data[index++] = 255;
			}
		}	
		return rawImage;
	}
	
}
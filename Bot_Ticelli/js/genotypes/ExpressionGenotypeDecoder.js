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

	constructor(updateProgressCallback) {
		super();
		this.width = parameters[WIDTH_INDEX].value;
		this.height = parameters[HEIGHT_INDEX].value;
		this.callback = updateProgressCallback;
	}
	
	decode(expressionGenotype) {
		var x1, y1, pixel, index, temp, lambda, res1, res2, width, height, canvas, rawImage, zoom, polar, samples, pixels, grayscale, channels;
		canvas = new OffscreenCanvas(this.width, this.height);
		this.ctx = canvas.getContext("2d");
		rawImage = new RawImage(this.ctx.getImageData(0, 0, this.width, this.height));
		width = parameters[WIDTH_INDEX].value;
		height = parameters[HEIGHT_INDEX].value;
		zoom = egParameters[EG_ZOOM_INDEX].value;
		polar = egParameters[EG_POLAR_COORDINATES_INDEX].value;
		grayscale = egParameters[EG_GRAYSCALE_INDEX].value;
		channels = (1 - grayscale) * 2 + 1;
		samples = [];
		pixels = [];
		
		for (var i = 0; i < channels; i++) { 
			samples.push(new Array(this.width * this.height));
			pixels.push(new Array(this.width * this.height));
		}
		
		// Collect samples
		
		index = 0;
		for (var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				x1 = (PREVIEW_SIZE_X / this.width) * (x - this.width/2) / zoom;
				y1 = (PREVIEW_SIZE_Y / this.height) * (y - this.height/2) / zoom;
				if (polar == 1) {
					temp = x1;
					x1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
					y1 = Math.atan2(y1, temp);
					lambda = (y1 + Math.PI)/(2 * Math.PI);
					if (channels > 1) {
						for (var color = 0; color < channels; color++) {
							res1 = expressionGenotype.exp.evaluate([x1, (y1 - Math.PI)/2, color * 100]); 
							res2 = expressionGenotype.exp.evaluate([x1, (y1 + Math.PI)/2, color * 100]);
							samples[color][index] = lambda * res1 + (1 - lambda) * res2;
						}
					}
					else {
						res1 = expressionGenotype.exp.evaluate([x1, (y1 - Math.PI)/2]); 
						res2 = expressionGenotype.exp.evaluate([x1, (y1 + Math.PI)/2]);
						samples[0][index] = lambda * res1 + (1 - lambda) * res2;
					}

				}
				else {
					if (channels > 1) 
						for (var color = 0; color < channels; color++) 
							samples[color][index] = expressionGenotype.exp.evaluate([x1, y1, color * 100]);
					else
						samples[0][index] = expressionGenotype.exp.evaluate([x1, y1]);
				}
				index++;
			}
		}

		// Normalize samples
		
		for (var color = 0; color < channels; color++)
			pixels[color] = this.zscoreNorm(samples[color]);
		
		// Saturate pixels 
		
		for (var color = 0; color < channels; color++) 
			for (var i = 0; i < pixels.length; i++) {
				if (pixels[color][i] > 255) pixels[color][i] = 255;
				if (pixels[color][i] < 0) pixels[color][i] = 0;
			}
		
		// Create image
		
		index = 0;
		for (var i = 0; i < this.height * this.width; i++) {
			for (var color = 0; color < 3; color++) 
				rawImage.imageData.data[index++] = pixels[color * (1 - grayscale)][i];
			rawImage.imageData.data[index++] = 255;
		}	
		return rawImage;
	}
	
	noNorm(samples) {
		var pixels = Array(samples.length);
		for (var i = 0; i < pixels.length; i++) {
			pixels[i] = Math.floor(127 + samples[i]);
		}
		return pixels;
	}
	
	modNorm(samples) {
		var pixels = Array(samples.length);
		for (var i = 0; i < pixels.length; i++) {
			if (samples[i] >= 0)
				pixels[i] = Math.floor((127 + samples[i]) % 256);
			else
				pixels[i] = Math.floor(256 - (127 - samples[i]) % 256);
		}
		return pixels;
	}
	
	atanNorm(samples) {
		var pixels = Array(samples.length);
		for (var i = 0; i < samples.length; i++) {
			pixels[i] = Math.floor(128 * (1 + 2 / Math.PI * Math.atan(Math.PI * samples[i] / 256)));
		}
		return pixels;
	}
	
	sgmNorm(samples) {
		var pixels = Array(samples.length);
		for (var i = 0; i < samples.length; i++) {
			pixels[i] = Math.floor(256 * (1 / (1 + Math.exp(-samples[i] / 64))));
		}
		return pixels;
	}
	
	zscoreNorm(samples) {
		var pixels = Array(samples.length);
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
		return pixels;
	}
	
}
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
		this.width = WIDTH;
		this.height = HEIGHT;
	}
	
	decode(expressionGenotype) {
		var canvas = new OffscreenCanvas(this.width, this.height);
		this.ctx = canvas.getContext("2d");
		var rawImage = new RawImage(this.ctx.getImageData(0, 0, this.width, this.height));
		var x1, y1, pixel, index = 0, temp, lambda, res1, res2;

		for (var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				x1 = x - this.width/2;
				y1 = y - this.height/2;
				x1 = (WIDTH / this.width) * x1;
				y1 = (HEIGHT / this.height) * y1;
				x1 = x1 * 1/100;
				y1 = y1 * 1/100;
				temp = x1;
				x1 = Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2));
				y1 = Math.atan2(y1,temp);
				lambda = (y1 + Math.PI)/(2*Math.PI);
				res1 = expressionGenotype.exp.evaluate([x1,(y1 - Math.PI)/2]); 
				res2 = expressionGenotype.exp.evaluate([x1,(y1 + Math.PI)/2]);
				res1 = 127 * (1 + 2 / Math.PI * Math.atan(res1));
				res2 = 127 * (1 + 2 / Math.PI * Math.atan(res2));
				pixel = lambda * res1 + (1-lambda) * res2;
				for (var color = 0; color < 3; color++) {
					rawImage.imageData.data[index++] = pixel;
				}
				rawImage.imageData.data[index++] = 255;
			}	
		}
		
		return rawImage;
	}
	
}
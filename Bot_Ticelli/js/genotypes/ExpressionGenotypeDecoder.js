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
		var x1, y1, pixel, index = 0, temp;

		for (var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				for (var color = 0; color < 3; color++) {
					x1 = x - this.width/2;
					y1 = y - this.height/2;
					x1 = (WIDTH / this.width) * x1;
					y1 = (HEIGHT / this.height) * y1;
					x1 = x1 * 1/100;
					y1 = y1 * 1/100;
					temp = x1;
					x1 = Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2));
					y1 = Math.atan2(y1,temp);
					pixel = expressionGenotype.exp.evaluate([x1,y1]);
					pixel = 127 * (1 + 2 / Math.PI * Math.atan(pixel));
					rawImage.imageData.data[index++] = pixel;
				}
				rawImage.imageData.data[index++] = 255;
			}	
		}
		
		return rawImage;
	}
	
}
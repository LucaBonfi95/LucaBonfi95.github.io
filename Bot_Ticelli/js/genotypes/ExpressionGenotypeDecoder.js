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
		var canvas = new OffscreenCanvas(WIDTH, HEIGHT);
		this.ctx = canvas.getContext("2d");
	}
	
	decode(expressionGenotype) {
		var rawImage = new RawImage(this.ctx.getImageData(0, 0, WIDTH, HEIGHT));

		for (var y = 0; y < HEIGHT; y++) {
			for(var x = 0; x < WIDTH; x++) {
				for (var color = 0; color < 3; color++) 
					rawImage.imageData.data[y * WIDTH * 4 + x * 4 + color] = 127 * (1 + 2 / Math.PI * Math.atan(expressionGenotype.exp.evaluate([x - WIDTH/2,y - HEIGHT / 2])));
				rawImage.imageData.data[y * WIDTH * 4 + x * 4 + 3] = 255;
			}	
		}
		
		return rawImage;
	}
	
}
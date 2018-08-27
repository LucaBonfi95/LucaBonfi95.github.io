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
		var canvas = document.createElement("canvas");
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		this.ctx = canvas.getContext("2d");
	}
	
	decode(expressionGenotype) {
		var rawImage = new RawImage(this.ctx.getImageData(0, 0, WIDTH, HEIGHT));

		for (var y = 0; y < HEIGHT; y++) {
			for(var x = 0; x < WIDTH; x++) {
				for (var color = 0; color < 3; color++) {
					rawImage.imageData.data[y * WIDTH * 4 + x * 4 + color] = expressionGenotype.exp.evaluate([x,y]);
//					rawImage.imageData.data[y * WIDTH * 4 + x * 4 + color] = x % 255;
				}
				rawImage.imageData.data[y * WIDTH * 4 + x * 4 + 3] = 255;
			}	
			console.log(y);
		}
		
		return rawImage;
	}
	
}
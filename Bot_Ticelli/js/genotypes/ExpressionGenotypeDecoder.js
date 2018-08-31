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
		var x1, y1, pixel, index = 0;

		for (var y = 0; y < HEIGHT; y++) {
			for(var x = 0; x < WIDTH; x++) {
				for (var color = 0; color < 3; color++) {
//					x1 = (x - WIDTH/2) * Math.cos(y - HEIGHT/2);
//					y1 = (y - HEIGHT/2) * Math.sin(x - WIDTH/2);
					x1 = Math.sqrt(Math.pow((x - WIDTH/2),2) + Math.pow((y - HEIGHT/2),2));
					y1 = Math.atan2(y,x);
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
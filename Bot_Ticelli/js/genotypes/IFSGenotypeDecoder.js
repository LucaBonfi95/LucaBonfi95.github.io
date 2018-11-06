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
		
		function drawPolygon(x,y,ctx) {
			ctx.fillStyle = '#000';
			ctx.beginPath();
			ctx.moveTo(x[0], y[0]);
			for (var i = 1; i < x.length; i++)
				ctx.lineTo(x[i],y[i]);
			ctx.closePath();
			ctx.fill();
		}
		
		var canvas, rawImage, index, transformationsSet, tempSet, x, y, temp, iterations, zoom;
		
		iterations = ifsParameters[IFS_ITERATIONS_INDEX].value;
		zoom = ifsParameters[IFS_ZOOM_INDEX].value;
		
		canvas = new OffscreenCanvas(this.width, this.height);
		this.ctx = canvas.getContext("2d");
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		transformationsSet = [];
		for (var i = 0; i < ifsGenotype.transformations.length; i++) 
			transformationsSet.push(ifsGenotype.transformations[i]);
		
		for (var i = 0; i < iterations; i++) {
			tempSet = [];
			for (var j = 0; j < transformationsSet.length; j++)
				for (var k = 0; k < ifsGenotype.transformations.length; k++)
					tempSet.push(ifsGenotype.transformations[k].compose(transformationsSet[j]));
			for (var j = 0; j < tempSet.length; j++)
				transformationsSet[j] = tempSet[j];
		}
		
//		transformationsSet = [
//			new Transformation([[0.5, -0.3],[-0.4, 0.5]],[0,1])
//			];
		
		for(var i = 0; i < transformationsSet.length; i++) {
			x = [];
			y = [];
			temp = transformationsSet[i].apply([-0.5, -0.5]);
			x.push(temp[0] * this.width / zoom + this.width / 2);
			y.push(temp[1] * this.height / -zoom + this.height / 2);
			temp = transformationsSet[i].apply([-0.5, 0.5]);
			x.push(temp[0] * this.width / zoom + this.width / 2);
			y.push(temp[1] * this.height / -zoom + this.height / 2);
			temp = transformationsSet[i].apply([0.5, 0.5]);
			x.push(temp[0] * this.width / zoom + this.width / 2);
			y.push(temp[1] * this.height / -zoom + this.height / 2);
			temp = transformationsSet[i].apply([0.5, -0.5]);
			x.push(temp[0] * this.width / zoom + this.width / 2);
			y.push(temp[1] * this.height / -zoom + this.height / 2);
			drawPolygon(x,y,this.ctx);
		}
		
		rawImage = new RawImage(this.ctx.getImageData(0, 0, this.width, this.height));
		
//		index = 0;
//		for (var i = 0; i < this.height * this.width; i++) {
//			for (var color = 0; color < 3; color++) 
//				rawImage.imageData.data[index++] = 100;
//			rawImage.imageData.data[index++] = 255;
//		}	
		return rawImage;
	}
	
}
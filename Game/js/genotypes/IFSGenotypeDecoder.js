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

class BFRawImageIFSGenotypeDecoder extends IFSGenotypeDecoder {

	constructor(updateProgressCallback) {
		super();
		this.width = parameters[WIDTH_INDEX].value;
		this.height = parameters[HEIGHT_INDEX].value;
		this.callback = updateProgressCallback;
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

class DFRawImageIFSGenotypeDecoder extends IFSGenotypeDecoder {
	
	constructor(updateProgressCallback) {
		super();
		this.width = parameters[WIDTH_INDEX].value;
		this.height = parameters[HEIGHT_INDEX].value;
		this.callback = updateProgressCallback;
	}
	
	decode(ifsGenotype) {
		
		var canvas, rawImage, iterations, zoom, indexes, transformations, graph, backtracking, normalized, totalOperations, operationsCount, lastProgressUpdate, percentage, digits;
		
		iterations = ifsParameters[IFS_ITERATIONS_INDEX].value;
		zoom = ifsParameters[IFS_ZOOM_INDEX].value;

		operationsCount = 0;
		totalOperations = Math.pow(ifsGenotype.transformations.length, iterations);
		lastProgressUpdate = 0;
		percentage = 0;
		digits = Math.pow(10, parameters[PROGRESS_DECIMAL_DIGITS_INDEX].value);
		
		canvas = new OffscreenCanvas(this.width, this.height);
		this.ctx = canvas.getContext("2d");
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		rawImage = new RawImage(this.ctx.getImageData(0, 0, this.width, this.height));
		
		graph = [];
		for (var i = 0; i < this.width; i++) {
			graph.push([]);
			for (var j = 0; j < this.height; j++)
				graph[i].push(0);
		}
		
		indexes = [];
		transformations = [];
		indexes.push(0);
		transformations.push(new Transformation([[1,0],[0,1]],[0,0]));
		for (var i = 1; i < iterations + 1; i++) {
			indexes.push(0);
			transformations.push(ifsGenotype.transformations[0].compose(transformations[i-1]));
		}
		
		function condition() {
			for (var i = 1; i < indexes.length; i++)
				if (indexes[i] != ifsGenotype.transformations.length - 1)
					return false;
			return true;
		}
		
		function increment(v, i, base) {
			v[i] = (v[i] + 1) % base;
			if (i != 0 && v[i] == 0)
				increment(v, i-1, base);
		}
		
		function addPoint(w,h) {
			var x, y;
			x = transformations[transformations.length - 1].translation[0];
			y = -transformations[transformations.length - 1].translation[1];
			x = Math.floor(x * w / zoom + w / 2);
			y = Math.floor(y * h / zoom + h / 2);
			if (x < w && x > 0 && y < h && y > 0)
				graph[x][y]++;
		}
		
		addPoint(this.width, this.height);
		operationsCount++;
		while (!condition()) {
			increment(indexes, indexes.length - 1, ifsGenotype.transformations.length);
			backtracking = 0;
			for (var i = indexes.length - 1; i >= 0; i--) {
				if (indexes[i] != 0)
					i = -1;
				else
					backtracking++;
			}
			
//			console.log(transformations);
//			console.log(indexes);
			
			for (var i = transformations.length - backtracking - 1; i < transformations.length; i++)
				transformations[i] = ifsGenotype.transformations[indexes[i]].compose(transformations[i-1]);
			addPoint(this.width, this.height);
			operationsCount++;
			percentage = Math.floor(100 * digits * operationsCount / totalOperations) / digits;
			if (lastProgressUpdate != percentage)
 				this.callback(percentage);
			lastProgressUpdate = percentage;
		}
		
		var max, min;
		max = graph[0][0];
		min = max;
		
		for (var i = 0; i < this.width; i++)
			for (var j = 0; j < this.height; j++) {
				if (graph[i][j] > max)
					max = graph[i][j];
				if (graph[i][j] < min)
					min = graph[i][j];
			}
		
		normalized = [];
		for (var i = 0; i < this.width; i++) {
			normalized.push([]);
			for (var j = 0; j < this.height; j++) 
				normalized[i].push(256 * (graph[i][j] - min) / (max - min))
		}
		
		for (var i = 0; i < this.width; i++)
			for (var j = 0; j < this.height; j++) 
				normalized[i][j] = Math.floor(normalized[i][j]);
		
		for (var i = 0; i < this.width; i++)
			for (var j = 0; j < this.height; j++) {
				if (normalized[i][j] > 255)
					normalized[i][j] = 255;
				if (normalized[i][j] < 0)
					normalized[i][j] = 0;
			}
				
		var index = 0;
		for (var i = 0; i < this.width; i++)
			for (var j = 0; j < this.height; j++) {
				for (var c = 0; c < 3; c++)
					rawImage.imageData.data[index++] = normalized[j][i];
				rawImage.imageData.data[index++] = 255;
			}
		return rawImage;
	}
}
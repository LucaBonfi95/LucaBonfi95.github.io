/**
 * 
 */

class FloatArrayGenotypeDecoder {
	
	constructor() {}
	
	decode(floatArrayGenotype) {
		throw new Error('Override me!');
	}
	
}

class PolygonFloatArrayGenotypeDecoder extends FloatArrayGenotypeDecoder {
	
	constructor() {
		super();
		this.width = WIDTH;
		this.height = HEIGHT;
	}
	
	decode(floatArrayGenotype) {
		var r,g,b;
		r = Math.floor(Math.abs(floatArrayGenotype.values[0])) % 256;
		g = Math.floor(Math.abs(floatArrayGenotype.values[1])) % 256;
		b = Math.floor(Math.abs(floatArrayGenotype.values[2])) % 256;
		
//		r = 0, g = 0, b = 0;
		
		var polygon = new Polygon([], new Color(r,g,b));
		var x,y;
		
		for (var i = 3; i < floatArrayGenotype.values.length; i+=3) { 
			if (floatArrayGenotype.values[i] >= 0.5) {
				x = Math.abs(floatArrayGenotype.values[i + 1]) % this.width;
				y = Math.abs(floatArrayGenotype.values[i + 2]) % this.height;
				polygon.vertices.push({x:x, y:y});
			}
		}
		return polygon;
	}
	
}

class PolygonCompositionFloatArrayGenotypeDecoder extends FloatArrayGenotypeDecoder {
	
	constructor() {
		super();
		this.width = WIDTH;
		this.height = HEIGHT;
	}

	decode(floatArrayGenotype) {
		var r, g, b, polygon, x, y;
		var polygons = [];
		for (var j = 0; j < MAX_POLYGONS; j ++) {
//			if (floatArrayGenotype.values[j * (MAX_VERTICES * 3 + 4)] > 0) {
			if (true) {
				r = Math.floor(Math.abs(floatArrayGenotype.values[j * (MAX_VERTICES * 3 + 4) + 1])) % 256;
				g = Math.floor(Math.abs(floatArrayGenotype.values[j * (MAX_VERTICES * 3 + 4) + 2])) % 256;
				b = Math.floor(Math.abs(floatArrayGenotype.values[j * (MAX_VERTICES * 3 + 4) + 3])) % 256;

//				r = 0, g = 0, b = 0;

				polygon = new Polygon([], new Color(r,g,b));

				for (var i = 0; i < MAX_VERTICES; i++) { 
					if (floatArrayGenotype.values[j * (MAX_VERTICES * 3 + 4) + i * 3 + 4] > 0) {
						x = Math.abs(floatArrayGenotype.values[j * (MAX_VERTICES * 3 + 4) + i * 3 + 5]) % this.width;
						y = Math.abs(floatArrayGenotype.values[j * (MAX_VERTICES * 3 + 4) + i * 3 + 6]) % this.height;
						polygon.vertices.push({x:x, y:y});
					}
				}
				polygons.push(polygon);
			}
		}
		return new PolygonComposition(polygons);
	}
	
}
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
	}
	
	decode(floatArrayGenotype) {
		var r,g,b;
		r = Math.floor(Math.abs(floatArrayGenotype.values[0])) % 256;
		g = Math.floor(Math.abs(floatArrayGenotype.values[1])) % 256;
		b = Math.floor(Math.abs(floatArrayGenotype.values[2])) % 256;
		
		var polygon = new Polygon([], new Color(r,g,b));
		var x,y;
		
		for (var i = 3; i < floatArrayGenotype.values.length; i+=3) { 
			if (floatArrayGenotype.values[i] >= 0.5) {
				x = Math.abs(floatArrayGenotype.values[i + 1]) % WIDTH;
				y = Math.abs(floatArrayGenotype.values[i + 2]) % HEIGHT;
				polygon.vertices.push({x:x, y:y});
			}
		}
		return polygon;
	}
	
}

/**
 * 
 */

class PolygonEncoder {
	
	constructor() {}
	
	encode(polygon) {
		throw new Error('Override me!');
	}
	
}

class BitStringGenotypePolygonEncoder extends PolygonEncoder {
	
	constructor() {
		super();
	}
	
	encode(polygon) { 
		var bits = new BitString(0);
		var temp = new Uint32Array(2);

		bits.setLength(3 * 8 + 8 * 8 * MAX_VERTICES + MAX_VERTICES);

		bits.setByte(0, polygon.color.r());
		bits.setByte(1, polygon.color.g());
		bits.setByte(2, polygon.color.b());

		for(var i = 0; i < MAX_VERTICES && i < polygon.vertices.length; i++) {	
			temp[0] = polygon.vertices[i].x;
			temp[1] = polygon.vertices[i].y;

			bits.setByte(8 * i + 3 + 0, Math.floor(temp[0] / 16777216)); 	temp[0] = temp[0] % 16777216;
			bits.setByte(8 * i + 3 + 1, Math.floor(temp[0] / 65536)); 		temp[0] = temp[0] % 65536;
			bits.setByte(8 * i + 3 + 2, Math.floor(temp[0] / 256)); 		temp[0] = temp[0] % 256;
			bits.setByte(8 * i + 3 + 3, Math.floor(temp[0])); 			
			bits.setByte(8 * i + 3 + 4, Math.floor(temp[1] / 16777216)); 	temp[1] = temp[1] % 16777216;
			bits.setByte(8 * i + 3 + 5, Math.floor(temp[1] / 65536)); 		temp[1] = temp[1] % 65536;
			bits.setByte(8 * i + 3 + 6, Math.floor(temp[1] / 256));			temp[1] = temp[1] % 256;
			bits.setByte(8 * i + 3 + 7, Math.floor(temp[1])); 	

			bits.setBit(3 * 8 + 8 * 8 * MAX_VERTICES + i, true);
		}

		return new BitStringGenotype(bits);
	}
	
}

class FloatArrayGenotypePolygonEncoder extends PolygonEncoder {
	
	constructor() {
		super();
	}
	
	encode(polygon) {
		var values = new Array(MAX_VERTICES * 3 + 3);
		for (var i = 0; i < values.length; i++)
			values[i] = 0;
		
		values[0] = polygon.color.r();
		values[1] = polygon.color.g();
		values[2] = polygon.color.b();
		for (var i = 0; i < polygon.vertices.length; i++) {
			values[3 * i + 3] = 1;
			values[3 * i + 4] = polygon.vertices[i].x;
			values[3 * i + 5] = polygon.vertices[i].y;
		}
		return new FloatArrayGenotype(values);
	}
	
}
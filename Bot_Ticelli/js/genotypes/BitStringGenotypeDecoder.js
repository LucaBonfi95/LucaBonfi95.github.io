/**
 * 
 */

class BitStringGenotypeDecoder {
	
	constructor() {}
	
	decode(bitStringGenotype) {
		throw new Error('Override me!');
	}
	
}

class PolygonBitStringGenotypeDecoder extends BitStringGenotypeDecoder{
	
	constructor() {
		super();
		this.width = WIDTH;
		this.height = HEIGHT;
	}
	
	decode(bitStringGenotype) {
		var color = new Color(bitStringGenotype.bits.getByte(0), bitStringGenotype.bits.getByte(1), bitStringGenotype.bits.getByte(2));
		var vertices = [];
		var x, y;

		for (var i = 0; i < MAX_VERTICES; i++) {
			if (bitStringGenotype.bits.getBit(3 * 8 + 8 * 8 * MAX_VERTICES + i)) {
				x = bitStringGenotype.bits.getByte(8 * i + 3 + 0) * 16777216 + bitStringGenotype.bits.getByte(8 * i + 3 + 1) * 65536 + bitStringGenotype.bits.getByte(8 * i + 3 + 2) * 256 + bitStringGenotype.bits.getByte(8 * i + 3 + 3);
				y = bitStringGenotype.bits.getByte(8 * i + 3 + 4) * 16777216 + bitStringGenotype.bits.getByte(8 * i + 3 + 5) * 65536 + bitStringGenotype.bits.getByte(8 * i + 3 + 6) * 256 + bitStringGenotype.bits.getByte(8 * i + 3 + 7);
				vertices.push({x,y});
			}
		}

		return new Polygon(vertices, color);
		//TODO Set polygon width and height 
	}
	
}

class PolygonCompositionBitStringGenotypeDecoder extends BitStringGenotypeDecoder{
	
	constructor() {
		super();
		this.width = WIDTH;
		this.height = HEIGHT;
	}
	
	decode(bitStringGenotype) {
		throw new Error('Override me!');
	}
	
}
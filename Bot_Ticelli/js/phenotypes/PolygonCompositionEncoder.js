/**
 * 
 */
class PolygonCompositionEncoder {
	
	constructor() {}

	encode(polygonComposition) {
		throw new Error('Override me!');
	}
	
}

class BitStringGenotypePolygonCompositionEncoder extends PolygonCompositionEncoder{ 
	
	constructor() {
		super();
	}
	
	encode(polygonComposition) {
		throw new Error("Not implemented yet.");
	}
	
}

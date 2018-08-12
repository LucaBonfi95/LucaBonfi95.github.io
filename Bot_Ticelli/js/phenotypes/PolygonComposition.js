/**
 * 
 */

class PolygonComposition extends Phenotype {
	
	static random(polygonNo) {
		var polygons = [];
		var polygonNo;
		for (var i = 0; i < polygonNo; i++)
			polygons.push(Polygon.random());
		return new PolygonComposition(polygons);
	}
	
	constructor(polygons) { 
		super();
		this.encoder = new FloatArrayGenotypePolygonCompositionEncoder();
		this.polygons = polygons;
	}
	
	fitness() { 
		var ret = 1;
		for (var i = 0; i < this.polygons.length; i++)
			ret *= this.polygons[i].fitness();
		return ret;
	}
	
	encode() {
		return this.encoder.encode(this);
	}
	
}
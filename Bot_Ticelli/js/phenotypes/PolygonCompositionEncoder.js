/**
 * 
 */
class PolygonCompositionEncoder {

	constructor() {}

	encode(polygonComposition) {
		throw new Error('Override me!');
	}

}

class FloatArrayGenotypePolygonCompositionEncoder extends PolygonCompositionEncoder{ 

	constructor() {
		super();
	}

	encode(comp) {
		var values = new Array(MAX_POLYGONS * (MAX_VERTICES * 3 + 3 + 1));
		for (var i = 0; i < values.length; i++)
			values[i] = 0;

		for (var j = 0; j < comp.polygons.length; j++) {
			values[j * (MAX_VERTICES * 3 + 4) + 0] = 1;
			values[j * (MAX_VERTICES * 3 + 4) + 1] = comp.polygons[j].color.r();
			values[j * (MAX_VERTICES * 3 + 4) + 2] = comp.polygons[j].color.g();
			values[j * (MAX_VERTICES * 3 + 4) + 3] = comp.polygons[j].color.b();
			for (var i = 0; i < comp.polygons[j].vertices.length; i++) {
				values[j * (MAX_VERTICES * 3 + 4) + i * 3 + 4] = 1;
				values[j * (MAX_VERTICES * 3 + 4) + i * 3 + 5] = comp.polygons[j].vertices[i].x;
				values[j * (MAX_VERTICES * 3 + 4) + i * 3 + 6] = comp.polygons[j].vertices[i].y;
			}
		}
		return new FloatArrayGenotype(values);
	}

}

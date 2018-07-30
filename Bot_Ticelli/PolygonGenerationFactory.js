/**
 * 
 */

class PolygonGenerationFactory { 

	constructor() {

	}

	newGeneration(composition) {
		var chromosomes = [];
		for (var i = 0; i < composition.polygons.length; i++) 
			chromosomes.push(PolygonGenerationFactory.newChromosome(composition.polygons[i]));
		return new Generation(chromosomes);
	}

	newPolygonComposition(generation) {
		var polygons = [];
		for (var i = 0; i < generation.chromosomes.length; i++)
			polygons.push(PolygonGenerationFactory.newPolygon(generation.chromosomes[i]));
		return new PolygonComposition(polygons);
	}


	/**
	 * Encoding: 
	 * -------------------------------------------------------------------------------------
	 * |			   |						   |		 |						       |
	 * | Color 3 Bytes | Vertex 1 x,y 4 bytes each |   ...   | Vertex i enabled 1 bit each |
	 * |			   |						   |		 | 						  	   |
	 * -------------------------------------------------------------------------------------
	 */

	newChromosome(polygon) {
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

		return new Chromosome(bits);
	}

	newPolygon(chromosome) {
		var color = new Color(chromosome.bits.getByte(0), chromosome.bits.getByte(1), chromosome.bits.getByte(2));
		var vertices = [];
		var x, y;

		for (var i = 0; i < MAX_VERTICES; i++) {
			if (chromosome.bits.getBit(3 * 8 + 8 * 8 * MAX_VERTICES + i)) {
				x = chromosome.bits.getByte(8 * i + 3 + 0) * 16777216 + chromosome.bits.getByte(8 * i + 3 + 1) * 65536 + chromosome.bits.getByte(8 * i + 3 + 2) * 256 + chromosome.bits.getByte(8 * i + 3 + 3);
				y = chromosome.bits.getByte(8 * i + 3 + 4) * 16777216 + chromosome.bits.getByte(8 * i + 3 + 5) * 65536 + chromosome.bits.getByte(8 * i + 3 + 6) * 256 + chromosome.bits.getByte(8 * i + 3 + 7);
				x = x % WIDTH;
				y = y % HEIGHT;
				vertices.push({x,y});
			}
		}

		return new Polygon(vertices, color);
	}

}
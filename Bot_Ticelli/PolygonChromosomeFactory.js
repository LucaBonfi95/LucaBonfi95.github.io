/**
 * 
 */

class PolygonChromosomeFactory extends ChromosomeFactory {
	
	constructor() {
		super();
	}
	
	newIndividual(chromosome) {
		var color = new Color(chromosome.bits.getByte(0), chromosome.bits.getByte(1), chromosome.bits.getByte(2));
		var vertices = [];
		var x, y;

		for (var i = 0; i < MAX_VERTICES; i++) {
			if (chromosome.bits.getBit(3 * 8 + 8 * 8 * MAX_VERTICES + i)) {
				x = chromosome.bits.getByte(8 * i + 3 + 0) * 16777216 + chromosome.bits.getByte(8 * i + 3 + 1) * 65536 + chromosome.bits.getByte(8 * i + 3 + 2) * 256 + chromosome.bits.getByte(8 * i + 3 + 3);
				y = chromosome.bits.getByte(8 * i + 3 + 4) * 16777216 + chromosome.bits.getByte(8 * i + 3 + 5) * 65536 + chromosome.bits.getByte(8 * i + 3 + 6) * 256 + chromosome.bits.getByte(8 * i + 3 + 7);
				vertices.push({x,y});
			}
		}

		return new Polygon(vertices, color);
	}
	
	newChromosome(individual) { 
		var bits = new BitString(0);
		var temp = new Uint32Array(2);

		bits.setLength(3 * 8 + 8 * 8 * MAX_VERTICES + MAX_VERTICES);

		bits.setByte(0, individual.color.r());
		bits.setByte(1, individual.color.g());
		bits.setByte(2, individual.color.b());

		for(var i = 0; i < MAX_VERTICES && i < individual.vertices.length; i++) {	
			temp[0] = individual.vertices[i].x;
			temp[1] = individual.vertices[i].y;

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
	
}
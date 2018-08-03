/**
 * 
 */

const DEFAULT_MUTATION_PROBABILITY = 0.0001; 

class GA {

	constructor(polygonGenerationFactory) { 
		this.factory = polygonGenerationFactory;
		this.generation = new Generation([]);
		this.composition = new PolygonComposition([]);
		this.mutationProbability = DEFAULT_MUTATION_PROBABILITY;
	}

	
// 	Color fitness
	
//	fitness(index) {
//		var color = this.composition.polygons[index].color;
//		return 255 + 255 + 255 - (color.r() + color.g() + color.b());
//	}

	
// 	Rectangle fitness 
	
//	fitness(index) {
//		var pol = this.composition.polygons[index];
//		
//		if (pol.vertices.length != 4) 
//			return 0;
//		
//		return 1 / (Math.abs(pol.vertices[0].x - pol.vertices[1].x) + 
//				Math.abs(pol.vertices[2].x - pol.vertices[3].x) +
//				Math.abs(pol.vertices[0].y - pol.vertices[3].y) +
//				Math.abs(pol.vertices[1].y - pol.vertices[2].y));
//	}

	// Must a generation ALWAYS converge?
	
	fitness(index) {
		var pol = this.composition.polygons[index];

		if (pol.vertices.length != 4)
			return 0;

		if (index % 2 == 0) {
			return 1 / (Math.abs(pol.vertices[0].x - 100) + 
					Math.abs(pol.vertices[1].x - 200) +
					Math.abs(pol.vertices[2].x - 200) +
					Math.abs(pol.vertices[3].x - 100) + 
					Math.abs(pol.vertices[0].y - 100) + 
					Math.abs(pol.vertices[1].y - 100) + 
					Math.abs(pol.vertices[2].y - 200) + 
					Math.abs(pol.vertices[3].y - 200));
		}
		else {
			return 1 / (Math.abs(pol.vertices[0].x - 900) + 
					Math.abs(pol.vertices[1].x - 1000) +
					Math.abs(pol.vertices[2].x - 1000) +
					Math.abs(pol.vertices[3].x - 900) + 
					Math.abs(pol.vertices[0].y - 900) + 
					Math.abs(pol.vertices[1].y - 900) + 
					Math.abs(pol.vertices[2].y - 1000) + 
					Math.abs(pol.vertices[3].y - 1000));
		}
	}
	
	mutate(ch) {
		var r = 0;
		for (var i = 0; i < ch.bits.length(); i++) {
			r = Math.random();
			if (r < this.mutationProbability)
				ch.bits.flip(i);
		}
	}

	crossover(ch1, ch2) {
		var index = Math.floor(Math.random() * ch1.bits.length());
		var temp = ch1.clone();
		ch1.bits.setLength(index);
		ch1.bits.concat(ch2.bits.substring(index, ch2.bits.length()));
		ch2.bits.setLength(index);
		ch2.bits.concat(temp.bits.substring(index, temp.bits.length()));
	}

	nextGeneration() {
		var ch1, ch2, nextGen;
		nextGen = new Generation([]);
		for (var i = 0; i < this.generation.chromosomes.length; i+=2) {
			ch1 = this.extract();
			do
				ch2 = this.extract();
			while (ch2 == ch1);
			
//			console.log(ch1);
//			console.log(ch2);
//			console.log("");
			
			ch1 = this.generation.chromosomes[ch1].clone();
			ch2 = this.generation.chromosomes[ch2].clone();
			
			this.crossover(ch1,ch2);
			this.mutate(ch1);
			this.mutate(ch2);

			nextGen.chromosomes.push(ch1);
			nextGen.chromosomes.push(ch2);
		}
		this.generation = nextGen;
		this.composition = this.factory.newPolygonComposition(this.generation);
	}

	extract() {
		var probs = [];
		for (var i = 0; i < this.generation.chromosomes.length; i++) {
			if (i == 0)
				probs.push(this.fitness(i));
			else
				probs.push(probs[i - 1] + this.fitness(i));
		}
		var r = Math.random() * probs[probs.length - 1];
		for (var i = 0; i < this.generation.chromosomes.length; i++) {
			if (i == 0 && probs[0] >= r)
				return 0;
			else if (probs[i - 1] <= r && r <= probs[i])
				return i;
		}
	}

}
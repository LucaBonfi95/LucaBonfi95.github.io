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

	fitness(index) {
		return 1;
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
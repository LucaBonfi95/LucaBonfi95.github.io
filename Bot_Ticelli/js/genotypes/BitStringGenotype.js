/**
 * 
 */

class BitStringGenotype extends Genotype{
	
	constructor(bits) { 
		super();
		this.bits = bits;
		this.decoder = new PolygonBitStringGenotypeDecoder();
		this.mutationProbability = DEFAULT_MUTATION_PROBABILITY;
	}
	
	mutate() {
		var r = 0;
		for (var i = 0; i < this.bits.length(); i++) {
			r = Math.random();
			if (r < this.mutationProbability)
				this.bits.flip(i);
		}
	}
	
	crossover(bitStringGenotype) {
		var index = Math.floor(Math.random() * this.bits.length());
		var temp = this.clone();
		this.bits.setLength(index);
		this.bits.concat(bitStringGenotype.bits.substring(index, bitStringGenotype.bits.length()));
		bitStringGenotype.bits.setLength(index);
		bitStringGenotype.bits.concat(temp.bits.substring(index, temp.bits.length()));
	}
	
	decode() {
		return this.decoder.decode(this);
	}
	
	clone() {
		return new BitStringGenotype(this.bits.clone());
	}
	
}
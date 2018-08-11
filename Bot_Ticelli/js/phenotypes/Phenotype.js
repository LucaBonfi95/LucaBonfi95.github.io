/**
 * 
 */

class Phenotype {
	
	constructor() {}
	
	fitness() {
		throw new Error('Override me!');
	}
	
	encode() {
		throw new Error('Override me!');
	}
	
}
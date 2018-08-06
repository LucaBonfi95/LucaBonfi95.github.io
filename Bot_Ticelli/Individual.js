/**
 * 
 */

class Individual {
	
	constructor() {
		
	}
	
	fitness() {
		throw new Error('Override me!');
	}
	
	encode() {
		throw new Error('Override me!');
	}
	
	decode(chromosome) { 
		throw new Error('Override me!');
	}
	
}
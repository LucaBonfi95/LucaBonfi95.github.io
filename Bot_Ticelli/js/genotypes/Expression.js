/**
 * 
 */

class Exp {
	
	constructor() {}
	
	evaluate(vars) {
		throw new Error('Override me!');
	}
	
}

class CompositeExp extends Exp {
	
	constructor(expFunction, children) {
		super();
		this.expFunction = expFunction;
		this.children = children;
	}

	evaluate(vars) {
		var args = [];
		for (var i = 0; i < this.children.length; i++)
			args.push(this.children[i].evaluate(vars));
		return this.expFunction.evaluate(args);
	}
	
}

class ConstExp extends Exp {
	
	constructor(value) {
		super();
		this.value = value;
	}
	
	evaluate(vars) {
		return this.value;
	}
	
}

class VarExp extends Exp {
	
	constructor(id) {
		super();
		this.id = id;
	}
	
	evaluate(vars) {
		return vars[this.id];
	}
	
}
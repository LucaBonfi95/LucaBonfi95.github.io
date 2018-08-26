/**
 * 
 */

class Exp {
	
	constructor() {}
	
	evaluate(vars) {
		throw new Error('Override me!');
	}
	
	clone() {
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
	
	clone() {
		var childrenClone = [];
		for (var i = 0; i < this.children.length; i++)
			childrenClone.push(this.children[i].clone());
		return new CompositeExp(this.expFunction, childrenClone);
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
	
	clone() {
		return new ConstExp(this.value);
	}
	
}

class VarExp extends Exp {
	
	constructor(id, defaultValue) {
		super();
		this.id = id;
		this.defaultValue = defaultValue;
	}
	
	evaluate(vars) {
		if (vars.length >= this.id + 1)
			return vars[this.id];
		else
			return this.defaultValue;
	}
	
	clone() {
		return new VarExp(this.id, this.defaultValue);
	}
	
}
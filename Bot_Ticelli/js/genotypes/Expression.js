/**
 * 
 */

class Exp {
	
	static random(levels, variables) {
		if (levels == 0) {
			var t = Math.floor(Math.random() * 2); 
			if (t == 0) 
				return new ConstExp(random_abs(MAX_CONST_VALUE));
			if (t == 1)
				return new VarExp(random_int(variables), random_abs(MAX_CONST_VALUE));
		}
		else {
			var func = ExpFunction.random();
			var children = [];
			for (var i = 0; i < func.arity(); i++)
				children.push(Exp.random(levels - 1, variables));
			return new AffCompositeExp(func, children, random_abs(MAX_AFF_VALUE), random_1avg(MAX_AFF_VALUE));
		}
	}
	
	constructor() {}
	
	evaluate(vars) {
		throw new Error('Override me!');
	}
	
	clone() {
		throw new Error('Override me!');
	}
	
	toString() {
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
		var res = this.expFunction.evaluate(args);
		if (res == Infinity)
			res = SOFT_INFINITY;
		return res;
	}
	
	clone() {
		var childrenClone = [];
		for (var i = 0; i < this.children.length; i++)
			childrenClone.push(this.children[i].clone());
		return new CompositeExp(this.expFunction, childrenClone);
	}
	
	toString() {
		var res = this.expFunction.name+"(";
		for (var i = 0; i < this.children.length; i++){ 
			res = res + this.children[i].toString();
			if (i != this.children.length - 1)
				res = res + ", ";
		}
		res = res + ")";
		return res;
	}
	
}

class AffCompositeExp extends CompositeExp {
	
	constructor(expFunction, children, a, b) {
		super(expFunction, children);
		this.a = a;
		this.b = b;
	}
	
	evaluate(vars) {
		return this.a + this.b * super.evaluate(vars);
	}
	
	clone() {
		var childrenClone = [];
		for (var i = 0; i < this.children.length; i++)
			childrenClone.push(this.children[i].clone());
		return new AffCompositeExp(this.expFunction, childrenClone, this.a, this.b);
	}
	
	toString() {
		return "sum("+this.a+", mul("+this.b+", "+super.toString()+"))";
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
	
	toString() {
		return ""+this.value;
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
	
	toString() {
		return "v"+this.id;
	}
	
}
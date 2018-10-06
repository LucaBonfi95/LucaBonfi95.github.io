/**
 * 
 */

class Exp {

	static random(levels, variables) {
		if (levels == 0) {
			var t = Math.floor(Math.random() * 2); 
			if (t == 0) 
				return ConstExp.random(egParameters[EG_MAX_CONST_VALUE_INDEX].value);
			if (t == 1)
				return VarExp.random(variables, egParameters[EG_MAX_CONST_VALUE_INDEX].value);
		}
		else {
			return SPCompositeExp.random(levels, variables, 3, 3, egParameters[EG_MAX_CONST_VALUE_INDEX].value, egParameters[EG_FACTOR_SIGMA_INDEX].value);
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

//class CompositeExp extends Exp {
//
//	static random(levels, variables) {
//		var func = ExpFunction.random();
//		var children = [];
//		for (var i = 0; i < func.arity(); i++)
//			children.push(Exp.random(levels - 1, variables));
//		return new CompositeExp(func, children);
//	}
//	
//	constructor(expFunction, children) {
//		super();
//		this.expFunction = expFunction;
//		this.children = children;
//	}
//
//	evaluate(vars) {
//		var args = [];
//		for (var i = 0; i < this.children.length; i++)
//			args.push(this.children[i].evaluate(vars));
//		var res = this.expFunction.evaluate(args);
//		if (res == Infinity)
//			res = SOFT_INFINITY;
//		return res;
//	}
//
//	clone() {
//		var childrenClone = [];
//		for (var i = 0; i < this.children.length; i++)
//			childrenClone.push(this.children[i].clone());
//		return new CompositeExp(this.expFunction, childrenClone);
//	}
//
//	toString() {
//		var res = this.expFunction.name+"(";
//		for (var i = 0; i < this.children.length; i++){ 
//			res = res + this.children[i].toString();
//			if (i != this.children.length - 1)
//				res = res + ", ";
//		}
//		res = res + ")";
//		return res;
//	}
//
//}

class SPCompositeExp extends Exp {

	static random(levels, variables, maxTerms, maxFact, maxConst, factorSigma) {
		var terms, fact, expFunction, children, coefficients;
		expFunction = [];
		children = [];
		coefficients = [];
		terms = random_int(maxTerms - 1) + 1;
		for (var i = 0; i < terms; i++){
			expFunction.push([]);
			children.push([]);
			coefficients.push(random_lognormal(1,factorSigma));
			fact = random_int(maxFact - 1) + 1;
			for (var j = 0; j < fact; j++){
				expFunction[i].push(ExpFunction.random());
				children[i].push([]);
				for (var k = 0; k < expFunction[i][j].arity(); k++) {
					children[i][j].push(Exp.random(levels - 1, variables));
				}
			}
		}
		return new SPCompositeExp(expFunction, children, random_abs(maxConst), coefficients);
	}
	
	constructor(expFunction, children, constant, coefficients) {
		super();
		this.expFunction = expFunction;
		this.children = children;
		this.constant = constant;
		this.coefficients = coefficients;
	}

	evaluate(vars) {
		var res, p, args;
		res = this.constant;
		for (var i = 0; i < this.children.length; i++){
			p = this.coefficients[i];
			for (var j = 0; j < this.children[i].length; j++){
				args = [];
				for (var k = 0; k < this.children[i][j].length; k++){
					args.push(this.children[i][j][k].evaluate(vars));
				}
				p *= this.expFunction[i][j].evaluate(args);
			}
			res += p;
		}
		if (res == Infinity)
			res = SOFT_INFINITY;
		if (res == -Infinity)
			res = -SOFT_INFINITY;
		if (isNaN(res)) {
			var newVars = [];
			for (var i = 0; i < vars.length; i++)
				vars[i] = random_normal(vars[i], 0.0001);
			res = this.evaluate(vars);
		} 
		return res;
	}

	clone() {
		var coefficientsClone, childrenClone;
		childrenClone = [];
		coefficientsClone = [];
		for (var i = 0; i < this.children.length; i++) {
			childrenClone.push([]);
			coefficientsClone.push(this.coefficients[i]);
			for (var j = 0; j < this.children[i].length; j++) {
				childrenClone[i].push([]);
				for (var k = 0; k < this.children[i][j].length; k++) {
					childrenClone[i][j].push(this.children[i][j][k].clone());
				}
			}
		}
		return new SPCompositeExp(this.expFunction, childrenClone, this.constant, coefficientsClone);
	}

	toString() {
		var res = "( " + this.constant + " + ";
		for (var i = 0; i < this.children.length; i++) { 
			res = res + "( " + this.coefficients[i] + " * ";
			for (var j = 0; j < this.children[i].length; j++) {
				res = res + this.expFunction[i][j].name + "(";
				for (var k = 0; k < this.children[i][j].length; k++) {
					res = res + this.children[i][j][k].toString();
					if (k != this.children[i][j].length - 1)
						res = res + ", ";
				}
				res = res + ")";
				if (j != this.children[i].length - 1)
					res = res + " * ";
			}
			res = res + ")";
			if (i != this.children.length - 1)
				res = res + " + ";
		}
		res = res + ")";
		return res;
	}

}

class ConstExp extends Exp {

	static random(maxAbs) {
		return new ConstExp(random_abs(maxAbs));
	}
	
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
		return "("+this.value+")";
	}

}

class VarExp extends Exp {
	
	static random(variables, maxAbs) {
		return new VarExp(random_int(variables), random_abs(maxAbs));
	}

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
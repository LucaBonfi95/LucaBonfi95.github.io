/**
 * 
 */

class Exp {

	static random(levels, variables) {
		var termMu, termSigma, factorMu, factorSigma;
		termMu = egParameters[EG_TERM_MU_INDEX].value;
		termSigma = egParameters[EG_TERM_SIGMA_INDEX].value;
		factorMu = egParameters[EG_FACTOR_MU_INDEX].value;
		factorSigma = egParameters[EG_FACTOR_SIGMA_INDEX].value;
		if (levels == 0) {
			var t = Math.floor(Math.random() * 2); 
			if (t == 0) 
				return ConstExp.random(termMu, termSigma);
			if (t == 1)
				return SPVarExp.random(variables, termMu, termSigma, factorMu, factorSigma);
		}
		else {
			return SPCompositeExp.random(levels, variables, 3, 3, termMu, termSigma, factorMu, factorSigma);
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

class SPCompositeExp extends Exp {

	static random(levels, variables, maxTerms, maxFact, termMu, termSigma, factorMu, factorSigma) {
		var terms, fact, expFunction, children, coefficients;
		expFunction = [];
		children = [];
		coefficients = [];
		terms = random_int(maxTerms - 1) + 1;
		for (var i = 0; i < terms; i++){
			expFunction.push([]);
			children.push([]);
			coefficients.push(random_lognormal(factorMu, factorSigma));
			fact = random_int(maxFact - 1) + 1;
			for (var j = 0; j < fact; j++){
				expFunction[i].push(ExpFunction.random());
				children[i].push([]);
				for (var k = 0; k < expFunction[i][j].arity(); k++) {
					children[i][j].push(Exp.random(levels - 1, variables));
				}
			}
		}
		return new SPCompositeExp(expFunction, children, random_normal(termMu, termSigma), coefficients);
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

	static random(mu, sigma) {
		return new ConstExp(random_normal(mu,sigma));
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
	
	static random(variables, mu, sigma) {
		return new VarExp(random_int(variables), random_normal(mu, sigma));
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

class SPVarExp extends Exp {
	
	static random(variables, termMu, termSigma, factorMu, factorSigma) {
		return new SPVarExp(random_int(variables), random_normal(termMu, termSigma), random_normal(termMu, termSigma), random_lognormal(factorMu, factorSigma));
	}
	
	constructor(id, defaultValue, constant, coefficient) {
		super();
		this.id = id;
		this.defaultValue = defaultValue;
		this.constant = constant;
		this.coefficient = coefficient;
	}
	
	evaluate(vars) {
		var res;
		if (vars.length >= this.id + 1)
			res = vars[this.id];
		else
			res = this.defaultValue;
		return this.coefficient * res + this.constant;
	}
	
	clone() {
		return new SPVarExp(this.id, this.defaultValue, this.constant, this.coefficient);
	}
	
	toString() {
		return ""+this.coefficient+" * v"+this.id+" + "+this.constant;
	}
}
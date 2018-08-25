/**
 * 
 */

class ExpFunction {
	
	constructor(func, defaultArgs) {
		this.defaultArgs = defaultArgs;
		this.func = func;
	}
	
	arity() {
		return this.defaultArgs.length;
	}
	
	evaluate(args) {
		if (args.length >= this.arity())
			return this.func(args);
		else {
			var _args = [];
			for (var i = 0; i < this.arity(); i++) {
				if (i < args.length)
					_args.push(args[i]);
				else
					_args.push(this.defaultArgs[i]);
			}
			return this.func(_args);
		}
	}
	
}

const addF = new ExpFunction(
		function(vars) {
			var res = 0;
			for (var i = 0; i < vars.length; i++)
				res += vars[i];
			return res;
		},
		[0,0]
)

const mulF = new ExpFunction(
		function(vars) {
			var res = 1;
			for (var i = 0; i < vars.length; i++)
				res *= vars[i];
			return res;
		},
		[1,1]
)

const powF = new ExpFunction(
		function(vars) {
			return Math.pow(vars[0], vars[1]);
		},
		[1,1]
)

const logF = new ExpFunction(
		function(vars) {
			return Math.log(vars[1]) / Math.log(vars[0]);
		},
		[1, Math.E]
)

const sinF = new ExpFunction(
		function(vars) {
			return Math.sin(vars[0]);
		},
		[0]
)

const cosF = new ExpFunction(
		function(vars) {
			return Math.cos(vars[0]);
		},
		[0]
)

const tanF = new ExpFunction(
		function(vars) {
			return Math.tan(vars[0]);
		},
		[0]
)

const absF = new ExpFunction(
		function(vars) {
			return Math.abs(vars[0]);
		},
		[0]
)

const modF = new ExpFunction(
		function(vars) {
			return vars[0] % vars[1];
		},
		[0,1]
)
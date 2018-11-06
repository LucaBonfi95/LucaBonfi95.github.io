/**
 * 
 */

class Transformation {
	
	constructor(coefficients, translation) {
		this.coefficients = coefficients;
		this.translation = translation;
		this.pad();
	}
	
	pad() {
		function padToZero(v, l) {
			if (v.length > d) {
				var temp = v;
				v = [];
				for (var i = 0; i < d; i++) 
					v[i] = temp[i];
			}
			if (v.length < d) {
				for (var i = v.length; i < d; i++)
					v.push(0);
			}
		}
		var d = this.coefficients.length;
		padToZero(this.translation, d);
		for (var i = 0; i < d; i++)
			padToZero(this.coefficients[i]);
	}
	
	apply(vars) {
		var res = [];
		for (var i = 0; i < this.coefficients.length; i++){
			res.push(0);
			for (var j = 0; j < this.coefficients.length; j++) {
				res[i] += this.coefficients[i][j] * vars[j];
			}
			res[i] += this.translation[i];
		}
		return res;	
	}
	
	compose(transformation) {
		var resCoefficients, resTranslation, d, temp;
		resCoefficients = [];
		resTranslation = [];
		d = this.coefficients.length;
		for (var i = 0; i < d; i++) {
			resCoefficients.push([]);
			for (var j = 0; j < d; j++) {
				temp = 0;
				for (var k = 0; k < d; k++) 
					temp += this.coefficients[i][k] * transformation.coefficients[k][j];
				resCoefficients[i].push(temp);
			}
			temp = 0;
			for (var j = 0; j < d; j++)
				temp += this.coefficients[i][j] * transformation.translation[j];
			temp += this.translation[i];
			resTranslation.push(temp);
		}
		return new Transformation(resCoefficients, resTranslation);
	}
	
	toString() {
		var res = '';
		for (var i = 0; i < this.coefficients.length; i++) {
			res += 'X'+i+' = ';
			for (var j = 0; j < this.coefficients.length; j++)
				res+= this.coefficients[i][j]+'x'+j+' + ';
			res += this.translation[i] + '\n';
		}
		return res;
	}
	
	clone() {
		var d, coefficientsClone, translationClone;
		d = this.coefficients.length;
		coefficientsClone = [];
		translationClone = [];
		for (var i = 0; i < d; i++) {
			coefficientsClone.push([]);
			for (var j = 0; j < d; j++)
				coefficientsClone[i].push(this.coefficients[i][j])
			translationClone.push(this.translation[i]);
		}
		return new Transformation(coefficientsClone, translationClone);		
	}
	
}
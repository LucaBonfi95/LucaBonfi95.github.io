/**
 * 
 */

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) 
    	u = Math.random();
    while(v === 0) 
    	v = Math.random();
    
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function random_abs(max_abs) { 
	return Math.random() * max_abs * 2 - max_abs;
}

function random_normal(avg, sigma) {
	return avg + sigma * randn_bm();
}

function random_lognormal(avg, sigma) {
	return avg * Math.exp(random_normal(0, sigma));
}

function random_int(max) {
	return Math.floor(Math.random() * max);
}

//var array = [];
//var results = [0,0,0,0,0,0,0,0,0,0];
//var v;
//
//for (var i = 0; i < 10000; i++) {
//	v = 5 * Math.exp(0.2 * randn_bm());
//	array.push(v);
//}
//
//for (var i = 0; i < 10000; i++) {
//	var group = Math.floor(array[i]);
//	if (group >= 0 && group <= 9) 
//		results[group]++;
//}
//
//console.log(results);
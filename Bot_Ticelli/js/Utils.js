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

function random_1avg(max) {
	return random_abs(max) / random_abs(max);
}

function random_int(max) {
	return Math.floor(Math.random() * max);
}
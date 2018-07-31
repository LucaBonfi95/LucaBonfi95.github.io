/**
 * 
 */

function extract(pool, probFn) {
	var probs = [];
	for (var i = 0; i < pool.length; i++) {
		if (i = 0)
			probs.push(probFn(pool[i]));
		else
			probs.push(probs[i - 1] + probFn(pool[i]));
	}
	var r = Math.random() * probs[probs.length - 1];
	for (var i = 0; i < pool.length - 1; i++) {
		if (pool[i] < r && r < pool[i+1])
			return pool[i];
	}
}
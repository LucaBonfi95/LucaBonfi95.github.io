/**
 * 
 */

//MAIN

var render = 0;
var genotypes = [];
var ga, c, ctx, view, stopflag, lastRender;

function update() {
	function f() {
		console.log(ga.status);
	}
	if (ga.isInit == false) {
		ga.init();
	}
	else { 
		if (ga.ready == true) {
			draw();
			document.getElementById("fitness").innerText = "Fitness: "+ga.generation.phenotypes[ga.generation.fittest()].fitness();
			document.getElementById("render").innerText = "Generation: "+ga.currentGeneration;
		}
		document.getElementById("progress").innerText = "Status: "+ga.status;
	}
	console.log(ga.status);
}

function draw() {
	view.drawRawImage(ga.generation.phenotypes[ga.generation.fittest()]);
}

function start() {
	update();
}

function stop() {
	stopflag = true;
}

function init() {
//	for (var i = 0; i < MAX_POPULATION; i++) {
//		genotypes.push(new FloatArrayGenotype([]));
//		for (var j = 0; j < MAX_POLYGONS * (MAX_VERTICES * 3 + 3 + 1); j++) 
//			genotypes[i].values.push(Math.random() * 10000 );
//	}

	for (var i = 0; i < MAX_POPULATION; i++) {
		genotypes.push(new ExpressionGenotype(Exp.random(4,2)));
	}
	
	stopflag = false;
	ga = new GA(genotypes, update);

	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	view = new View(ctx);

	lastRender = 0;
}

init();

/**
 * 
 */
importScripts("../js/Commons.js");
importScripts("../js/Utils.js");

importScripts("../js/phenotypes/Color.js");
importScripts("../js/phenotypes/Phenotype.js");
importScripts("../js/phenotypes/Polygon.js");
importScripts("../js/phenotypes/PolygonComposition.js");
importScripts("../js/phenotypes/RawImage.js");

importScripts("../js/genotypes/BitString.js");
importScripts("../js/genotypes/Genotype.js");
importScripts("../js/genotypes/BitStringGenotype.js");
importScripts("../js/genotypes/FloatArrayGenotype.js");
importScripts("../js/genotypes/BitStringGenotypeDecoder.js");
importScripts("../js/genotypes/FloatArrayGenotypeDecoder.js");
importScripts("../js/genotypes/ExpFunction.js");
importScripts("../js/genotypes/Expression.js");
importScripts("../js/genotypes/ExpressionGenotype.js");
importScripts("../js/genotypes/ExpressionGenotypeDecoder.js");

importScripts("../js/Generation.js");
importScripts("../js/GA.js");

var ga, genotypes = [], msgId = 0;

function update() {
	var gaInfo = new Object();
	gaInfo.msgId = msgId++;
	gaInfo.ready = ga.ready;
	gaInfo.status = ga.status;
	gaInfo.currentGeneration = ga.currentGeneration;
	gaInfo.newPhenotypes = [];
	for (var i = 0; i < ga.newPhenotypes.length; i++) {
		var phenotypeInfo = new Object();
		phenotypeInfo.imageData = ga.newPhenotypes[i].imageData;
		phenotypeInfo.fitness = ga.newPhenotypes[i].fitness();
		gaInfo.newPhenotypes.push(phenotypeInfo);		
	}
	postMessage(gaInfo);
}

//for (var i = 0; i < MAX_POPULATION; i++) {
//genotypes.push(new FloatArrayGenotype([]));
//for (var j = 0; j < MAX_POLYGONS * (MAX_VERTICES * 3 + 3 + 1); j++) 
//	genotypes[i].values.push(Math.random() * 10000 );
//}

for (var i = 0; i < MAX_POPULATION; i++) {
	genotypes.push(new ExpressionGenotype(Exp.random(6,2)));
}

ga = new GA(genotypes, update);
ga.init();
while(true) {
	console.log(ga.generation.genotypes[ga.generation.fittest()].exp.toString());
	ga.nextGeneration();
}
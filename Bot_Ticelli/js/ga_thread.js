/**
 * 
 */
importScripts("../js/Commons.js");
importScripts("../js/Utils.js");
importScripts("../js/Param.js");

importScripts("../js/phenotypes/Phenotype.js");
importScripts("../js/phenotypes/RawImage.js");

importScripts("../js/genotypes/Genotype.js");
importScripts("../js/genotypes/ExpFunction.js");
importScripts("../js/genotypes/Expression.js");
importScripts("../js/genotypes/ExpressionGenotype.js");
importScripts("../js/genotypes/ExpressionGenotypeDecoder.js");

importScripts("../js/Generation.js");
importScripts("../js/GA.js");
importScripts("../js/Command.js");

var ga, genotypes = [], msgId = 0, stopFlag, 
	fitnessMode, renderingHdImage, hdPhenotype, hdPhenotypeToSend,
	genotypeParams;
stopFlag = false;
fitnessMode = FITNESS_MODE_MANUAL;
renderingHdImage = false;
hdPhenotype = null;
hdPhenotypeToSend = false;

onmessage = function(e) {
	var cmd = e.data;
	if (cmd.name == CMD_TOGGLE_PAUSE) {
		stopFlag = !stopFlag;
		if (!stopFlag)
			setTimeout(nextGeneration(), TIMEOUT);
	}
	else if (cmd.name == CMD_INIT) {
		genotypes = [];
		for (var i = 0; i < parameters[MAX_POPULATION_INDEX].value; i++) {
			genotypes.push(new ExpressionGenotype(Exp.random(egParameters[EG_EXPRESSION_LEVELS_INDEX].value,2)));
		}
		ga = new GA(genotypes, update);
		ga.init();
	}
	else if (cmd.name == CMD_NEXT_GENERATION) {
		setTimeout(nextGeneration(), TIMEOUT);
	}
	else if (cmd.name == CMD_SET_FITNESS_MODE) {
		fitnessMode = cmd.args[0];
	}
	else if (cmd.name == CMD_SET_FITNESS) {
		ga.generation.phenotypes[cmd.args[0]].fitnessCache = cmd.args[1];
	}
	else if (cmd.name == CMD_REQ_HD_IMAGE) {
		var genotype;
		renderingHdImage = true;
		update();
		genotype = ga.generation.genotypes[cmd.args[0]].clone();
		genotype.decoder.width = parameters[HD_WIDTH_INDEX].value;
		genotype.decoder.height = parameters[HD_HEIGHT_INDEX].value;
		hdPhenotype = genotype.decode();
		renderingHdImage = false;
		hdPhenotypeToSend = true;
		update();
	}
	else if (cmd.name == CMD_CHANGE_COMMON_PARAM) {
		parameters[cmd.args[0]].value = cmd.args[1];
	}
	else if (cmd.name == CMD_CHANGE_GENOTYPE_PARAM) {
		genotypeParams[cmd.args[0]].value = cmd.args[1];
	}
}

function update() {
	var gaInfo = new Object();
	gaInfo.msgId = msgId++;
	gaInfo.ready = ga.ready;
	gaInfo.status = ga.status;
	if (renderingHdImage) 
		gaInfo.status = "Rendering HD Image";
	gaInfo.currentGeneration = ga.currentGeneration;
	gaInfo.newPhenotypes = [];
	gaInfo.newGenotypes = [];
	for (var i = 0; i < ga.newPhenotypes.length; i++) {
		var phenotypeInfo = new Object();
		phenotypeInfo.imageData = ga.newPhenotypes[i].imageData;
		phenotypeInfo.fitness = ga.newPhenotypes[i].fitness();
		gaInfo.newPhenotypes.push(phenotypeInfo);		
	}
	for (var i = 0; i < ga.newGenotypes.length; i++) {
		var genotypeInfo = new Object();
		genotypeInfo.string = ga.newGenotypes[i].exp.toString();
		gaInfo.newGenotypes.push(genotypeInfo);
	}
	gaInfo.hdPhenotype = null;
	if (hdPhenotypeToSend) {
		gaInfo.hdPhenotype = hdPhenotype; 
		hdPhenotypeToSend = false;
	}
	
	postMessage(new Command(CMD_UPDATE_VIEW, [gaInfo]));
}

genotypeParams = egParameters;
postMessage(new Command(CMD_UPDATE_PARAMS, [parameters, genotypeParams]));

function nextGeneration() {
	if(!stopFlag) {
		if (fitnessMode == FITNESS_MODE_AUTO)
			setTimeout(nextGeneration, TIMEOUT);
		ga.nextGeneration();
	}
}
//if(!stopFlag && fitnessMode == FITNESS_MODE_AUTO) {
//	setTimeout(nextGeneration, TIMEOUT);
//}
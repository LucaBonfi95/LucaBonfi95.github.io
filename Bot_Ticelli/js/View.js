/**
 * 
 */

class View {
	
	constructor() {
		this.phenotypesDisplayed = 0;
		this.gaInfo = null;
		document.getElementById("nextGenerationButton").disabled = true;
		this.unselectPhenotype();
	}
	
	update(gaInfo) {
		this.gaInfo = gaInfo;
		document.getElementById("currentGeneration").innerHTML = "Generation: "+gaInfo.currentGeneration;
		document.getElementById("status").innerHTML = "Status: "+gaInfo.status;
		if (gaInfo.newPhenotypes.length != this.phenotypesDisplayed)
			this.updatePhenotypesGrid();
		document.getElementById("nextGenerationButton").disabled = (gaInfo.status != "Idle");
		document.getElementById("fitness").disabled = (gaInfo.status != "Idle");
		document.getElementById("hdButton").disabled = (gaInfo.status != "Idle");
		document.getElementById("startButton").disabled = (gaInfo.status != "Idle");
		if (gaInfo.hdPhenotype != null) {
			this.showHdPhenotype();
		}
	}
	
	updatePhenotypesGrid() {
		var destCanvas, child;
		if (this.phenotypesDisplayed > this.gaInfo.newPhenotypes.length) {
			this.phenotypesDisplayed = 0;
			document.getElementById("phenotypes").innerHTML = "";
			this.unselectPhenotype();
		}
		
		for (var i = this.phenotypesDisplayed; i < this.gaInfo.newPhenotypes.length; i++){ 
			child = document.createElement('span');
		    child.innerHTML ='<canvas id="canvas'+i+'" width="'+PREVIEW_SIZE_X+'" height="'+PREVIEW_SIZE_Y+'" onclick="selectPhenotype('+i+')" style="border: 1px solid #000000;"></canvas>';
			document.getElementById("phenotypes").appendChild(child);
			destCanvas = document.getElementById("canvas"+i);

			this.showImage(gaInfo.newPhenotypes[i].imageData, destCanvas);
		}
		
		this.phenotypesDisplayed = this.gaInfo.newPhenotypes.length;
	}
	
	togglePause() {
		var button = document.getElementById("pauseButton");
		if (button.innerHTML == "Pause")
			button.innerHTML = "Resume";
		else
			button.innerHTML = "Pause";
	}
	
	selectPhenotype(i) {
		document.getElementById("selectedPhenotype").style.visibility = "visible";
		document.getElementById("fitness").value = this.gaInfo.newPhenotypes[i].fitness;
		document.getElementById("id").innerHTML = "Id: "+i;
		//document.getElementById("string").innerHTML = "String: "+this.gaInfo.newGenotypes[i].string;
		this.showImage(this.gaInfo.newPhenotypes[i].imageData, document.getElementById("selectedPhenotypeCanvas"));
	}
	
	unselectPhenotype() {
		document.getElementById("selectedPhenotype").style.visibility = "hidden";
	}
	
	showImage(imageData, destCanvas) { 
		var newCanvas = document.createElement("canvas");
		var ctx = destCanvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		newCanvas.width = imageData.width;
		newCanvas.height = imageData.height;
		newCanvas.getContext("2d").putImageData(imageData, 0, 0);
		
		ctx.scale(destCanvas.width / newCanvas.width, destCanvas.height / newCanvas.height);
		ctx.drawImage(newCanvas, 0, 0);
		ctx.scale(newCanvas.width / destCanvas.width, newCanvas.height / destCanvas.height);
	}
	
	showHdPhenotype() {		
		var width, height;
		var newTab = window.open('about:blank','_blank');
		width = parameters[HD_WIDTH_INDEX].value;
		height = parameters[HD_HEIGHT_INDEX].value;
		newTab.document.title = 'HD Phenotype';
		newTab.document.body.innerHTML = '<canvas id="hdCanvas" width='+width+' height='+height+' style="overflow: auto"></canvas>';
		newTab.document.getElementById("hdCanvas").getContext('2d').putImageData(gaInfo.hdPhenotype.imageData,0,0);
	}
	 	
	updateParams(commonParams, genotypeParams) {
		for (var i = 0; i < commonParams.length; i++) {
			document.getElementById("commonParams").innerHTML+=('<div class="tooltip">'+commonParams[i].name+': <span class="tooltiptext">'+commonParams[i].tip+'</span> </div> <input style="width: 80px;" onchange="changeCommonParam('+i+', this.value)" value="'+commonParams[i].value+'"> <br>');
		}
		for (var i = 0; i < genotypeParams.length; i++) {			
			document.getElementById("genotypeParams").innerHTML+=('<div class="tooltip">'+genotypeParams[i].name+': <span class="tooltiptext">'+genotypeParams[i].tip+'</span> </div> <input style="width: 80px;" onchange="changeGenotypeParam('+i+', this.value)" value="'+genotypeParams[i].value+'"> <br>');
		}
	}
	
	start(){ 
		document.getElementById("startButton").innerHTML = 'Reset';
	}

}
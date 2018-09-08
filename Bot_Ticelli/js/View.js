/**
 * 
 */

const PREVIEW_SIZE_X = 200;
const PREVIEW_SIZE_Y = 200;

class View {
	
	constructor() {
		this.phenotypesDisplayed = 0;
		this.gaInfo = null;
	}
	
	update(gaInfo) {
		this.gaInfo = gaInfo;
		document.getElementById("currentGeneration").innerHTML = "Generation: "+gaInfo.currentGeneration;
		document.getElementById("status").innerHTML = "Status: "+gaInfo.status;
		if (gaInfo.newPhenotypes.length != this.phenotypesDisplayed)
			this.updatePhenotypesGrid();
		document.getElementById("nextGenerationButton").disabled = (gaInfo.status != "Idle");
		document.getElementById("fitness").disabled = (gaInfo.status != "Idle")
		if (gaInfo.hdPhenotype != null) {
			this.showHdPhenotype();
		}
	}
	
	updatePhenotypesGrid() {
		var destCanvas, child;
		if (this.phenotypesDisplayed > this.gaInfo.newPhenotypes.length) {
			this.phenotypesDisplayed = 0;
			document.getElementById("phenotypes").innerHTML = "";
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
		document.getElementById("fitness").value = this.gaInfo.newPhenotypes[i].fitness;
		document.getElementById("id").innerHTML = "Id: "+i;
		document.getElementById("string").innerHTML = "String: "+this.gaInfo.newGenotypes[i].string;
		this.showImage(this.gaInfo.newPhenotypes[i].imageData, document.getElementById("selectedPhenotypeCanvas"));
	}
	
	showImage(imageData, destCanvas) { 
		var newCanvas = document.createElement("canvas");
		var ctx = destCanvas.getContext("2d");
		newCanvas.width = imageData.width;
		newCanvas.height = imageData.height;

		newCanvas.getContext("2d").putImageData(imageData, 0, 0);
		
		ctx.scale(destCanvas.width / newCanvas.width, destCanvas.height / newCanvas.height);
		ctx.drawImage(newCanvas, 0, 0);
		ctx.scale(newCanvas.width / destCanvas.width, newCanvas.height / destCanvas.height);
	}
	
	showHdPhenotype() {
//		var download = document.createElement('a');
//		var canvas = document.createElement("canvas");
//		canvas.width = gaInfo.hdPhenotype.imageData.width;
//		canvas.height = gaInfo.hdPhenotype.imageData.height;
//		canvas.getContext('2d').putImageData(gaInfo.hdPhenotype.imageData, 0, 0);
//		download.href = canvas.toDataURL("image/png");
//		download.download = 'phenotype.png';
//		console.log(download.href);
//		download.click();
		
		var newTab = window.open('about:blank','_blank');
		newTab.document.title = 'HD Phenotype';
		newTab.document.body.innerHTML = '<canvas id="hdCanvas" width='+HD_WIDTH+' height='+HD_HEIGHT+'></canvas>';
		newTab.document.getElementById("hdCanvas").getContext('2d').putImageData(gaInfo.hdPhenotype.imageData,0,0);
	}
	
//	drawPolygon(ctx, pol) {
//		if (pol.vertices.length < 3) 
//			return;
//		
//		ctx.beginPath();
//		ctx.moveTo(pol.vertices[pol.vertices.length - 1].x, pol.vertices[pol.vertices.length - 1].y);
//		
//		for (var i = 0; i < pol.vertices.length - 1; i++)
//			ctx.lineTo(pol.vertices[i].x, pol.vertices[i].y);
//		
//		ctx.fillStyle = "rgb("+pol.color.r()+", "+pol.color.g()+", "+pol.color.b()+")";
//		ctx.fill();
//		ctx.closePath();
//	}
//	
//	draw(ctx, polygonComposition) {
//		ctx.clearRect(0, 0, WIDTH, HEIGHT);
//		if (polygonComposition.cachedImageData == null)
//			for(var i = 0; i < polygonComposition.polygons.length; i++) 
//				this.drawPolygon(polygonComposition.polygons[i]);
//		else
//			ctx.putImageData(polygonComposition.cachedImageData, 0, 0);
//	}

}
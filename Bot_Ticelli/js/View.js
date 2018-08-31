/**
 * 
 */

const PREVIEW_SIZE_X = 200;
const PREVIEW_SIZE_Y = 200;

class View {
	
	constructor() {
		this.phenotypesDisplayed = 0;
	}
	
	update(gaInfo) {
		document.getElementById("currentGeneration").innerHTML = "Generation: "+gaInfo.currentGeneration;
		document.getElementById("status").innerHTML = "Status: "+gaInfo.status;
		if (gaInfo.newPhenotypes.length != this.phenotypesDisplayed)
			this.updatePhenotypesGrid(gaInfo);
	}
	
	updatePhenotypesGrid(gaInfo) {
		var srcCtx, destCtx, child, newCanvas;
		console.log(gaInfo.msgId);
		if (this.phenotypesDisplayed > gaInfo.newPhenotypes.length) {
			this.phenotypesDisplayed = 0;
			document.getElementById("phenotypes").innerHTML = "";
		}
		
		for (var i = this.phenotypesDisplayed; i < gaInfo.newPhenotypes.length; i++){ 
			child = document.createElement('span');
		    child.innerHTML ='<canvas id="canvas'+i+'" width="'+PREVIEW_SIZE_X+'" height="'+PREVIEW_SIZE_Y+'" style="border: 1px solid #000000;"></canvas>';
			document.getElementById("phenotypes").appendChild(child);
			destCtx = document.getElementById("canvas"+i).getContext("2d");

			newCanvas = document.createElement("canvas");
			newCanvas.width = WIDTH;
			newCanvas.height = HEIGHT;

			newCanvas.getContext("2d").putImageData(gaInfo.newPhenotypes[i].imageData, 0, 0);

			destCtx.scale(0.2, 0.2);
			destCtx.drawImage(newCanvas, 0, 0);
		}
		
		this.phenotypesDisplayed = gaInfo.newPhenotypes.length;
	}
	
	drawPolygon(ctx, pol) {
		if (pol.vertices.length < 3) 
			return;
		
		ctx.beginPath();
		ctx.moveTo(pol.vertices[pol.vertices.length - 1].x, pol.vertices[pol.vertices.length - 1].y);
		
		for (var i = 0; i < pol.vertices.length - 1; i++)
			ctx.lineTo(pol.vertices[i].x, pol.vertices[i].y);
		
		ctx.fillStyle = "rgb("+pol.color.r()+", "+pol.color.g()+", "+pol.color.b()+")";
		ctx.fill();
		ctx.closePath();
	}
	
	draw(ctx, polygonComposition) {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		if (polygonComposition.cachedImageData == null)
			for(var i = 0; i < polygonComposition.polygons.length; i++) 
				this.drawPolygon(polygonComposition.polygons[i]);
		else
			ctx.putImageData(polygonComposition.cachedImageData, 0, 0);
	}

}
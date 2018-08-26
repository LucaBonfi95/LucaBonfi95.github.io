/**
 * 
 */

class PolygonComposition extends Phenotype {

	static random(polygonNo) {
		var polygons = [];
		var polygonNo;
		for (var i = 0; i < polygonNo; i++)
			polygons.push(Polygon.random());
		return new PolygonComposition(polygons);
	}

	constructor(polygons) { 
		super();
		this.polygons = polygons;
		this.cachedImageData = null;
		this.ctx = null;
	}

	fitness() { 
		var ret = 1;
		for (var i = 0; i < this.polygons.length; i++)
			ret *= this.polygons[i].fitness();
		return ret;
	}

	drawPolygon(pol, ctx) {
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

	draw(ctx) {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		for(var i = 0; i < this.polygons.length; i++) 
			this.drawPolygon(this.polygons[i], ctx);
	}

	updateImageData() {
		if (this.ctx == null) {
			var canvas = document.createElement("canvas");
			canvas.width = WIDTH;
			canvas.height = HEIGHT;
			this.ctx = canvas.getContext("2d");
		}
		this.draw(this.ctx);
		this.cachedImageData = this.ctx.getImageData(0,0,canvas.width,canvas.height);
	}
}
/**
 * 
 */

class View {
	
	constructor(ctx) {
		this.ctx = ctx;
	}
	
	drawPolygon(pol) {
		this.ctx.beginPath();
		this.ctx.moveTo(pol.vertices[pol.vertices.length - 1].x, pol.vertices[pol.vertices.length - 1].y);
		
		for (var i = 0; i < pol.vertices.length - 1; i++)
			this.ctx.lineTo(pol.vertices[i].x, pol.vertices[i].y);
		
		this.ctx.fillStyle = pol.color;
		this.ctx.fill();
		this.ctx.closePath();
	}
	
	draw(polygonComposition, x, y) {
		this.ctx.clearRect(0, 0, polygonComposition.width, polygonComposition.height);
		
		for(var i = 0; i < polygonComposition.polygons.length; i++) 
			this.drawPolygon(polygonComposition.polygons[i]);
	}

}
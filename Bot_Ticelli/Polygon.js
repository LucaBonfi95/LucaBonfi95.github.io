/**
 * 
 */

class Polygon { 
	
	static random() {
		var vertices = [];
		var verticesNo = Math.floor(Math.random() * (MAX_VERTICES - 3)) + 3;
		
		for (var i = 0; i < verticesNo; i++)
			vertices.push({x: Math.floor(Math.random() * WIDTH), y: Math.floor(Math.random() * HEIGHT)});
		
		return new Polygon(vertices, Color.random()); 
	}
	
	constructor(vertices, color) { 
		this.vertices = vertices;
		this.color = color;
		
		for (var i = 0; i < vertices.length; i++){ 
			vertices[i].x %= WIDTH;
			vertices[i].y %= HEIGHT;
		}
		
	}
	
	move(x, y) { 
		for (var i = 0; i < this.vertices.length; i++) {
			this.vertices[i].x += x;
			this.vertices[i].y += y;
		}
	}
	
	rotateCenter(x, y, deg) {
		for (var i = 0; i < this.vertices.length; i++) {
			var tempX = this.vertices[i].x - x;
			var tempY = this.vertices[i].y - y;
			this.vertices[i].x = tempX * Math.cos(deg) - tempY * Math.sin(deg) + x;
			this.vertices[i].y = tempX * Math.sin(deg) + tempY * Math.cos(deg) + y;
		}
	}
	
	rotate(deg) {
		this.rotateCenter(0, 0, deg);
	}
	
	scaleCenter(x, y, dx, dy) { 
		for (var i = 0; i < this.vertices.length; i++) {
			var tempX = this.vertices[i].x - x;
			var tempY = this.vertices[i].y - y;
			this.vertices[i].x = tempX * dx + x
			this.vertices[i].y = tempY * dy + y;
		}
	}
	
	scaleOrigin(dx,dy) { 
		this.scaleCenter(0, 0, dx, dy);
	}
	
	scale(d) {
		this.scaleOrigin(d, d);
	}
	
}
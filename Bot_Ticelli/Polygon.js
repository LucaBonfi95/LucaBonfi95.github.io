/**
 * 
 */

class Polygon { 
	
	constructor(vertices, color) { 
		this.vertices = vertices;
		this.color = color;
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
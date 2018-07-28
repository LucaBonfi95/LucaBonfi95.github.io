/**
 * 
 */

class Polygon { 
	
	constructor(vertices) { 
		this.vertices = vertices;
	}
	
	move(x, y) { 
		for (var i = 0; i < this.vertices.length; i++) {
			this.vertices[i].x += x;
			this.vertices[i].y += y;
		}
	}
	
	rotate(x, y, deg) {
		for (var i = 0; i < this.vertices.length; i++) {
			var tempX = this.vertices[i].x - x;
			var tempY = this.vertices[i].y - y;
			this.vertices[i].x = tempX * Math.cos(deg) - tempY * Math.sin(deg) + x;
			this.vertices[i].y = tempX * Math.sin(deg) + tempY * Math.cos(deg) + y;
		}
	}
	
}
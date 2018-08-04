/**
 * 
 */

class Polygon extends Individual { 

	static random() {
		var vertices = [];
		var verticesNo = Math.floor(Math.random() * (MAX_VERTICES - 3)) + 3;

		for (var i = 0; i < verticesNo; i++)
			vertices.push({x: Math.floor(Math.random() * WIDTH), y: Math.floor(Math.random() * HEIGHT)});

		return new Polygon(vertices, Color.random()); 
	}

	constructor(vertices, color) { 
		super();
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

	fitness() {
		if (this.vertices.length != 4)
			return 0;

		return 1 / (Math.abs(this.vertices[0].x - this.vertices[1].x) +
			Math.abs(this.vertices[1].y - this.vertices[2].y) +
			Math.abs(this.vertices[2].x - this.vertices[3].x) +
			Math.abs(this.vertices[3].y - this.vertices[0].y))

	}

}
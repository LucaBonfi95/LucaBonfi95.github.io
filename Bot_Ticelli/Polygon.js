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
		this.factory = new PolygonChromosomeFactory();
		
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
		var distances = [];
		var sides = [];
		var center = {x:0, y:0};
		
		if (this.vertices.length != 3) 
			return 0;
		
		for (var i = 0; i < this.vertices.length; i++){
			center.x += this.vertices[i].x;
			center.y += this.vertices[i].y;
			
			sides[i] = Math.sqrt(Math.pow(this.vertices[i].x - this.vertices[(i + 1) % this.vertices.length].x, 2) + 
					Math.pow(this.vertices[i].y - this.vertices[(i + 1) % this.vertices.length].y, 2));
		}
		
		center.x /= this.vertices.length;
		center.y /= this.vertices.length;
		
		for (var i = 0; i < this.vertices.length; i++) {
			distances.push(Math.sqrt(
					(this.vertices[i].x - center.x) *
					(this.vertices[i].x - center.x) +
					(this.vertices[i].y - center.y) * 
					(this.vertices[i].y - center.y)
			));
		}
				
		var avgRadius = 0;
		for (var i = 0; i < distances.length; i++) {
			avgRadius += distances[i];
		}
		avgRadius /= distances.length;
		
		var optimalSide = avgRadius * 2 * Math.cos(Math.PI * (this.vertices.length - 2)/(2 * this.vertices.length));
		
		var slack = 0;
		for (var i = 0; i < distances.length; i++) {
			slack += Math.pow(distances[i] - avgRadius, 2) + Math.pow(sides[i] - optimalSide, 2);
		}
		return 1 / slack;
	}
	
	encode() { 
		return this.factory.newChromosome(this);
	}
	
	decode(chromosome){
		return this.factory.newPolygon(chromosome);
	}

}
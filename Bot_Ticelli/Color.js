/**
 * 
 */

class Color {
	
	static random() {
		return new Color(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
	}
	
	constructor(r, g, b) { 
		this.value = new Uint8Array(3);
		this.value[0] = r;
		this.value[1] = g;
		this.value[2] = b;
	}
	
	r() {
		return this.value[0];
	}
	
	g() {
		return this.value[1];
	}
	
	b() {
		return this.value[2];
	}
	
}
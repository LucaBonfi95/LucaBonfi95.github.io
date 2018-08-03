/**
 * 
 */

class PolygonComposition extends Individual{
	
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
	}
	
	fitness() { //TODO
		return 1;
	}
	
}
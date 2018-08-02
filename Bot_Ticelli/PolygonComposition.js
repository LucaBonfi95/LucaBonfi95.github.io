/**
 * 
 */

class PolygonComposition {
	
	static random(polygonNo) {
		var polygons = [];
		var polygonNo;
		for (var i = 0; i < polygonNo; i++)
			polygons.push(Polygon.random());
		return new PolygonComposition(polygons);
	}
	
	constructor(polygons) { 
		this.polygons = polygons;
	}
	
}
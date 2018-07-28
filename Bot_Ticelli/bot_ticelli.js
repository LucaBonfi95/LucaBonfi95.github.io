// MAIN

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var pol = new Polygon([{x:300, y:100},{x:400, y:50},{x:500, y:100},{x:450, y:200},{x:400, y:300},{x:300, y:200}]);

var angle = 1;
var x = 300;
var y = 100;

function update(progress) {
	//pol.move(3,3);
	//pol.rotate(x++,y++, angle / 5);
	pol.scaleCenter(300, 100, 1.001, 1.0001);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(pol.vertices[pol.vertices.length - 1].x, pol.vertices[pol.vertices.length - 1].y);
	
	for (var i = 0; i < pol.vertices.length - 1; i++)
		ctx.lineTo(pol.vertices[i].x, pol.vertices[i].y);
	
	ctx.fill();
	ctx.closePath();
}

function loop(timestamp) {
	var progress = timestamp - lastRender;

	update(progress);
	draw();

	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);
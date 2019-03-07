function sinc(x) {
	if (x == 0) 
		return 1;
	else
		return Math.sin(x)/x;
}

function w(i,n,t) {
	return sinc(Math.PI*(n-1)*(t - i/(n-1)));
}

function l(p,t) {
	var temp = new Object();
	temp.x = 0;
	temp.y = 0;
	var center = new Object();
	center.x = 0;
	center.y = 0;
	for (var i = 0; i < p.length; i++) {
		center.x += p[i][0];
		center.y += p[i][1];
	}
	center.x /= p.length;
	center.y /= p.length;
	//console.log(center);
	for (var i = 0; i < p.length; i++) {
		temp.x += w(i, p.length, t) * (p[i][0] - center.x);
		temp.y += w(i, p.length, t) * (p[i][1] - center.y);
	}
	temp.x += center.x;
	temp.y += center.y;
	return temp;
}

var p1 = [[50,50],[100,100],[100,200]];
draw_sincspline(p1,0.01);
draw_c0(p1);

var p2 = [[600,100],[400,100],[400,300],[600,300]];
draw_sincspline(p2,0.01);
draw_c0(p2);

var p3 = [[600,400],[400,400],[400,600],[600,600]];
draw_sincspline(p3,0.01);
draw_c0(p3);

var p4 = [[100,100],[200,200],[300,300],[400,300]];
//draw_sincspline(p,0.01);
//draw_c0(p);

function draw_c0(p) {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var start = p[0];
	var temp = start;
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo(start.x,start.y);
	for (var t = 0; t < p.length; t++) {
		temp = p[t];
		ctx.lineTo(temp[0], temp[1]);
	}
	ctx.stroke();
}

function draw_sincspline(p,d) {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var start = l(p,0);
	var temp = start;
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo(start.x,start.y);
	for (var t = d; t < 1+d ; t+= d) {
		temp = l(p,t);
		ctx.lineTo(temp.x, temp.y);
	}
	ctx.stroke();
}
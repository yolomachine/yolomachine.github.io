const radius = 17, EPS = 1e-10;

function randInt(min, max) {
    ++max;
    return (Math.floor(Math.random() * (max - min)) + min);
}

function makeLine(point1, point2) {
    let beginPoint = { x: point1.x, y: point1.y };
    let endPoint = { x: point2.x, y: point2.y };
    let A = point2.y - point1.y;
    let B = point1.x - point2.x;
    let C = -A * point1.x - B * point1.y;
    return { A: A, B: B, C: C, beginPoint: beginPoint, endPoint: endPoint };
}

function isInSegment(a, b, c) {
    if (Math.abs(a - b) < EPS || Math.abs(b - c) < EPS) return false;
    return (a < b && b < c) || (c < b && b < a);
}

function intersectionPoint(line1, line2) {
    let det = line1.A * line2.B - line2.A * line1.B;
    if (Math.abs(det) < 1e-10) return false;
    let detX = -line2.B * line1.C + line1.B * line2.C;
    let detY = -line1.A * line2.C + line2.A * line1.C;
    let x = detX / det;
    let y = detY / det;
    if ((isInSegment(line1.beginPoint.x, x, line1.endPoint.x) ||
         isInSegment(line1.beginPoint.y, y, line1.endPoint.y)) &&
        (isInSegment(line2.beginPoint.x, x, line2.endPoint.x) ||
         isInSegment(line2.beginPoint.y, y, line2.endPoint.y)))
            return { x: x, y: y};
    return false;
}

function mod_for_AB(a, b) {
    return Math.sqrt((points[a].x - points[b].x) * (points[a].x - points[b].x) +
                     (points[a].y - points[b].y) * (points[a].y - points[b].y));
}

//Animate point
function shiftPoint(p) {
	if(p.timer<=0)
	{
		p.timer = (1+1*Math.random())*60;
		p.dx = p.originX-50+Math.random()*100;
		p.dy = p.originY-50+Math.random()*100;
	}
	else p.timer--;
	// p.x += (p.dx-p.x)/(120-p.timer);
	// p.y += (p.dy-p.y)/(120-p.timer);
	p.x += (p.dx-p.x)/p.timer;
	p.y += (p.dy-p.y)/p.timer;
}

//Draw lines to closest points
function drawLines(p) {
	if(!p.active) return;
	for(var i in p.closest) {
		ctx.beginPath();
		ctx.moveTo(p.x, p.y);
		ctx.lineTo(p.closest[i].x, p.closest[i].y);
		ctx.strokeStyle = 'rgba('+colors[gamma].graph+','+ p.active+')';
		ctx.stroke();
	}
}

//Distance between two points
function getDistance(p1, p2) {
	return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}
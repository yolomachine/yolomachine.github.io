var canvas, ctx, intersectionPoints, selectedPoint,
    points, edges, count, currentLevel = minLevel,
    fieldPointColor = "#333", noIntersectionColor = "black",
    mode, pointsCount = 10, minPointsCount = 10, maxPointsCount = 20, score;

function draw() {
	
	///
	if(graph2.animate)
	{
		ctx.clearRect(0, 0, graph2.width, graph2.height);
		
		let target = graph2.target;
		
		if(graph2.opacity<=0)
		{
			target.x = Math.floor(graph2.width * Math.random());
			target.y = Math.floor(graph2.height * Math.random());
			graph2.uni = 1;
		}
		else if(graph2.opacity>=255) graph2.uni = -1;
		
		graph2.opacity += graph2.uni;		
		
		for(let i in graph2.points) {
			//ANIMATION
			shiftPoint(graph2.points[i]);
			
			//target = {x: cursorPosX,y: cursorPosY}; <--- CURSOR VERSION
			
			//Points in range
			if(Math.abs(getDistance(target, graph2.points[i])) < 8000) {
				graph2.points[i].active = 0.3*(graph2.opacity/255);
				graph2.points[i].circle.active = 0.6*(graph2.opacity/255);
			} else if(Math.abs(getDistance(target, graph2.points[i])) < 40000) {
				graph2.points[i].active = 0.1*(graph2.opacity/255);
				graph2.points[i].circle.active = 0.3*(graph2.opacity/255);
			} else if(Math.abs(getDistance(target, graph2.points[i])) < 80000) {
				graph2.points[i].active = 0.02*(graph2.opacity/255);
				graph2.points[i].circle.active = 0.1*(graph2.opacity/255);
			} else {
				graph2.points[i].active = 0;
				graph2.points[i].circle.active = 0;
			}

			drawLines(graph2.points[i]);
			graph2.points[i].circle.draw();
		}
	}
	if(graph.animate)
	{
		ctx.clearRect(0, 0, graph.width, graph.height);
		
		// let target = graph.target;
		
		// target.x += graph.velocity.dx;
		// target.y += graph.velocity.dy;
		
		// /*
        // ctx.beginPath();
        // ctx.arc(target.x, target.y, 5, 0, Math.PI * 2, true);
        // ctx.closePath();
        // ctx.fillStyle = 'rgb(255,0,0)';
        // ctx.fill();
		// */
		
		// if(target.x>=fieldWidth) graph.velocity.dx = (Math.random()*-1)*graph_speed;
		// if(target.x<=0) graph.velocity.dx = Math.random()*graph_speed;
		// if(target.y>=fieldHeight) graph.velocity.dy = (Math.random()*-1)*graph_speed;
		// if(target.y<=0) graph.velocity.dy = Math.random()*graph_speed;
		
		
		// for(let i in graph.points) {
			// //ANIMATION
			// shiftPoint(graph.points[i]);
			
			// //target = {x: cursorPosX,y: cursorPosY}; <--- CURSOR VERSION
			
			// //Points in range
			// if(Math.abs(getDistance(target, graph.points[i])) < 4000) {
				// graph.points[i].active = 0.3;
				// graph.points[i].circle.active = 0.6;
			// } else if(Math.abs(getDistance(target, graph.points[i])) < 20000) {
				// graph.points[i].active = 0.1;
				// graph.points[i].circle.active = 0.3;
			// } else if(Math.abs(getDistance(target, graph.points[i])) < 40000) {
				// graph.points[i].active = 0.02;
				// graph.points[i].circle.active = 0.1;
			// } else {
				// graph.points[i].active = 0;
				// graph.points[i].circle.active = 0;
			// }

			// drawLines(graph.points[i]);
			// graph.points[i].circle.draw();
		// }
	
		let x, y;
		ctx.lineWidth = 2;
		intersectionPoints = [];
		for (let i = 0; i < edges.length; ++i) {
			count = 0;
			let curBegin = points[edges[i].beginPoint],
				curEnd = points[edges[i].endPoint];
			for (let j = 0; j < edges.length; ++j) {
				let nextBegin = points[edges[j].beginPoint],
					nextEnd = points[edges[j].endPoint];
				let curLine  = makeLine(curBegin, curEnd),
					nextLine = makeLine(nextBegin, nextEnd);
				let curEdge  = edges[i],
					nextEdge = edges[j];
				if (curLine == nextLine) continue;
				let p = intersectionPoint(curLine, nextLine);
				if (p !== false) {
					++count;
					curEdge.intersecting = nextEdge.intersecting = true;
					intersectionPoints.push(p);
					break;
				}
				if (!count) curEdge.intersecting = false;
			}
		}
		for (let i = 0, t0, t1; i < edges.length; ++i) {
			t0 = points[edges[i].beginPoint];
			t1 = points[edges[i].endPoint];
			ctx.lineJoin = ctx.lineCap = 'round';
			ctx.shadowBlur = 5;
			ctx.shadowColor = colors[gamma].pointColor;
			ctx.strokeStyle = colors[gamma].pointColor;
			if (edges[i].intersecting)  {
				ctx.shadowColor = 'rgb(0, 0, 0)';
				ctx.strokeStyle = colors[gamma].intersectionColor;
			}
			ctx.beginPath();
			ctx.moveTo(t0.x, t0.y);
			ctx.lineTo(t1.x, t1.y);
			ctx.closePath();
			ctx.stroke();
		}
		for (let i = 0; i < intersectionPoints.length; ++i) {
			ctx.shadowColor = colors[gamma].pointColor;
			ctx.beginPath();
			ctx.arc(intersectionPoints[i].x, intersectionPoints[i].y, 5, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fillStyle = colors[gamma].intersectionPointColor;
			ctx.fill();
		}
		//ctx.font = "30px Arial";
		for (let i = 0; i < points.length; ++i) {
			x = points[i].x;
			y = points[i].y;
			field.drawPointPath(radius, x, y, i);
			//ctx.fillStyle = '#f00';
			//ctx.fillText(i,x,y);
		}
	}
	window.requestAnimationFrame(draw);
	///
};

function Field() {
    this.clear = function(obj) {
        if (points && edges && intersectionPoints) {
            for (let i = 0; i < points.length; ++i) points[i] = null;
            for (let i = 0; i < edges.length; ++i) edges[i] = null;
            for (let i = 0; i < intersectionPoints.length; ++i) intersectionPoints[i] = null;
            canvas = null;
        }
        while (obj.lastChild) obj.removeChild(obj.lastChild);
    }
    this.selectPoint = function() {
        selectedPoint = undefined;
        let x, y, xDis, yDis, dis, minDis = Math.PI * (radius * radius) / 2;
        for (let i = 0; i < points.length; ++i) {
            x = points[i].x;
            y = points[i].y;
            xDis = x - cursorPosX;
            yDis = y - cursorPosY;
            dis  = xDis * xDis + yDis * yDis;
            if (dis <= minDis) { minDis = dis; selectedPoint = i };
        }
    }
    this.movePoint = function() {
        if (!points[selectedPoint].stat)
        {
            points[selectedPoint].x = cursorPosX;
            points[selectedPoint].y = cursorPosY;
        }
    }
    this.drawPointPath = function(r, x, y, i) {
        if (i == selectedPoint)
            ctx.fillStyle = isMoving ? "#5A5A5A" : "rgb(255,255,255)";
        else
            ctx.fillStyle = "rgb(255,255,255)";
        if (points[i].stat)
            ctx.fillStyle = "rgb(139, 35, 35)";
        ctx.beginPath();
        ctx.arc(x,y,r - 7,0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
		ctx.fill();
    }
    this.changeLevel = function (inc, skip = false) {
        if (mode == "classic") {
            if (((currentLevel + inc)>= minLevel) && ((currentLevel + inc)<= maxLevel)) {
                currentLevel += inc;
                field.createLayout();
            } else if ((currentLevel + inc) == maxLevel + 1)
			{
				let sound = document.createElement("audio");
				sound.src = "Music/win.mp3";
				sound.setAttribute("preload", "auto");
				sound.setAttribute("controls", "none");
				sound.style.display = "none";
				sound.play();
				returnToMenu();
			}
        }
        else if (((pointsCount + inc) <= maxPointsCount)&&((pointsCount + inc) >= minPointsCount))
            field.generateLayout(pointsCount += inc);
        else field.generateLayout(pointsCount);
        score = parseInt(score) + 100*(!skip);
		let scr = document.getElementById("score");
        if(scr) scr.innerHTML = "Score: " + score;
        if (!skip) {
            let sound = document.createElement("audio");
            sound.src = "Music/victory.mp3";
            sound.setAttribute("preload", "auto");
            sound.setAttribute("controls", "none");
            sound.style.display = "none";
            sound.play();
        }
    }
    this.createLayout = function() {
        points = [];
        edges  = [];
        let level = presetLevels[currentLevel];
        for (let i = 0; i < level.points.length; ++i) {
            let point = {};
            point.x = level.points[i].x;
            point.y = level.points[i].y;
            point.stat = level.points[i].stat;
            points.push(point);
        }
        for (let i = 0; i < level.edges.length; ++i) {
            for (let j = 0; j < level.edges[i].length - 1; ++j) {
                let edge = {};
                edge.beginPoint = level.edges[i][j];
                edge.endPoint = level.edges[i][j + 1];
                edge.intersecting = false;
                edges.push(edge);
            }
        }
    }
    this.generateLayout = function(amount) {
        console.log(amount % 2);
        switch(amount % 2) {
            case 0: treeGenerate(amount); console.log('TREE');break;
            case 1: triangleGenerate(amount); console.log('TRIANGLE');break;
            default: break;
        }
    }
}

var field = new Field();
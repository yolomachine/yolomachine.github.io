const fieldWidth = 1000, fieldHeight = 800, n = 4, graph_speed = 4;
var progressDelta = 10;
var cursorPosX, cursorPosY, isMoving;

///
var gamma = 0;
const colors = [
    {
        background: '#fff',
		graph: '255,152,73',
		pointColor: '#fff',
		border: '#000',
		filter: 'none',
		intersectionPointColor: 'black',
		// noIntersectionColor = 'black',
		intersectionColor: 'grey'
    },
    {
        background: '#000',
		graph: '100,164,255',
		pointColor: '#000',
		border: '#fff',
		filter: 'invert(1)',
		intersectionPointColor: 'white',
		// noIntersectionColor = 'black',
		intersectionColor: 'grey'
    }];

function Graph(width,height,radius,animate) {
	///POINTS
	this.points = [];
	this.width = width;
	this.height = height;
	this.velocity = {dx:0,dy:0};
	this.animate = animate;
	this.opacity = 0;
	this.uni = 1;
	this.target = {x:width/2,y:height/2};
	
	for(let x = 0; x < width; x = x + width/20) {
		for(let y = 0; y < height; y = y + height/20) {
			let px = x + Math.random()*width/20;
			let py = y + Math.random()*height/20;
			let p = {x: px, originX: px, y: py, originY: py, dx: px, dy: py, timer: 0};
			this.points.push(p);
		}
	}

	///FIND 5 CLOSEST
	for(let i = 0; i < this.points.length; i++) {
		let closest = [];
		let p1 = this.points[i];
		for(let j = 0; j < this.points.length; j++) {
			let p2 = this.points[j]
			if(!(p1 == p2)) {
				let placed = false;
				for(let k = 0; k < 5; k++) {
					if(!placed) {
						if(closest[k] == undefined) {
							closest[k] = p2;
							placed = true;
						}
					}
				}

				for(var k = 0; k < 5; k++) {
					if(!placed) {
						if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
							closest[k] = p2;
							placed = true;
						}
					}
				}
			}
		}
		p1.closest = closest;
		//this.points[i].closest = closest;
		
		let c = new Circle(this.points[i], radius+Math.random()*radius, 'rgba(255,255,255,0.3)');
		this.points[i].circle = c;
	}
}

function Circle(pos,rad,color) {
	let _this = this;

	// constructor
	(function() {
		_this.pos = pos || null;
		_this.radius = rad || null;
		_this.color = color || null;
	})();

	this.draw = function() {
		if(!_this.active) return;
		ctx.beginPath();
		ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'rgba('+colors[gamma].graph+','+ _this.active+')';
		ctx.fill();
	};
}
///

var levelControls = [];
levelControls.push(createButton("selector", "return-button", returnToMenu));
levelControls.push(createButton("selector", "reset-button", resetLevel));
levelControls.push(createButton("selector", "bwd-button", prevLevel));
levelControls.push(createButton("selector", "fwd-button", nextLevel));
levelControls.push(createButton("selector", "inc-button", nextLevel));
levelControls.push(createButton("selector", "dec-button", prevLevel));
levelControls.push(createLabel("score", "score", "Score: 0"));
var selectors = createDiv("selectors", "selectors", "");

var progressBar = createDiv("progress-bar", "progress-bar", "");
progressBar.appendChild(createDiv("progress-status", "progress-status", ""));

var levelSelectTable = [];
for (let i = 0; i < n; ++i) {
    levelSelectTable.push(createDiv("level-select-row", "row" + i, ""));
    for (let j = 0; j < n; ++j) {
        levelSelectTable[i].appendChild(createDiv("level-select-tile", i * n + j, (i + 1) + j * n));
        levelSelectTable[i].lastChild.onclick = function () {
            currentLevel = (i + 1) + j * n - 1;
            field.clear(document.body);
            initializeField();
        };
    };
}

var menuButtons = createDiv("menu", "menu", "");
menuButtons.setAttribute("align", "center");
menuButtons.appendChild(createDiv("menu-selector", "new-game", "New game"));
menuButtons.lastChild.onclick = startClassicGame;
menuButtons.appendChild(createDiv("menu-selector", "endless", "Endless game"));
menuButtons.lastChild.onclick = startEndlessGame;
menuButtons.appendChild(createDiv("menu-selector", "changegamma", "Change Gamma"));
menuButtons.lastChild.onclick = changeGamma;

for (let i = 0; i < levelControls.length; ++i) {
    selectors.appendChild(levelControls[i]);
}

function returnToMenu() {
	mode = "none";
	score = 0;
    field.clear(document.body);
    initializeMenu();
}

function resetLevel() {
    if (mode == "classic") field.createLayout();
    else field.generateLayout(pointsCount);
}

function nextLevel() {
    field.changeLevel(1, true);
}

function prevLevel() {
    field.changeLevel(-1, true);
}

function createDiv(className, id, label) {
    let div = document.createElement("div");
    div.className = className;
    div.id = id;
    div.appendChild(document.createElement("label"));
    div.lastChild.innerHTML = label;
    return div;
}


function createLabel(className, id, innerHTML) {
    let label = document.createElement("label");
    label.className = className;
    label.id = id;
    label.innerHTML = innerHTML;
    return label;
}

function createButton(className, id, fn) {
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.id = id;
    btn.onclick = fn;
    return btn;
}

function initializeLevelControls() {
    document.body.appendChild(selectors);
}

function initializeField() {
	graph.animate = true;
	graph2.animate = false;
	
    if (mode == "classic") field.createLayout();
    else field.generateLayout(minPointsCount);
    cursorPosX = cursorPosY = score = 0;
    canvas = document.createElement("canvas");
	canvas.style.backgroundColor = colors[gamma].border;
    ctx = canvas.getContext("2d");
    canvas.width = fieldWidth > screen.availWidth ? screen.availWidth : fieldWidth;
    canvas.height = fieldHeight > screen.availHeight ? screen.availHeight : fieldHeight;
    document.body.appendChild(canvas);
    document.addEventListener('mousemove',  mouse.move,  false);
	document.addEventListener('mouseup',  mouse.up,  false);
    canvas.addEventListener('mousedown',  mouse.down,  false);
	document.addEventListener('touchmove',  mouse.movetouch,  false);
	document.addEventListener('touchend',  mouse.uptouch,  false);
    canvas.addEventListener('touchstart',  mouse.downtouch,  false);
    isMoving = false;
    initializeLevelControls();
    //draw();
}

function Mouse() {
    this.uptouch = function(event) {
        isMoving = false;
        selectedPoint = undefined;
        if (!intersectionPoints.length)
            field.changeLevel(1);
    }
    this.movetouch = function(event) {
        mouse.getCoords2(event);
        if (selectedPoint != undefined) field.movePoint();
    }
    this.downtouch = function(event) {
        isMoving = true;
        mouse.getCoords2(event);
        field.selectPoint();
        if(selectedPoint != undefined)
		{
			console.log(selectedPoint);
			field.movePoint();
		}
    }
    this.move = function(event) {
        mouse.getCoords(event);
        if (selectedPoint != undefined) field.movePoint();
    }
    this.down = function(event) {
        isMoving = true;
        mouse.getCoords(event);
        field.selectPoint();
        if(selectedPoint != undefined)
		{
			console.log(selectedPoint);
			field.movePoint();
		}
    }
    this.up = function(event) {
        isMoving = false;
        selectedPoint = undefined;
        if (!intersectionPoints.length)
            field.changeLevel(1);
    }
    this.getCoords = function(event) {
        if (points[0] == null) return;
        cursorPosX = event.pageX - canvas.offsetLeft;
        cursorPosY = event.pageY - canvas.offsetTop;
        if (cursorPosX > fieldWidth - radius) cursorPosX = fieldWidth - radius;
        else if (cursorPosX < radius) cursorPosX = radius;
        if (cursorPosY > fieldHeight - radius) cursorPosY = fieldHeight - radius;
        else if (cursorPosY < radius) cursorPosY = radius;
    }
    this.getCoords2 = function(event) {
        if (points[0] == null) return;
        cursorPosX = event.changedTouches[0].pageX - canvas.offsetLeft;
        cursorPosY = event.changedTouches[0].pageY - canvas.offsetTop;
        if (cursorPosX > fieldWidth - radius) cursorPosX = fieldWidth - radius;
        else if (cursorPosX < radius) cursorPosX = radius;
        if (cursorPosY > fieldHeight - radius) cursorPosY = fieldHeight - radius;
        else if (cursorPosY < radius) cursorPosY = radius;
    }


};

var mouse = new Mouse();
var graph = new Graph(fieldWidth,fieldHeight,2,false);
var graph2 = new Graph(window.innerWidth,window.innerHeight,10,true);
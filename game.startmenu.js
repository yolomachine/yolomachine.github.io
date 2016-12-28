function Menu() {
    this.createLayout = function() {
        document.body.appendChild(menuButtons);
    }
    this.loadGame = function() {
        document.body.appendChild(progressBar);
        let progress = document.getElementById("progress-status");
        let id = setInterval(frame, 15);
        function frame() {
            if (progressDelta >= 100) { clearInterval(id); menu.createLayout(); progress.style.display = "none"; progress.parentNode.style.display = "none";}
            else {
                ++progressDelta;
                progress.style.width = progressDelta + "%";
            }
        }
    }
    this.createLevelView = function() {
        for (let i = 0; i < n; ++i) document.body.appendChild(levelSelectTable[i]);
    }
}

function startClassicGame() {
    mode = "classic";
    field.clear(document.body);
    menu.createLevelView();
	graph.velocity = {dx:(Math.random()*2-1)*graph_speed,dy:(Math.random()*2-1)*graph_speed};
}

function startEndlessGame() {
    mode = "endless";
    field.clear(document.body);
    initializeField();
	graph.velocity = {dx:(Math.random()*2-1)*graph_speed,dy:(Math.random()*2-1)*graph_speed};
}

function changeGamma() {
	++gamma;
	if(gamma>=colors.length) gamma = 0;
	if(canvas) canvas.style.backgroundColor = colors[gamma].background;
	
	document.body.style.background = colors[gamma].background;
	
	let b = document.querySelectorAll(".menu>div");
	for(let i = 0; i < b.length; ++i) {
		b[i].style.border = '5px solid '+colors[gamma].border;
		b[i].style.backgroundColor = colors[gamma].background;
		b[i].style.color = colors[gamma].border;
	}
	for (let i = 0; i < levelControls.length; ++i) {
		levelControls[i].style.filter = colors[gamma].filter;
		levelControls[i].style.WebkitFilter = colors[gamma].filter;
		levelControls[i].style.MozFilter = colors[gamma].filter;
		levelControls[i].style.OFilter = colors[gamma].filter;
		levelControls[i].style.MsFilter = colors[gamma].filter;
	}
}

function initializeGameOnce() {	
    menu.loadGame();
	
	//
	canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	canvas.style.border = "none";
	canvas.style.position = "absolute";
	canvas.style.top = "0";
	canvas.style.left = "0";
	canvas.style.zIndex = "-1";
	canvas.style.backgroundColor = colors[gamma].background;
		
    document.body.appendChild(canvas);
	graph.velocity = {dx:0,dy:0};
	
    draw();
	//
}

function initializeMenu() {
    field.clear(document.body);
    menu.loadGame();
	
	//
	graph.animate = false;
	graph2.animate = true;
	
	canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	canvas.style.border = "none";
	canvas.style.position = "absolute";
	canvas.style.top = "0";
	canvas.style.left = "0";
	canvas.style.zIndex = "-1";
	canvas.style.backgroundColor = colors[gamma].background;
	
    document.body.appendChild(canvas);
	graph.velocity = {dx:0,dy:0};
	
    //draw();
	//
}

var menu = new Menu();
window.onload = initializeGameOnce;
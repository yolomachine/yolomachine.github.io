function treeGenerate(amount) {
    pointsCount = amount;
    points = [];
    edges  = [];
	let firstRope,firstDelta = 1;

    let nodes = [], node = {};
    node.parent = 0;
    node.root = 0;
    node.len = 0;
    node.ch = amount;
    node.lastRope = 0;
    node.lastDelta = 1;
    node.delta = 1;
    nodes.push(node);

    let i = 0, n = 0, type = 1, lastPoint = 0;
    while (points.length < amount - 1) {
        ++nodes[n].len;
        let point = {};
        let edge = {};
        point.x = randInt(radius, fieldWidth - radius);
        point.y = randInt(radius, fieldHeight - radius);
        points.push(point);

        if(nodes[n].len >= nodes[n].ch) {
			if((lastPoint != nodes[n].root)&&(lastPoint != 0)) {
				edge = {};
				edge.beginPoint = lastPoint;
				edge.endPoint = i;
				edges.push(edge);
			}
			if(!firstRope) firstRope = i;
			lastPoint = i;
			while(nodes[n].len >= nodes[n].ch)
			{
				let l = nodes[n].len-1;
				let ii = nodes[n].root;
				n = nodes[n].parent;
				i = nodes[n].root;
				nodes[n].lastRope = ii;
				nodes[n].len += l;
			}
            nodes[n].lastDelta = nodes[n].delta;
            nodes[n].delta = nodes[n].root+nodes[n].len;
        }
        else if ((i > 0) && (nodes[n].ch > 1)) {
            let act = randInt(1,3);

            switch(act) {
                //Create rope
                case 1:
                    if((lastPoint != nodes[n].root)&&(lastPoint != 0)) {
                        edge = {};
                        edge.beginPoint = lastPoint;
                        edge.endPoint = i;
                        edges.push(edge);
                    }
					if(!firstRope) firstRope = i;
                    lastPoint = i;
                    nodes[n].lastRope = i;
                    i = nodes[n].root;
                    nodes[n].lastDelta = nodes[n].delta;
                    nodes[n].delta = nodes[n].root+nodes[n].len;
                    break;

                //Create node
                case 2:
                    let node = {};
                    node.parent = n;
                    node.root = node.lastRope = i;
                    node.lastDelta = i+1;
                    node.delta = i+1;
                    node.len = 1;
                    node.ch = randInt(Math.max(1,Math.floor((nodes[n].ch-nodes[n].len)/2)),nodes[n].ch-nodes[n].len);
                    nodes.push(node);
                    n = nodes.length-1;
                    break;

                //Not declared - default
                case 3:
					
                    break;
            }
        }

        //TYPES OF EDGE
        if ((nodes[n].lastRope > nodes[n].root) && (i > nodes[n].root)) type = randInt(1,5);
        else type = 1;
        switch(type) {
            case 1:
                edge = {};
                edge.beginPoint = i;
                edge.endPoint = points.length;
                edges.push(edge);
                break;

            case 2:
                edge = {};
                nodes[n].lastDelta += randInt(0,nodes[n].lastRope - nodes[n].lastDelta);
                edge.beginPoint = nodes[n].lastDelta;
                edge.endPoint = i;
                edges.push(edge);
                break;

            default:
                edge = {};
                edge.beginPoint = i;
                edge.endPoint = points.length;
                edges.push(edge);

                nodes[n].lastDelta += randInt(0, nodes[n].lastRope - nodes[n].lastDelta);

                edge = {};
                edge.beginPoint = nodes[n].lastDelta;
                edge.endPoint = i;
                edges.push(edge);
                break;
        }

        if (i < points.length) i = points.length;
        else ++i;
    }
    delete node;
    delete nodes;
    let point = {};
    point.x = randInt(radius, fieldWidth - radius);
    point.y = randInt(radius, fieldHeight - radius);
    points.push(point);

    let edge = {};
    edge.beginPoint = points.length - 1;
    edge.endPoint = lastPoint;
    edges.push(edge);
}

var N_CONST_POINT = 1, N_EDGES = 2.5;
function triangleGenerate(amount) {
    let N_POINT = 4*amount / 30;
    let level = 1;
    points = [];
    edges  = [];

    let first = points.length;
    for (let i = 0; i < 3; i++) {
        let point = {};
        point.x = Math.round(radius+(fieldWidth-radius) * Math.random());
        point.y = Math.round(radius+(fieldHeight-radius) * Math.random());
        points.push(point);
    }
    for (let i = 0; i < 3; i++) {
        if (i > 1) {
            add(0);
        }
    }
    add(1);

    generate(first, first + 1, first + 2, level * N_POINT);
    for (let i = 0; i < N_CONST_POINT; i++) {
		points[Math.floor((points.length) * Math.random())].stat = true;
    }
    for (let i = first; i < points.length; i++) {
        //if (!points[i].stat) {
            points[i].x = Math.round(radius+(fieldWidth-radius) * Math.random());
            points[i].y = Math.round(radius+(fieldHeight-radius) * Math.random());
        //}
    }
}

function add(a) {
    if (Math.round(N_EDGES * Math.random())) {
        let edge = {};
        edge.beginPoint = a;
        edge.endPoint = points.length - 1;
        edges.push(edge);
        return true;
    }
}

function generate(a, b, c, counter, amount) {
    if (counter <= 0 || points.length - 1 == amount) {
        return;
    }

    let lambda = mod_for_AB(a, c) / mod_for_AB(b, c);
    let F = [2];
    F.c = [5];
    F.c.x = (points[a].x + lambda * points[b].x) / (1 + lambda);
    F.c.y = (points[a].y + lambda * points[b].y) / (1 + lambda);
    F.c.a = points[c].y - F.c.y;
    F.c.b = F.c.x - points[c].x;
    F.c.c = points[c].x * F.c.y - F.c.x * points[c].y;

    lambda = mod_for_AB(b, a) / mod_for_AB(a, c);
    F.a = [5];
    F.a.x = (points[b].x + lambda * points[c].x) / (1 + lambda);
    F.a.y = (points[b].y + lambda * points[c].y) / (1 + lambda);
    F.a.a = points[a].y - F.a.y;
    F.a.b = F.a.x - points[a].x;
    F.a.c = points[a].x * F.a.y - F.a.x * points[a].y;
    let Centre = [2];
    Centre.x = (F.c.c - (F.c.b * F.a.c) / F.a.b) / ((F.c.b * F.a.a) / F.a.b - F.c.a);
    Centre.y = (-F.a.a * Centre.x - F.a.c) / F.a.b;
    let radius = ((points[a].y - points[b].y) * Centre.x + (points[b].x - points[a].x) * Centre.y +
        points[a].x * points[b].y - points[b].x * points[a].x) / mod_for_AB(a, b);


    let point = {};
    if (Math.round(2 * Math.random())) {
        point.x = Centre.x + Math.round(radius * Math.random());
    }
    else {
        point.x = Centre.x - Math.round(radius * Math.random());
    }
    if (Math.round(2 * Math.random())) {
        point.y = Centre.y + Math.round(radius * Math.random());
    }
    else {
        point.y = Centre.y - Math.round(radius * Math.random());
    }
    points.push(point);
    let added = false;
    added = (add(a) == true) ? true : added;
    added = (add(b) == true) ? true : added;
    added = (add(c) == true) ? true : added;
    if (!added) {
        points.pop();
        return;
    }
    added = points.length - 1;
    generate(a, b, added, counter - 1, amount);
    generate(a, added, c, counter - 1, amount);
    generate(added, b, c, counter - 1, amount);
}
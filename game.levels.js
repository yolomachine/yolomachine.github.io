var field = [2];
field.height = 800;
field.width = 1000;
const presetLevels = [
    {
        points: [{ x: 400, y: 156 },
            { x: 750, y: 241, stat: true},
            { x: 84,  y: 233 },
            { x: 500, y: 700 },
            { x: 250, y: 500 }],
        edges: [[1, 2, 3],
            [0, 2, 3],
            [1, 3, 0],
            [0, 1, 2],
            [2, 4, 0]]
    },
    {
        points: [{ x: 513, y: 256 },
            { x: 300, y: 400 },
            { x: 379, y: 500 },
            { x: 600, y: 400 },
            { x: 333, y: 333 }],
        edges: [[1, 2, 0, 4],
            [0, 3, 1, 2],
            [4, 3, 0, 2],
            [2, 1, 0, 2]]
    },
    {
        points: [{ x: 100, y: 700 },
            { x: 800, y: 300 },
            { x: 850, y: 190 },
            { x: 680, y: 100 },
            { x: 900, y: 150 }],
        edges: [[0, 1, 2, 3, 0, 4],
            [1, 2, 3, 1, 0, 3],
            [4, 0],
            [3, 1, 2]]
    },
    {
        points: [{ x: field.width / 2 + 50, y: field.height / 4},
            { x: field.width / 4, y: field.height / 4 + 50},
            { x: 3 * field.width / 4, y: field.height / 4 + 50},
            { x: field.width / 2 + 50, y: 3*field.height / 4}],
        edges: [[0, 3],
            [1, 2]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 6},
            { x: 2*field.width / 3, y: field.height / 3},
            { x: 4 * field.width / 5, y: field.height / 2},
            { x: field.width / 3, y: field.height / 3},
            { x: field.width / 2, y: 5 * field.height / 6},
            { x: field.width / 3, y: 2*field.height / 3},
            { x: field.width / 5, y: field.height / 2},
            { x: 2*field.width / 3, y: 2*field.height / 3}],
        edges: [[0, 4],
            [1, 5],
            [2, 6],
            [3, 7]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 8},
            { x: field.width / 2, y: field.height / 2},
            { x: field.width / 2, y: 7 * field.height / 8},
            { x: 2 * field.width / 3, y: 2 * field.height / 8},
            { x: field.width / 3, y: 3 * field.height / 8},
            { x: 2 * field.width / 3, y: 4 * field.height / 8},
            { x: field.width / 3, y: 5 * field.height / 8},
            { x: 2 * field.width / 3, y: 6 * field.height / 8}],
        edges: [[0, 1, 2],
            [3, 4, 5, 6, 7]]
    },
    {
        points: [{ x: field.width / 4, y: field.height / 5},
            { x: 3 * field.width / 4, y: field.height / 5},
            { x: field.width / 4, y: field.height / 2},
            { x: 3 * field.width / 4, y: field.height / 2},
            { x: field.width / 4, y: 4 * field.height / 5},
            { x: 3 * field.width / 4, y: 4 * field.height / 5}],
        edges: [[0, 1, 3, 5, 4 ,2, 0],
            [0, 3, 4],
            [1, 2, 5]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 7},
            { x: 4 * field.width / 5, y: field.height / 5},
            { x: 6 * field.width / 7, y: field.height / 2},
            { x: 3 * field.width / 4, y: 4 * field.height / 5},
            { x: field.width / 2, y: 6 * field.height / 7},
            { x: field.width / 5, y: 4 * field.height / 5},
            { x: field.width / 7, y: field.height / 2},
            { x: field.width / 5, y: field.height / 5}],
        edges: [[0, 3, 6, 1, 4, 7, 2, 5, 0]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 7},
            { x: 4 * field.width / 5, y: field.height / 5},
            { x: 6 * field.width / 7, y: field.height / 2},
            { x: 3 * field.width / 4, y: 4 * field.height / 5},
            { x: field.width / 2, y: 6 * field.height / 7},
            { x: field.width / 5, y: 4 * field.height / 5},
            { x: field.width / 7, y: field.height / 2},
            { x: field.width / 5, y: field.height / 5},
            { x: field.width / 2, y: field.height / 2}],
        edges: [[0, 3, 6, 1, 4, 7, 2, 5, 0],
            [0, 8, 4],
            [6, 8, 2]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 7},
            { x: 4 * field.width / 5, y: field.height / 5},
            { x: 6 * field.width / 7, y: field.height / 2},
            { x: 4 * field.width / 5, y: 4 * field.height / 5},
            { x: field.width / 2, y: 6 * field.height / 7},
            { x: field.width / 5, y: 4 * field.height / 5},
            { x: field.width / 7, y: field.height / 2},
            { x: field.width / 5, y: field.height / 5}],
        edges: [[1, 2, 3, 4, 5, 6, 7, 0],
            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 7},
            { x: 4 * field.width / 5, y: field.height / 5},
            { x: 6 * field.width / 7, y: field.height / 2},
            { x: 3 * field.width / 4, y: 4 * field.height / 5},
            { x: field.width / 2, y: 6 * field.height / 7},
            { x: field.width / 5, y: 4 * field.height / 5},
            { x: field.width / 7, y: field.height / 2},
            { x: field.width / 5, y: field.height / 5}],
        edges: [[1, 2, 3, 4, 5, 6, 7, 0, 4, 1, 5, 2, 6, 3, 7]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 8},
            { x: 7 * field.width / 8, y: field.height / 2},
            { x: field.width / 2, y: 7 * field.height / 8},
            { x: field.width / 8, y: field.height / 2},
            { x: field.width / 3, y: field.height / 3, stat: true},//CONST!!!
            { x: 2*field.width / 3, y: field.height / 3, stat: true},//CONST!!!
            { x: 2*field.width / 3, y: 2*field.height / 3, stat: true},//CONST!!!
            { x: field.width / 3, y: 2*field.height / 3, stat: true},//CONST!!!
            { x: field.width / 2, y: field.height / 2, stat: true}],//CONST!!!
        edges: [[0, 8, 2],
            [3, 8, 1],
            [4, 5, 6, 7, 4]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 7, stat: true},//CONST!!!
            { x: 6 * field.width / 7, y: field.height / 2, stat: true},//CONST!!!
            { x: field.width / 2, y: 6 * field.height / 7, stat: true},//CONST!!!
            { x: field.width / 7, y: field.height / 2, stat: true}, //CONST!!!
            { x: field.width / 5, y: field.height / 5, stat: true},//CONST!!!
            { x: 4 * field.width / 5, y: field.height / 5, stat: true},//CONST!!!
            { x: 4 * field.width / 5, y: 4 * field.height / 5, stat: true},//CONST!!!
            { x: field.width / 5, y: 4 * field.height / 5, stat: true},//CONST!!!
            { x: 2.5*field.width / 6, y: 2.5*field.height / 6},
            { x: 3.5*field.width / 6, y: 2.5*field.height / 6},
            { x: 3.5*field.width / 6, y: 3.5*field.height / 6},
            { x: 2.5*field.width / 6, y: 3.5*field.height / 6}],
        edges: [[0, 9, 1, 10, 2, 11, 3, 8, 0],
            [8, 9, 10, 11, 8],
            [4, 5, 6, 7, 4]]
    },
    {
        points: [{ x: field.width / 2, y: field.height / 4 + 20, stat: true},//CONST!!!
            { x: field.width / 2, y: 3*field.height / 4 - 20, stat: true},//CONST!!!
            { x: 3 * field.width / 4 - 20, y: field.height / 2, stat: true},//CONST!!!
            { x: field.width / 4 + 20, y: field.height / 2, stat: true},//CONST!!!
            { x: field.width / 2, y: field.height / 2},
            { x: field.width / 3, y: field.height / 3},
            { x: 2*field.width / 3, y: field.height / 3, stat: true},//CONST!!!
            { x: 2*field.width / 3, y: 2*field.height / 3},
            { x: field.width / 3, y: 2*field.height / 3, stat: true}],//CONST!!!
        edges: [[0, 4, 1],
            [2, 4, 3],
            [5, 6, 7, 8, 5]]
    },
    {
        points: [{ x: field.width / 2 - 50, y: field.height / 9},
            { x: field.width / 3 + 50, y: field.height / 10},
            { x: 6 * field.width / 7, y: field.height / 10 + 10},
            { x: 9 * field.width / 10, y: field.height / 2 - 70},
            { x: 9 * field.width / 10, y: field.height / 2 + 70},
            { x: 8 * field.width / 9, y: 6 * field.height / 7},
            { x: field.width / 2 + 50, y: 8 * field.height / 9},
            { x: field.width / 3, y: 8 * field.height / 9 - 10},
            { x: field.width / 7, y: 2 * field.height / 3},
            { x: field.width / 8, y: field.height / 4},
            { x: field.width / 2 - 50, y: field.height / 2 + 20},
            { x: field.width / 3, y: field.height / 3}],
        edges: [[0, 6, 9, 10, 5, 2, 8, 1, 3, 7, 11, 4]]
    },
    {
        points: [{ x: field.width / 5, y: field.height / 7},
            { x: field.width / 3, y: field.height / 12},
            { x: field.width / 2, y: field.height / 12},
            { x: 2 * field.width / 3, y: field.height / 11},
            { x: 4 * field.width / 5, y: field.height / 12},
            { x: 10 * field.width / 11, y: field.height / 12},//5
            { x: 9 * field.width / 10, y: field.height / 4},
            { x: field.width / 2, y: field.height / 5},
            { x: 10 * field.width / 11, y: field.height / 3},
            { x: 9 *field.width / 10, y: field.height / 2},
            { x: 3 * field.width / 4 - 20, y: 2 * field.height / 3 - 50},//10
            { x: 2 * field.width / 3, y: 2 * field.height / 3},
            { x: field.width / 2 - 70, y: 2 * field.height / 3 - 50},
            { x: field.width / 2 - 100, y: 2 * field.height / 3  -70},
            { x: 5 * field.width / 6, y: 3 * field.height / 4},
            { x: 3 * field.width / 4, y: 3 * field.height / 4},//15
            { x: 4 * field.width / 5, y: 14 * field.height / 15},
            { x: field.width / 2 - 50, y: 4 * field.height / 5},
            { x: 3 * field.width / 4 - 50, y: 13 * field.height / 14},
            { x: field.width / 4, y: 3 * field.height / 4},
            { x: field.width / 10, y: field.height / 2},//20
            { x: field.width / 3 + 60, y: field.height / 2 - 40},
            { x: field.width / 2, y: field.height / 3},
            { x: field.width / 5, y: field.height / 4 - 70}],
        edges: [[0, 7, 3, 14, 18, 6],
            [0, 17, 15, 16, 20, 9, 2],
            [21, 23, 10, 8, 12, 5, 13, 4, 11, 1, 19, 22]]
    }], minLevel = 0, maxLevel = 15;

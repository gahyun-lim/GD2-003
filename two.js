var canvas;
var ctx;
var w = 1300;
var h = 700;
allRect = [];


var o1 = {
    "x": w/2,
    "y": h/2,
    "w": 100,
    "h": 70,
    "d": 1,
    "angle": 0,
    "changle": 15,
}


document.querySelector ("#myCanvas").onclick = click;
document.querySelector ("#myCanvas").onmousemove = move;
document.onkeydown = moveShape;



setUpCanvas ();
animationLoop ();



///////////////////////// ANIMATIONLOOP

function animationLoop () {
    
    clear ();
    for (var i = 0; i < allRect.length; i++) {
        rect (allRect [i]);
        // forward (allRect [i], 5);
        // turn (allRect [i]);
        bounce (allRect [i]);
    }

    requestAnimationFrame (animationLoop);
}

function clear () {
    ctx.clearRect (0, 0, w, h);
}




///////////////////////// MOVESHAPE

function moveShape (event) {
    
    if (allRect.length != 0) {
        
            /// up 38
        if (event.keyCode == 38) {
            allRect [0].d++
            // allRect [0].angle = -90;
            forward (allRect [0], 5);
        };

        /// down 40
        if (event.keyCode == 40) {
            allRect [0].d--
            // allRect [0].angle = 90;
            forward (allRect [0], 5);
        }

        /// left 37
        if (event.keyCode == 37) {
            // allRect [0].angle = 180;
            // forward (allRect [0], 5);
            turn (allRect [0], -15);
        }
        
        /// right 39
        if (event.keyCode == 39) {
            // allRect [0].angle = 0;
            // forward (allRect [0], 5);
            turn (allRect [0], 15);
        }
    }

    console.log ("moveShape", event.keyCode);
}



///////////////////////// ONMOUSEMOVE

function move (event) {
    
    for (var i = 0; i < allRect.length; i++) {
        allRect [i].c = rand(200) + event.offsetX/4;
        allRect [i].a, allRect [i].h = 10 + event.offsetY/4;
    }

    console.log (event.offsetX, event.offsetY);
}



////////////////////////////////

function click (event) {
    addObjectWithLocation (allRect, event.offsetX, event.offsetY);
}



////////////////////////////////

function addObjectWithLocation (a, x, y) {
    a.push ({
        "x": x,
        "y": y,
        "w": 100,
        "h": 70,
        "d": rand(10),
        "angle": rand(360),
        "changle": 15,
    });
}


function addObject (a) {
    a.push ({
        "x": w/2,
        "y": h/2,
        "w": 100,
        "h": 70,
        "d": rand(10),
        "angle": rand(360),
        "changle": 15,
    });
}



///////////////////////// BOUNCE

function bounce (o) {
    
    if (o.x > w || o.x < 0) {
        turn (o, 180);
    };

    if (o.y > h || o.y < 0) {
        turn (o, 180);
    };
}




///////////////////////// SHAPE

function rect (o) {
    
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    var d = o.d;

    turn (o, 180);
    forward (o, o.w/2);
    turn (o, 90);
    forward (o, o.h/2);
    turn (o, 90);

    ctx.beginPath ();
    ctx.moveTo (o.x, o.y);
    forward (o, o.w);
    ctx.lineTo (o.x, o.y);
    turn (o, 100);
    forward (o, o.h);
    ctx.lineTo (o.x, o.y);
    turn (o, 80);
    forward (o, o.w);
    ctx.lineTo (o.x, o.y);
    turn (o, 100);
    forward (o, o.h);
    ctx.lineTo (o.x, o.y);
    
    ctx.fillStyle = "#6499EB";
    ctx.fill();

    ctx.stroke ();

    o.x = x;
    o.y = y;
    o.angle = a;
    o.d = d;
}



////////////////////////////////

function turn (o, angle) {
    
    if (angle != undefined) {
        o.changle = angle;
    };
    o.angle += o.changle;
}

function forward (o, d) {
    var changeX;
    var changeY;
    var oneDegree = Math.PI/180;
    
    if (d != undefined) {
        o.d = d;
    };
    
    changeX = o.d*Math.cos (o.angle*oneDegree);
    changeY = o.d*Math.sin (o.angle*oneDegree);
    o.x += changeX;
    o.y += changeY;
}


////////////////////////////////

function randn (r) {
    var result = Math.random ()*r-r/2;
    return result
}

function randi (r) {
    var result = Math.floor (Math.random()*r);
    return result
}

function rand (r) {
    return Math.random ()*r
}



function setUpCanvas () {
    canvas = document.querySelector ("#myCanvas");
    ctx = canvas.getContext ("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border= "5px solid black"
}



console.log ("two_click and move 2");
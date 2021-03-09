var canvas;
var ctx;
var w = 1200;
var h = 700;

var allRect = [];
var allCircles = [];

var o1 = {
    "x": 0,
    "changex": rand (10),
    "y": h/2,
    "changey": rand (10),
    "r": 50,
    "w": 100,
    "h": 100,
    "c": 260,
    "a": 0.5,
    "d": 10,
    "angle": 0,
    "changle":15
}




document.querySelector ("#myCanvas").onclick = click;


setUpCanvas ();
createData (230);
animationLoop ();




//////////////////////////////////////////////////// animationloop

function animationLoop () {
    clear ();

    for (var i = 0; i < allRect.length; i++) {
        rect (o1);
        forward (o1);
        bounce (o1);
        turn (o1, randn (10));
    }

    for (var i=0; i < allCircles.length; i++) {
        circle (allCircles [i]);
        forward (allCircles [i]);
        bounce (allCircles [i]);
        turn (allCircles [i], randn (30));
        collisionRemove (o1, allCircles [i]);
        collisionTestArray (allCircles [i], allCircles);
    }

    requestAnimationFrame (animationLoop);
}


function clear () {
    ctx.clearRect (0, 0, w, h);
}




//////////////////////////////////////////////////// collision

function collisionTestArray (o, a) {
    
    for (var i=0; i < a.length; i++) {
        if (o != a[i]) {
            collision (o, a[i]);
        }
    }    
}


function collisionRemove (o1, o2) {

    var differencex = Math.abs (o1.x - o2.x);
    var differencey = Math.abs (o1.y - o2.y);
    var hdif = Math.sqrt (differencex*differencex + differencey*differencey);
    var index = 0;
    
    if (hdif < o1.r + o2.r) {
        index = allCircles.indexOf (o2);
        allCircles.splice (index, 1);
    };
}


function collision (o1, o2) {

    if (o1 && o2) {
        var differencex = Math.abs (o1.x - o2.x);
        var differencey = Math.abs (o1.y - o2.y);
        var hdif = Math.sqrt (differencex*differencex + differencey*differencey);
    
        if (hdif < o1.r + o2.r) {

            if (differencex < differencey) {
        
                turn (o1, 360 - 2*o1.angle);
                turn (o2, 360 - 2*o2.angle);
            
            } else {
                
                turn (o1, 180 - 2*o1.angle);
                turn (o2, 180 - 2*o2.angle);
            }
            turn (o1, 180);
            turn (o2, 180);
        };
    }
}


function bounce (o) {

    if (o.x > w || o.x < 0) {
        
        turn (o, 180 - 2*o.angle);
        
    };

    if (o.y > h || o.y < 0) {
        
        turn (o, 360 - 2*o.angle);
        
    }
}



//////////////////////////////////////////////////// interection d

function click (event) {
    addObjectWithLocation (allRect, event.offsetX, event.offsetY);
}


function addObjectWithLocation (a, x, y) {
    a.push ({
        "x": x,
        "y": y,
        "w": 100,
        "h": 70,
        "d": rand(10),
        "angle": rand(360),
        "changle": 15
    });
}


function addObject (a) {
    a.push = ({
        "x": w/2,
        "y": h/2,
        "w": 100,
        "h": 70,
        "d": rand (10),
        "angle": rand (360),
        "changle": 15
    });
}




//////////////////////////////////////////////////// circles 

function createData (num) {

    for (var i=0; i < num; i++) {
        allCircles.push ({
            "x": rand (w),
            "changex": rand (10),
            "y": rand (h),
            "changey": rand (10),
            "r": 25,
            "w": 100,
            "h": 100,
            "c": rand (324),
            "a": 0.5,
            "d": 3 + rand (3),
            "size": 3,
            "angle": 0,
            "changle":15
        }) 
    }
}




//////////////////////////////////////////////////// shapes

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
    turn (o, 90);
    forward (o, o.h);
    ctx.lineTo (o.x, o.y);
    turn (o, 70);
    forward (o, o.w);
    ctx.lineTo (o.x, o.y);
    turn (o, 90);
    forward (o, o.h);
    ctx.lineTo (o.x, o.y);

    ctx.fillStyle = "#0D2156";
    ctx.fill ();

    o.x = x;
    o.y = y;
    o.angle =a;
    o.d = d;
}


function circle (o) {

    ctx.beginPath ();
    ctx.arc (o.x, o.y, o.r, 0, 2*Math.PI);
    ctx.fillStyle = "hsla("+o.c+",100%,50%,"+o.a+")";
    ctx.fill ();
}





////////////////////////////////////////////////////




function turn (o, angle) {

    if  (angle != undefined) {
        o.changle = angle;
    };
    o.angle += o.changle;
}


function forward (o, d) {

    var changeX;
    var changeY;
    var oneDgree = Math.PI/180;

    if (d != undefined) {
        o.d = d;
    };

    changeX = o.d*Math.cos (o.angle*oneDgree);
    changeY = o.d*Math.sin (o.angle*oneDgree);
    o.x += changeX;
    o.y += changeY;
}


function randn (r) {
    var result = Math.random ()*r-r/2;
    return result
}

function randi (r) {
    var result = Math.floor (Math.random ()*r);
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
    canvas.style.border= "5px solid #95ADCE"
}




console.log ("one_click and move");
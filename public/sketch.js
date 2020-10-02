//check README.md for more information

/// <reference path="TSDef/p5.global-mode.d.ts" />

//create a socket connection
var socket;
var mice = {};
var myMouse = {x:100, y:100, isClicked: false, isDead: false};
var myID = Math.floor(Math.random() * 100000);

function setup() {
    //create a canvas
    createCanvas(800, 600);
    //paint it white
    background(255, 255, 255);
    
    //I create socket but I wait to assign all the functions before opening a connection
    socket = io({
        autoConnect: false
    });

    socket.on('init', initMice);
    socket.on('message', onMessage);
    socket.on('updateMice', updateMice);

    socket.open();
}

//this function is called continuously
function draw() {
    background(0);
    for(id in mice){
        let x = mice[id].x;
        let y = mice[id].y;
        fill('red');
        if(mice[id].isClicked) fill('blue');
        ellipse(x,y,20,20);
    }
}

function mouseMoved(){
    myMouse.x = mouseX;
    myMouse.y = mouseY;
    if(socket.id){
        socket.emit('update',{id: myID, mouse: myMouse}); 
    }
    // socket.emit('clientAction', {type: 'move', x: mouseX, y: mouseY });
}

//p5 function called on mouse press - send coordinates to server
function mousePressed() {
    myMouse.isClicked = true;
    if(socket.id){
        socket.emit('update',{id: myID, mouse: myMouse}); 
    }
}

function mouseReleased(){
    myMouse.isClicked = false;
    if(socket.id){
        socket.emit('update',{id: myID, mouse: myMouse}); 
    }
}

function initMice(data){
    if (socket.id) {
        mice = data;
        mice[myID] = myMouse;
        socket.emit('update',{id: myID, mouse: myMouse});
    }
}

function updateMice(data){
    mice[data.id] = data.mouse;
    console.log(mice);
}

function onMessage(msg) {
    if (socket.id) {
        console.log("Message from server: " + msg);
    }
}
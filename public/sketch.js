//check README.md for more information

/// <reference path="TSDef/p5.global-mode.d.ts" />

//create a socket connection
var socket;
var world = new World();
var myMouse = new Mouse(100,100);
var myID = -1;

function setup() {
    //create a canvas
    createCanvas(800, 600);
    //paint it white
    background(255, 255, 255);
    
    //I create socket but I wait to assign all the functions before opening a connection
    socket = io({
        autoConnect: false
    });

    //detects a server connection 
    socket.on('connect', onConnect);
    //handles the messages from the server, the parameter is a string
    socket.on('message', onMessage);
    //handles the user action broadcast by the server, the parameter is an object
    socket.on('action', onAction);

    socket.open();

    myID = world.generateID();
}

//this function is called continuously
function draw() {
}

function mouseMoved(){
    // socket.emit('clientAction', {type: 'move', x: mouseX, y: mouseY });
}

//p5 function called on mouse press - send coordinates to server
function mousePressed() {
    //make sure the connection is established
    // if (socket.id) {
    //     // console.log("Mouse pressed at " + mouseX + " " + mouseY);
    //     //send 
    //     socket.emit('mouseClicked', {type: 'click', x: mouseX, y: mouseY });
    // }
}



//called by the server upon any user action including me
function onAction(obj) {
    //change fill color to black
    // background('black');
    // if(obj.type == 'click') fill(255, 255, 255);
    // else{
    //     console.log('moved');
    //     fill(255,0,0);
    // }
    // //draw a circle
    // ellipse(obj.x, obj.y, 40, 40);
    console.log(obj);
}

//connected to the server
function onConnect() {
    if (socket.id) {
        console.log("Connected to the server");
    }
}

//a message from the server
function onMessage(msg) {
    if (socket.id) {
        console.log("Message from server: " + msg);
    }
}
class Mouse{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    updatePos(x,y){
        this.x = x;
        this.y = y;
    }

    draw(){
        fill('red');
        ellipse(this.x,this.y,20,20);
    }
}

function generateID(mice){
    let id = 0;
    while(id in mice) id++;
    return id;
}
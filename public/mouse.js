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
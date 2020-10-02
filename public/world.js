class World{
    constructor(){
        this.objects = {};
    }

    addObject(id, object){
        this.objects[id] = object;
    }

    deleteObject(id){
        if(id in this.objects){
            delete this.objects[id];
        }
    }

    updateObject(id,object){
        this.objects[id] = object;
    }

    generateID(){
        let key = 0;
        while(key in this.objects) key++;
    }
}
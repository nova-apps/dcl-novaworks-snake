import { Snake } from "./Snake";

export class Node extends Entity{
    public id : number = 0;
    constructor(){
        super();
    }
    public dies(){}
}

export class Head extends Node{
    public speed : number = 1;
    constructor(
        public snake : Snake
    ){
        super();
        this.snake = snake
    }

    public forward(){}
    
    public turn(){}

    /* Head hits Wall or own Body */ 
    public hit(){
        //this.snake.die()
    }

    public eatsApple(){
        // this.snake.addSegment(
        //     this.snake.body[Segment.quantity], // last segment aka tail
        //     0.5 // have to be relative to Segment.quantity
        // ) 
    }
}

export class Segment extends Node{
    static quantity: number = 0
    public distance : number = 1
    public id : number = 0
    constructor(
        public prevNode: Node,
    ){
        super();
        this.id = Segment.quantity
        Segment.quantity++
    }
}

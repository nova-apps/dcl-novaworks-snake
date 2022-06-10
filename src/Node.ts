import { Snake } from "./Snake";

export class Node extends Entity{
    public id : number = 0;
    public transform = this.getComponent(Transform);
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
    public spacing: number = 0.1
    public id : number = 0
    constructor(
        public prevNode: Node,
    ){
        super();
        this.id = Segment.quantity
        Segment.quantity++
    }

    //public follow( fraction : number ){
    public follow(){
        this.transform.position = Vector3.Lerp(
           this.transform.position,
           this.prevNode.transform.position,
           this.spacing
        )
    }

    /** Imitate rotatation */
    //public rotate(fraction:number){
    public rotate(){
        let originalRot = this.transform.rotation.eulerAngles
        let targetRot = this.prevNode.transform.rotation.eulerAngles
        let slerpRot = Quaternion.Slerp(
            Quaternion.Euler(originalRot.x,originalRot.y,originalRot.z),
            Quaternion.Euler(targetRot.x,targetRot.y,targetRot.z), 
            this.spacing
        )
        this.transform.rotation = slerpRot
        //fraction += dt / 5
    }
}
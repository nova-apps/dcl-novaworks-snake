import { Snake } from "./Snake";
import * as utils from '@dcl/ecs-scene-utils'

export class Node extends Entity{
    public id : number = 0;
    public transform : Transform
    public position: Vector3 = new Vector3(1,1,1)
    constructor(){
        super();
    }

    public dies(){}

    public place(
        position: Vector3,
        size : number = 0.5
    ){
        this.position = position
        this.addComponent(new SphereShape)
        this.addComponent(
              new Transform({
                    scale: new Vector3(size,size,size),
                    position: position
              })
        )
        this.transform = this.getComponent(Transform)
        engine.addEntity(this)
      }
}

export class Head extends Node{
    public speed : number = 1
    public name? : string = 'head'
    constructor(
        public snake : Snake
    ){
        super();
        this.snake = snake
    }

    public forward(){
        let newPath = []
        newPath[0] = new Vector3(
            this.getComponent(Transform).position.x,
            this.getComponent(Transform).position.y,
            this.getComponent(Transform).position.z
        )
        newPath[1] = new Vector3(
            this.getComponent(Transform).position.x,
            this.getComponent(Transform).position.y,
            64
        )
        this.addComponent(new utils.FollowPathComponent(newPath, 4))
        this.getComponent(Transform).rotation.set(0, 0, 0, 1)
    }

    public turnRigth(){}

    /* Head hits Wall or own Body */ 
    public hit(){
        // this.snake.die()
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

    public follow(){
        let originalPos = this.getComponent(Transform).position
        let targetPos = this.prevNode.getComponent(Transform).position
        this.transform.position = Vector3.Lerp(
           originalPos,
           targetPos,
           this.spacing
        )
    }

    /** Imitate rotatation */
    public rotate(){
        let originalRot = this.getComponent(Transform).rotation.eulerAngles
        let targetRot = this.prevNode.getComponent(Transform).rotation.eulerAngles
        let slerpRot = Quaternion.Slerp(
            Quaternion.Euler(originalRot.x,originalRot.y,originalRot.z),
            Quaternion.Euler(targetRot.x,targetRot.y,targetRot.z), 
            this.spacing // revisar este 
        )
        this.transform.rotation = slerpRot
    }

}
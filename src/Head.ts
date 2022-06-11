import * as utils from '@dcl/ecs-scene-utils'
import { Node } from "./Node";
import { Snake } from "./Snake";

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
        this.removeComponent(utils.FollowPathComponent)
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
        this.getComponent(Transform).rotation.set(0, 1, 0, 1)
    }

    public turnRigth(){
        this.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(
            this.getComponent(Transform).position.x,
            this.getComponent(Transform).position.y,
            this.getComponent(Transform).position.z
        )
        newPath[1] = new Vector3(
            64,
            this.getComponent(Transform).position.y,
            this.getComponent(Transform).position.z
        )
        this.addComponent(new utils.FollowPathComponent(newPath, 4))
        this.getComponent(Transform).rotation.set(0, 1, 0, 0)
    }

    public turnLeft(){
        this.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(
            this.getComponent(Transform).position.x,
            this.getComponent(Transform).position.y,
            this.getComponent(Transform).position.z
        )
        newPath[1] = new Vector3(
            0,
            this.getComponent(Transform).position.y,
            this.getComponent(Transform).position.z
        )
        this.addComponent(new utils.FollowPathComponent(newPath, 4))
        this.getComponent(Transform).rotation.set(0, 0, 0, -1)
    }

    public backward(){
        this.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(
            this.getComponent(Transform).position.x,
            this.getComponent(Transform).position.y,
            this.getComponent(Transform).position.z
        )
        newPath[1] = new Vector3(
            this.getComponent(Transform).position.x,
            this.getComponent(Transform).position.y,
            0
        )
        this.addComponent(new utils.FollowPathComponent(newPath, 4))
        this.getComponent(Transform).rotation.set(0, -1, 0, 1)
    }

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
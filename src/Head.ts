import * as utils from '@dcl/ecs-scene-utils'
import { Node } from "./Node";
import { Snake } from "./Snake";
import { Apple } from './Apple';

export class Head extends Node{
    public direction = ''

    public speed : number = 1
    public name? : string = 'head'

    public headTrigger : Entity = new Entity()

    public shape : GLTFShape = new GLTFShape("models/HeadSnake.glb")

    constructor(
        public snake : Snake
    ){
        super();
        this.snake = snake
        this.addWallTrigger()
        this.addMouth()
    }

    public add(pos : Vector3){
        this.addComponent(this.shape)
        this.addComponent(
          new Transform({
            rotation: new Quaternion(0, 1, 0, -1),
            position: pos,
          })
        )
        engine.addEntity(this)
    }

    public addWallTrigger(){
        this.addComponent(
            new utils.TriggerComponent(
              new utils.TriggerBoxShape(),
                {
                    enableDebug :false,
                    triggeredByLayer: 1,
                    onTriggerEnter : () => {
                        this.hit()
                    }
                },
            )
        )
    }

    /* Head hits Wall or own Body */ 
    public hit(){
        //this.removeComponent(this.shape)
        this.snake.die()
    }

    public addMouth(){
        this.headTrigger.setParent(this)
        this.headTrigger.addComponent(
            new utils.TriggerComponent(
                new utils.TriggerBoxShape(),
                {
                    layer: 4,
                    triggeredByLayer: 2,
                    onTriggerEnter : () => {
                        log('eat apple')
                    }
                }
            )
        )
    }

    public getPathTime(value: number){
        let totalTimePath = 4
        let position = value
        let percent = position / 64
        let percentToComplete = 1 - percent
        let currentTimeToCompletePath = totalTimePath * percentToComplete
        log(value)
        log(currentTimeToCompletePath)
        return currentTimeToCompletePath
    }

    public forward(){
        if(this.direction != 'NORTH' && this.direction != 'SOUTH'){
            this.direction = 'NORTH'
            this.removeComponent(utils.FollowPathComponent)
            let newPath = []
            let position = this.getComponent(Transform).position
            newPath[0] = new Vector3( position.x, position.y, position.z)
            newPath[1] = new Vector3( position.x, position.y, 64)
            this.addComponent(new utils.FollowPathComponent(newPath, this.getPathTime(position.z)))
            this.getComponent(Transform).rotation.set(0, 1, 0, -1)
        }
    }

    public turnRigth(){
        if(this.direction != 'EAST' && this.direction != 'WEST'){
            this.direction = 'WEST'
            this.removeComponent(utils.FollowPathComponent)
            let newPath = []
            let position = this.getComponent(Transform).position
            newPath[0] = new Vector3( position.x, position.y, position.z)
            newPath[1] = new Vector3( 64, position.y, position.z)
            this.addComponent(new utils.FollowPathComponent(newPath, this.getPathTime(position.x)))
            this.getComponent(Transform).rotation.set(0, 0, 0, 1)
        }
    }

    public turnLeft(){
        if(this.direction != 'EAST' && this.direction != 'WEST'){
            this.direction = 'EAST'
            this.removeComponent(utils.FollowPathComponent)
            let newPath = []
            let position = this.getComponent(Transform).position
            newPath[0] = new Vector3( position.x, position.y, position.z)
            newPath[1] = new Vector3( 0, position.y, position.z)
            this.addComponent(new utils.FollowPathComponent(newPath, this.getPathTime(64 - position.x)))
            this.getComponent(Transform).rotation.set(0, 1, 0, 0)
        }
    }

    public backward(){
        if(this.direction != 'NORTH' && this.direction != 'SOUTH'){
            this.direction = 'SOUTH'
            this.removeComponent(utils.FollowPathComponent)
            let newPath = []
            let position = this.getComponent(Transform).position
            newPath[0] = new Vector3( position.x, position.y, position.z)
            newPath[1] = new Vector3( position.x, position.y, 0)
            this.addComponent(new utils.FollowPathComponent(newPath, this.getPathTime(64 - position.z)))
            this.getComponent(Transform).rotation.set(0, 1, 0, 1)
        }
    }
}
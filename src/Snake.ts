import * as utils from '@dcl/ecs-scene-utils'
import { Node} from "./Node";
import { Head } from "./Head";
import { Segment } from "./Segment";

export class Snake implements ISystem{
    group = engine.getComponentGroup(Transform)

    public head: Head  = new Head(this)// So we can access to the snake from the head
    public body: any = []

    constructor(){
        this.born()
    }

    /* Inits the snake */
    public born(
        initPos : Vector3 = new Vector3(32, 1, 16)
    ){
        this.head = new Head(this) 
        this.head.add(initPos)
        this.addNeck() // segmento 0 aka cuello
    }
    public addNeck(){
        let neck = new Segment(this.head)
        this.body.push(neck)
    }

    /* Call this metod when the head eats an apple */
    public addSegment(){
        let lastSegment = this.body[this.body.length - 1]
        let segment = new Segment(lastSegment)
        this.body.push(segment)
    }

    public die(){
        log('I die')
        // https://github.com/decentraland-scenes/lazy-loading/blob/7012e3fa6d346b11066b8925150b1cedd8a5dd08/src/subScene.ts#L35
        this.head.getComponent('engine.shape').visible = false

        //for(let s in this.body){

        for (let i = 1; i < this.body.length; i++) {
          let segment = this.body[i]
          segment.remove()
          //this.body.pop()
          //this.body.shift()
        }
        
        // this.body.splice(1, this.body.length - 1); 
        // //this.body.length = 1
        // log(this.body)
        this.respawn()
    }

    public respawn(){
      let startPos = this.head.getComponent(Transform).position 
      let endPos = new Vector3(32, 1, 16)

      //this.head.getComponent(Transform).position = endPos
      //this.head.getComponent(Transform).rotation.set(0, 1, 0, -1)

      this.head.addComponent(
        new utils.MoveTransformComponent(
          startPos,
          endPos,
          0,
          () => {
            //log('finished moving box')
            this.head.getComponent(Transform).rotation.set(0, 1, 0, -1)
            this.head.getComponent('engine.shape').visible = true
          }
        )
      )
    }

    update(dt: number) {

      // let spacing = 0.1
      // let speed = Math.floor( distance * spacing )
      //this.head.serpentine(dt)

      for (let segment of this.body) {
        segment.follow()
        //segment.isBiten()
        //segment.rotate()

      };
    }

}

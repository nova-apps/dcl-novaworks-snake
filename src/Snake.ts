import { Node} from "./Node";
import { Head } from "./Head";
import { Segment } from "./Segment";

import * as utils from '@dcl/ecs-scene-utils'

export class Snake implements ISystem{
    public head: Head = new Head(this) // So we can access to the snake from the head
    public body: any = []

    constructor(){
        this.born()
        this.addSegment(this.head) // segmento 0 aka cuello
    }

    /* Inits the snake */
    public born(
        initPos : Vector3 = new Vector3(2,1,6)
    ){
        this.head = new Head(this) // So we can access to the snake from the head
        this.head.addComponent(new GLTFShape("models/HeadSnake.glb"))
        this.head.addComponent(
          new Transform({
            rotation: new Quaternion(0, 1, 0, -1),
            position: initPos,
          })
        )
        engine.addEntity(this.head)
    }

    /* Call this metod when the head eats an apple */
    public addSegment(
      prevNode : Node
    ){
        let segment = new Segment(prevNode)
        this.body.push(segment)
    }

    public die(){
        log('I die')
        engine.removeEntity(this.head)
        for(let s in this.body){
          let segment = this.body[s]
          engine.removeEntity(segment)
        }
        this.reborn()
    }

    public reborn(){
      this.born()
      this.addSegment(this.head) // segmento 0 aka cuello
      let randomPos : Vector3 = new Vector3(2,1,6)
      this.head.addComponent(
        new Transform({
          rotation: new Quaternion(0, 1, 0, -1),
          position: randomPos,
        })
      )
    }

    update(dt: number) {

      // let spacing = 0.1
      // let distance = Math.floor( Vector3.Distance(this.path.origin, this.path.target) )
      // let speed = Math.floor( distance * spacing )

      for (let segment of this.body) {
        segment.follow()
        //segment.rotate()
      };
    }

}

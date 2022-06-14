import { Node} from "./Node";
import { Head } from "./Head";
import { Segment } from "./Segment";
import { UI } from "./UI";

import * as utils from '@dcl/ecs-scene-utils'

export class Snake implements ISystem{
    public head: Head  = new Head(this)// So we can access to the snake from the head
    public body: any = []

    public dieClip = new AudioClip("sounds/game_over.wav")
    public dieSource = new AudioSource(this.dieClip)

    constructor(){
        this.born()
        this.dieSource.volume = 1
        this.head.addComponent(this.dieSource)
    }

    /* Inits the snake */
    public born(
        initPos : Vector3 = new Vector3(16, 1, 8)
    ){
        this.head = new Head(this) 
        this.head.add(initPos)
        this.addSegment(this.head) // segmento 0 aka cuello
    }

    /* Call this metod when the head eats an apple */
    public addSegment(
      prevNode : Node
    ){
        //let segment = segmenter.spawnEntity(prevNode) // no funca por que tira void...
        let segment = new Segment(prevNode)
        this.body.push(segment)
    }


    public die(){
        //log('I die')
        this.head.direction = ''
        this.dieSource.playOnce()
        
        // https://github.com/decentraland-scenes/lazy-loading/blob/7012e3fa6d346b11066b8925150b1cedd8a5dd08/src/subScene.ts#L35
        this.head.getComponent('engine.shape').visible = false
        for(let s in this.body){
          let segment = this.body[s]
          segment.remove()
        }
        this.respawn()
    }

    public respawn(){
      let startPos = this.head.getComponent(Transform).position 
      let endPos = new Vector3(16, 1, 8)
      this.head.addComponent(
        new utils.MoveTransformComponent(
          startPos,
          endPos,
          0,
          () => {
            //log('finished moving box')
            this.head.getComponent(Transform).rotation.set(0, 1, 0, -1)
            this.head.getComponent('engine.shape').visible = true
            this.addSegment(this.head) // segmento 0 aka cuello
          }
        )
      )
    }

    update(dt: number) {

      // let spacing = 0.1
      // let distance = Math.floor( Vector3.Distance(this.path.origin, this.path.target) )
      // let speed = Math.floor( distance * spacing )

      //this.head.serpentine(dt)

      for (let segment of this.body) {
        segment.follow()
        //segment.rotate()
      };
    }

}

// https://docs.decentraland.org/development-guide/entities-components/#pooling-entities-and-components
// Define segmenter singleton object
const segmenter = {
    MAX_POOL_SIZE: 200,
    pool: [] as Segment[],
  
    spawnEntity(prevSeg: Node) {
      // Get an entity from the pool
      const seg = segmenter.getEntityFromPool(prevSeg)
  
      if (!seg) return
      seg.add()

      // Add a transform component to the entity
      //let t = ent.getComponentOrCreate(Transform)
      //t.scale.setAll(0.5)
      //t.position.set(5, 0, 5)
      ////add entity to engine
      //engine.addEntity(ent)

    },
  
    getEntityFromPool(prevSeg: Node): Segment | null {
      // Check if an existing entity can be used
      for (let i = 0; i < segmenter.pool.length; i++) {
        if (!segmenter.pool[i].alive) {
          return segmenter.pool[i]
        }
      }
      // If none of the existing are available, create a new one, unless the maximum pool size is reached
      if (segmenter.pool.length < segmenter.MAX_POOL_SIZE) {
        const instance = new Segment(prevSeg)
        segmenter.pool.push(instance)
        return instance
      }
      return null
    },
}
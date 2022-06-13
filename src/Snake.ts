import { Node} from "./Node";
import { Head } from "./Head";
import { Segment } from "./Segment";

import * as utils from '@dcl/ecs-scene-utils'

export class Snake implements ISystem{
    public head: Head = new Head(this) // So we can access to the snake from the head
    public body: any = []

    constructor(){
        this.born()
    }

    /* Inits the snake */
    public born(
        initPos : Vector3 = new Vector3(32, 1, 16)
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
        this.addSegment(this.head) // segmento 0 aka cuello
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
        Segment.quantity = 0
        this.head.direction = ''
        // https://docs.decentraland.org/development-guide/entities-components/#pooling-entities-and-components

        //engine.removeEntity(this.head)

        for(let s in this.body){
          let segment = this.body[s]
          engine.removeEntity(segment)
        }
        this.reborn()
    }

    public reborn(){

      //Define start and end positions
      let StartPos = this.head.getComponent(Transform).position 
      let EndPos = new Vector3(32, 1, 16)
      //let randomPos : Vector3 = new Vector3(2,1,6)
      
      // Move entity
      this.head.addComponent(
        new utils.MoveTransformComponent(StartPos, EndPos, 1)
      )

      this.head.getComponent(Transform).rotation.set(0, 1, 0, -1)
      // Add entity to engine
      engine.addEntity(this.head)

      // this.head.addComponent(
      //     new utils.TriggerComponent(
      //       new utils.TriggerBoxShape(),
      //         {
      //             enableDebug : true,
      //             triggeredByLayer: 1,
      //             onTriggerEnter : () => {
      //                     this.head.hit()
      //             }
      //         },
      //     )
      // )

      //this.addSegment//egment(this.head) // segmento 0 aka cuello
      //this.head.addComponent(
      //  new Transform({
      //    rotation: new Quaternion(0, 1, 0, -1),
      //    position: randomPos,
      //  })
      //)

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

// // Define spawner singleton object
// const spawner = {
//   MAX_POOL_SIZE: 3,
//   pool: [] as Head[],
// 
//   spawnEntity() {
//     // Get an entity from the pool
//     const ent = spawner.getEntityFromPool()
// 
//     if (!ent) return
// 
//     // Add a transform component to the entity
//     let t = ent.getComponentOrCreate(Transform)
//     t.scale.setAll(0.5)
//     t.position.set(5, 0, 5)
// 
//     //add entity to engine
//     engine.addEntity(ent)
//   },
// 
//   getEntityFromPool():  Head | null {
//     // Check if an existing entity can be used
//     for (let i = 0; i < spawner.pool.length; i++) {
//       if (!spawner.pool[i].alive) {
//         return spawner.pool[i]
//       }
//     }
//     // If none of the existing are available, create a new one, unless the maximum pool size is reached
//     if (spawner.pool.length < spawner.MAX_POOL_SIZE) {
//       const instance = new Head(this)
//       spawner.pool.push(instance)
//       return instance
//     }
//     return null
//   },
// }
// 
// spawner.spawnEntity()

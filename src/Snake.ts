//import { Node } from './Node'
import { Head } from './Head'
import { Segment } from './Segment'
//import { UI } from "./UI";

import * as utils from '@dcl/ecs-scene-utils'

export class Snake implements ISystem {
  public head: Head = new Head(this) // So we can access to the snake from the head
  public body: any = []

  public dieClip = new AudioClip('sounds/game_over.wav')
  public dieSource = new AudioSource(this.dieClip)

  constructor() {
    this.born()
    this.dieSource.volume = 1
    this.head.addComponent(this.dieSource)
  }

  /* Inits the snake */
  public born(initPos: Vector3 = new Vector3(16, 1, 8)) {
    this.head = new Head(this)
    this.head.add(initPos)
    this.addNeck() // segmento 0 aka cuello
  }

  public addNeck() {
    const neck = new Segment(this.head)
    this.body.push(neck)
  }

  /* Call this metod when the wolverine head eats an apple */
  public addSegment() {
    const lastSegment = this.body[this.body.length - 1]
    const segment = new Segment(lastSegment)
    this.body.push(segment)
  }

  public die() {
    //log('I die')
    this.head.direction = ''
    this.head.velocity = 3
    this.head.removeComponent(utils.FollowPathComponent)
    this.dieSource.playOnce()

    // https://github.com/decentraland-scenes/lazy-loading/blob/7012e3fa6d346b11066b8925150b1cedd8a5dd08/src/subScene.ts#L35
    this.head.getComponent('engine.shape').visible = false

    for (let i = 1; i < this.body.length; i++) {
      const segment = this.body[i]
      segment.remove()
      //this.body.pop()
      //this.body.shift()
    }

    this.body.splice(1, this.body.length - 1)
    this.respawn()
  }

  public respawn() {
    const startPos = this.head.getComponent(Transform).position
    const endPos = new Vector3(16, 1, 8)
    this.head.addComponent(
      new utils.MoveTransformComponent(startPos, endPos, 0, () => {
        //log('finished moving box')
        this.head.getComponent(Transform).rotation.set(0, 1, 0, -1)
        this.head.getComponent('engine.shape').visible = true
        //this.addSegment() // segmento 0 aka cuello
      })
    )
  }

  update() {
    //this.head.serpentine(dt)
    for (const segment of this.body) {
      segment.follow()
      if (segment.isBiten(this.head)) {
        this.die()
      }
      //segment.rotate()
    }
  }
}

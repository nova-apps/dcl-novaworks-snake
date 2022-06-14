import { Node } from './Node'
import { Head } from './Head'

export class Segment extends Node {
  static quantity: number = 0
  static record: number = 0
  static shape = new GLTFShape('models/BodySneake.glb')

  public id: number = 0
  public distance: number = 1
  public spacing: number = 0.4
  constructor(public prevNode: Node) {
    super()
    //this.id = Segment.quantity
    Segment.record = Segment.quantity
    Segment.quantity++
    this.add()
  }

  public add() {
    this.id = Segment.quantity
    this.addComponent(Segment.shape)
    const prevNodePos = this.prevNode.getComponent(Transform).position
    // TODO: Revisar esto para que empiece mas atras del anterior
    const position = new Vector3(prevNodePos.x, prevNodePos.y, prevNodePos.z - this.distance)
    this.addComponent(new Transform({ position: position }))
    this.transform = this.getComponent(Transform)
    engine.addEntity(this)
  }

  public remove() {
    engine.removeEntity(this)
    Segment.quantity = 0
  }

  public follow() {
    const originalPos = this.getComponent(Transform).position
    const targetPos = this.prevNode.getComponent(Transform).position
    this.transform.position = Vector3.Lerp(originalPos, targetPos, this.spacing)
  }

  /** Imitate rotatation */
  public rotate() {
    const originalRot = this.getComponent(Transform).rotation.eulerAngles
    const targetRot = this.prevNode.getComponent(Transform).rotation.eulerAngles
    const slerpRot = Quaternion.Slerp(
      Quaternion.Euler(originalRot.x, originalRot.y, originalRot.z),
      Quaternion.Euler(targetRot.x, targetRot.y, targetRot.z),
      this.spacing
    )
    this.transform.rotation = slerpRot
  }

  /** Checks if the treacherous head had biten us */
  public isBiten(head: Head) {
    const segmentPos = this.getComponent(Transform).position
    const headPos = head.getComponent(Transform).position
    //let distance = Math.floor( Vector3.Distance( segmentPos, headPos) )
    const distance = Vector3.Distance(segmentPos, headPos)
    const dis = distance.valueOf() * 10
    if (this.id.valueOf() > 3) {
      log('head distance:', this.id.valueOf().toString(), dis)
    }
    if (this.id.valueOf() > 5) {
      if (dis < 5) {
        log('me muerde')
        return true
      }
    }
    return false
  }
}

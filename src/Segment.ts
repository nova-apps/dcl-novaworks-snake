import { Node } from "./Node"
import { Head } from "./Head"

export class Segment extends Node{
    static quantity: number = 0
    static record: number = 0
    static shape = new GLTFShape("models/BodySneake.glb")

    public id : number = 0
    public distance : number = 1
    public spacing: number = 0.4
    constructor(
        public prevNode: Node,
    ){
        super();
        this.id = Segment.quantity
        Segment.record = Segment.quantity
        Segment.quantity++
        this.add()
    }

    public add(){
        this.addComponent(Segment.shape)
        let prevNodePos = this.prevNode.getComponent(Transform).position
        // TODO: Revisar esto para que empiece mas atras del anterior
        let position = new Vector3(
            prevNodePos.x,
            prevNodePos.y,
            prevNodePos.z - this.distance
        )
        this.addComponent( new Transform({ position: position }))
        this.transform = this.getComponent(Transform)
        engine.addEntity(this)
    }

    public remove(){
        engine.removeEntity(this)
        if(Segment.quantity < 0){
            Segment.quantity--
        }
    }

    public follow(){
        let originalPos = this.getComponent(Transform).position
        let targetPos = this.prevNode.getComponent(Transform).position
        this.transform.position = Vector3.Lerp( originalPos, targetPos, this.spacing)
    }

    /** Imitate rotatation */
    public rotate(){
        let originalRot = this.getComponent(Transform).rotation.eulerAngles
        let targetRot = this.prevNode.getComponent(Transform).rotation.eulerAngles
        let slerpRot = Quaternion.Slerp(
            Quaternion.Euler(originalRot.x,originalRot.y,originalRot.z),
            Quaternion.Euler(targetRot.x,targetRot.y,targetRot.z), 
            this.spacing
        )
        this.transform.rotation = slerpRot
    }

    /** Checks if the treacherous head had biten us */
    public isBiten(head : Head){
        let segmentPos = this.getComponent(Transform).position
        let headPos    = head.getComponent(Transform).position
        //let distance = Math.floor( Vector3.Distance( segmentPos, headPos) )
        let distance = Vector3.Distance(segmentPos, headPos) 
        let dis = distance.valueOf() * 100

        log( "DIS:", this.id.valueOf(), dis )
        if(dis < 3){
           log('muerde')
           return true
        }
        return false
    }

}

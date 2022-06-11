import { Node } from "./Node"

export class Segment extends Node{
    static quantity: number = 0
    public id : number = 0
    public distance : number = 1
    public spacing: number = 0.4
    constructor(
        public prevNode: Node,
    ){
        super();
        this.id = Segment.quantity
        Segment.quantity++
        this.add()
    }

    public add(){
        let prevNodePos = this.prevNode.getComponent(Transform).position
        let position = new Vector3(
            prevNodePos.x,
            prevNodePos.y,
            prevNodePos.z - this.distance
        )

        this.addComponent(new GLTFShape("models/BodySneake.glb"))
        // this.addComponent(new SphereShape)
        this.addComponent(
            new Transform({
                // scale: new Vector3(0.5, 0.5, 0.5),
                position: position
            })
        )
        this.transform = this.getComponent(Transform)
        engine.addEntity(this)
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
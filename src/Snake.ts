import { Node, Head, Segment} from "./Node";
import * as utils from '@dcl/ecs-scene-utils'

export class Snake implements ISystem{

    public head: Head = new Head(this) // So we can access to the snake from the head
    public body: any = []

    constructor(){
        this.born()
        this.addSegment(this.head) // segmento 0 aka cuello
        // TODO, take this out of here, its have to be trigered when the head eats an applle
        for (var i = 0; i < 2; i++) {
            this.addSegment(this.body[i]) // resto de los segmentos
        }

        const canvas = new UICanvas()
        const top = new UIImage(canvas, new Texture("images/top.png"))
        top.positionY = -250
        top.positionX = 250
        top.width = "35px"
        top.height = "35px"
        top.sourceWidth = 77
        top.sourceHeight = 77
        top.isPointerBlocker = true
        top.onClick = new OnPointerDown(() => {
          this.head.forward()
        })

        const rigth = new UIImage(canvas, new Texture("images/rigth.png"))
        rigth.positionY = -300
        rigth.positionX = 300
        rigth.width = "35px"
        rigth.height = "35px"
        rigth.sourceWidth = 77
        rigth.sourceHeight = 77
        rigth.isPointerBlocker = true
        rigth.onClick = new OnPointerDown(() => {
          this.head.turnRigth()
        })

        const bottom = new UIImage(canvas, new Texture("images/bottom.png"))
        bottom.positionY = -300
        bottom.positionX = 250
        bottom.width = "35px"
        bottom.height = "35px"
        bottom.sourceWidth = 77
        bottom.sourceHeight = 77
        bottom.isPointerBlocker = true
        bottom.onClick = new OnPointerDown(() => {
          this.head.backward()
        })

        const left = new UIImage(canvas, new Texture("images/left.png"))
        left.positionY = -300
        left.positionX = 200
        left.width = "35px"
        left.height = "35px"
        left.sourceWidth = 77
        left.sourceHeight = 77
        left.isPointerBlocker = true
        left.onClick = new OnPointerDown(() => {
          this.head.turnLeft()
        })
    }

    /* Inits the snake */
    public born(
        initPos : Vector3 = new Vector3(2,1,6)
    ){
        this.head.addComponent(new SphereShape()).withCollisions = true
        this.head.addComponent(
          new Transform({
            scale: new Vector3(1, 0.4, 0.7),
            rotation: new Quaternion(0, 1, 0, 1),
            position: initPos,
          })
        )
        this.head.addComponent(
          new utils.TriggerComponent(new utils.TriggerSphereShape())
        )
      
        let snakeMaterial = new Material()
        const snakeTexture = new Texture("images/Snake.png")
        snakeMaterial.albedoTexture = snakeTexture

        this.head.addComponent(snakeMaterial)

        engine.addEntity(this.head)
    }

    /* Call this metod when the head eats an apple */
    public addSegment(
      prevNode : Node,
    ){
        let segment = new Segment(prevNode)
        let prevNodePos = prevNode.getComponent(Transform).position
        segment.place(
            new Vector3(
                prevNodePos.x,
                prevNodePos.y,
                prevNodePos.z - segment.distance
            ),
        )
        this.body.push(segment)
    }

    public die(){
        this.reborn()
    }

    public reborn(){}

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

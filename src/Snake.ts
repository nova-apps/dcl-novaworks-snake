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

import { Node, Head, Segment} from "./Node";

export class Snake implements ISystem{

    public head: Head = new Head(this)
    public body: any = []

    constructor(){
        this.born()
        // TODO, take this out of here, its have to be trigered when the head eats an applle
        this.addSegment(this.head, 0.6) // segmento 0 aka cuello
        for (var i = 0; i < 6; i++) {
            this.addSegment(this.body[i], 0.5 - i * 0.1) // resto de los segmentos
        }
    }

    /* Inits the snake */
    public born(
        initPos : Vector3 = new Vector3(2,1,6)
    ){
        this.head.addComponent(new BoxShape())
        this.head.addComponent(
          new Transform({
            position: initPos,
          })
        )
        engine.addEntity(this.head)
    }

    /* Call this metod when the heat eats an apple */
    public addSegment(
      prevNode : Node,
      scale: number
    ){
        let segment = new Segment(prevNode)
        let prevNodePos = prevNode.getComponent(Transform).position
        segment.addComponent(new SphereShape())
        segment.addComponent(
          new Transform({
            scale: new Vector3(scale,scale,scale), // Have to be relative to thew length
            position: new Vector3(
                prevNodePos.x,
                prevNodePos.y,
                prevNodePos.z - 1
            ),
          })
        )
        this.body.push(segment)
        engine.addEntity(segment)
    }

    update(dt: number) {
      /*
      for (let entity of myGroup.entities) {
        const position = entity.getComponent(Transform).position
        //const vel = entity.getComponent(Physics).velocity
        //position.x += vel.x
        //position.y += vel.y
        //position.z += vel.z
      }
      */
    }

}

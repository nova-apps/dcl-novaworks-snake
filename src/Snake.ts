import { Node, Head, Segment} from "./Node";

export class Snake implements ISystem{

    public head: Head = new Head(this) // So we can access to the snake from the head
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
            scale: new Vector3(scale,scale,scale),
            position: new Vector3(
                prevNodePos.x,
                prevNodePos.y,
                prevNodePos.z - segment.distance
            ),
          })
        )

        this.body.push(segment)
        engine.addEntity(segment)
    }

    public die(){
        this.reborn()
    }

    public reborn(){}

    update(dt: number) {
      // let distance = Math.floor( Vector3.Distance(this.path.origin, this.path.target) )
      // let speed = Math.floor( distance * spacing )
      for (let segment of this.body) {
        segment.follow()
        segment.rotar()
      };
    }

}

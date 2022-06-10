import { Node, Head, Segment} from "./Node";

export class Snake implements ISystem{

    public head: Head = new Head(this) // So we can access to the snake from the head
    public body: any = []
    

    constructor(){
        const canvas = new UICanvas()
        this.move()
        
        this.born()
        this.addSegment(this.head, 0.5) // segmento 0 aka cuello

        // TODO, take this out of here, its have to be trigered when the head eats an applle
        for (var i = 0; i < 2; i++) {
            this.addSegment(this.body[i], 0.5 - i * 0.1) // resto de los segmentos
        }
    }

    public move(){
      let canvas = new UICanvas()
      const top = new UIImage(canvas, new Texture("images/top.png"))
      top.positionY = -250
      top.positionX = 150
      top.width = "35px"
      top.height = "35px"
      top.sourceWidth = 77
      top.sourceHeight = 77
      top.isPointerBlocker = true
      top.onClick = new OnClick(() => {
        this.head.forward()
      })
    }

    /* Inits the snake */
    public born(
        initPos : Vector3 = new Vector3(2,1,6)
    ){
        this.head.addComponent(new SphereShape())
        this.head.addComponent(
          new Transform({
            scale: new Vector3(.5,.5,.5),
            position: initPos,
          })
        )
        engine.addEntity(this.head)
    }

    /* Call this metod when the heat eats an apple */
    public addSegment(
      prevNode : Node,
      size: number
    ){
        let segment = new Segment(prevNode)
        let prevNodePos = prevNode.getComponent(Transform).position
        segment.place(
            new Vector3(
                prevNodePos.x,
                prevNodePos.y,
                prevNodePos.z - segment.distance
            ),
            //size
        )
        this.body.push(segment)
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

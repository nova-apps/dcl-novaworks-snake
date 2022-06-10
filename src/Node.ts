export class Node extends Entity{
    public id : number = 0;
    public transform = new Transform()
    public position: Vector3 = new Vector3(1,1,1)
    constructor(){
        super();
    }

    public dies(){}

    public place(
        position: Vector3,
        size : number = 0.5
    ){
        this.position = position
        this.addComponent(new SphereShape)
        this.addComponent(
              new Transform({
                    scale: new Vector3(size,size,size),
                    position: position
              })
        )
        this.transform = this.getComponent(Transform)
        engine.addEntity(this)
      }
}
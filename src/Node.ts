export class Node extends Entity{
    //public id : number = 0;
    public transform = new Transform()
    public position: Vector3 = new Vector3(1,1,1)
    constructor(){
        super();
    }
    public dies(){}
}
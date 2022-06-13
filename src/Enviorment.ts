
import * as utils from '@dcl/ecs-scene-utils'
import { Snake } from './Snake'

export class Enviorment {
    constructor(public snake: Snake){
        this.snake = snake
        this.addFloor()
        this.addRoof()
        this.AddWalls()
    }

    public addFloor(){
        const floor = new Entity()
        floor.addComponent(new PlaneShape())
        floor.addComponent(new Transform({
            position: new Vector3(32, 0, 32),
            rotation: new Quaternion(-1, -1, -1, 1),
            scale: new Vector3(64, 64, 64)
        }))
        
        let floorMaterial = new Material()
        floorMaterial.albedoColor = new Color3(0, 0, 0)
        floor.addComponent(floorMaterial)
        
        engine.addEntity(floor)
    }

    public addRoof(){
        const roof = new Entity()
        roof.addComponent(new PlaneShape())
        roof.addComponent(new Transform({
            position: new Vector3(32,7, 32),
            rotation: new Quaternion(-1, -1, -1, 1),
            scale: new Vector3(64, 64, 64)
        }))
        
        let roofMaterial = new Material()
        roofMaterial.albedoColor = new Color3(0, 0, 0)
        roof.addComponent(roofMaterial)
        
        engine.addEntity(roof)
    }

    public createWall(x: number, y: number, z: number, rotation: number){
        let wallMaterial = new Material()
        wallMaterial.albedoColor = new Color4(0, 0, 0, 0.8)

        const wall = new Entity()
        let wallShape = new PlaneShape()
        wallShape.withCollisions = false
        wall.addComponent(wallShape)
        wall.addComponent(new Transform({
            position: new Vector3(x, y, z),
            rotation: new Quaternion(0, 1, 0, rotation),
            scale: new Vector3(64, 15, 64)
        }))
        wall.addComponent(wallMaterial)
        
        let wallTrigger = new utils.TriggerBoxShape()
        
        if(rotation == 0){
            wallTrigger.size = new Vector3(64, 15, 1)
        } else {
            wallTrigger.size = new Vector3(1, 15, 64)
        }
        
        
        new utils.Delay(100, () => {
            wall.addComponent(
                new utils.TriggerComponent(
                wallTrigger,
                    {
                        onTriggerEnter : () => {
                            if(this.snake.body){
                                this.snake.die()
                            }
                        },
                        // enableDebug: true
                    }
                )
            )
        })

        engine.addEntity(wall)
    }

    public AddWalls(){
        this.createWall(32, 0, 64, 0)
        this.createWall(32, 0, 0, 0)
        this.createWall(0, 0, 32, 1)
        this.createWall(64, 0, 32, 1)
    }
}
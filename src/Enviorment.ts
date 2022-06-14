
import * as utils from '@dcl/ecs-scene-utils'
import { Snake } from './Snake'
import { UI } from './UI'

export class Enviorment {
    constructor(public snake: Snake, public ui: UI){
        this.snake = snake
        this.ui = ui
        this.AddWalls()
    }

    public createWall(x: number, y: number, z: number, rotation: number){
        let wallMaterial = new Material()
        wallMaterial.albedoColor = new Color4(0, 0, 0, 0)

        const wall = new Entity()
        let wallShape = new PlaneShape()
        wallShape.withCollisions = false
        wall.addComponent(wallShape)
        wall.addComponent(new Transform({
            position: new Vector3(x, y, z),
            rotation: new Quaternion(0, 1, 0, rotation),
            scale: new Vector3(32, 4, 32)
        }))
        wall.addComponent(wallMaterial)
        
        let wallTrigger = new utils.TriggerBoxShape()
        
        if(rotation == 0){
            wallTrigger.size = new Vector3(32, 4, 0.3)
        } else {
            wallTrigger.size = new Vector3(0.3, 4, 32)
        }
        
        wall.addComponent(
            new utils.TriggerComponent(
                wallTrigger,
                {
                    layer: 1,
                    onTriggerEnter : () => {
                        this.ui.resetScore()
                    },
                    enableDebug: false
                },
                
            )
        )

        engine.addEntity(wall)
    }

    public AddWalls(){
        this.createWall(30.5, 0, 16, 1)
        this.createWall(16, 0, 0.5, 0)
        this.createWall(1, 0, 16, 1)
        this.createWall(16, 0, 31, 0)
    }
}
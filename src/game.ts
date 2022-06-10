import * as utils from '@dcl/ecs-scene-utils'

import { Snake } from './Snake'
import { Apple } from './Apple'

let snake = new Snake()
engine.addSystem(snake)

let apple = new Apple(snake)

// Enviorment
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

let wallMaterial = new Material()
wallMaterial.albedoColor = new Color4(0, 0, 0, 0.8)

function createWall(x: number, y: number, z: number, rotation: number){
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
    wallTrigger.size = new Vector3(64, 15, 1)

    wall.addComponent(
        new utils.TriggerComponent(
        wallTrigger,
          {
              onTriggerEnter : () => {
                // log('wall')
                // endGame()
            },
            // enableDebug: true
          }
        )
    )
    engine.addEntity(wall)
}

createWall(32, 0, 64, 0)
createWall(32, 0, 0, 0)
createWall(0, 0, 32, 1)
createWall(64, 0, 32, 1)



// import { movePlayerTo } from '@decentraland/RestrictedActions'
// const start = new UIImage(canvas, new Texture("images/start.png"))
// start.positionY = -290
// start.positionX = -450
// start.width = "150px"
// start.height = "43px"
// start.sourceWidth = 300
// start.sourceHeight = 86
// start.isPointerBlocker = true
// start.onClick = new OnPointerDown(() => {
//     restartGame()
// })

// function restartGame(){
//     score = 0
//     scoreValue.value = score.toString()
//     // direction = ''
//     snake.getComponent(Transform).position.set(16, 1, 16)
//     snake.getComponent(Transform).rotation.set(0, 1, 0, 1)
//     movePlayerTo({ x: 14, y: 0, z: 12 }, { x: 16, y: 0, z: 16 })
// }

// const scoreText = new UIText(canvas)
// scoreText.fontSize = 15
// scoreText.vAlign = "bottom"
// scoreText.positionX = -260
// scoreText.value = 'Score:'

// const scoreValue = new UIText(canvas)
// scoreValue.fontSize = 15
// scoreValue.vAlign = "bottom"
// scoreValue.positionX = -200
// scoreValue.value = score.toString()

import * as utils from '@dcl/ecs-scene-utils'

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

function createWall(x: number, y: number, z: number, rotation: number){
    const wall = new Entity()
    wall.addComponent(new PlaneShape())
    wall.addComponent(new Transform({
        position: new Vector3(x, y, z),
        rotation: new Quaternion(0, 1, 0, rotation),
        scale: new Vector3(64, 15, 64)
    }))
    
    let wallMaterial = new Material()
    wallMaterial.albedoColor = new Color4(0, 0, 0, 0.8)
    wall.addComponent(wallMaterial)
    
    let wallTrigger = new utils.TriggerBoxShape()
    wallTrigger.size = new Vector3(64, 15, 1)

    wall.addComponent(
        new utils.TriggerComponent(
        wallTrigger,
          {
              onTriggerEnter : () => {
                  log('wall!')
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


// Apple
const apple = new Entity()
apple.addComponent(new SphereShape())
apple.addComponent(new Transform({
    position: new Vector3(16, 1, 30),
    scale: new Vector3(0.5, 0.5, 0.5)
}))

let appleMaterial  = new Material()
appleMaterial.albedoColor = new Color4(1, 0, 0, 1)
apple.addComponent(appleMaterial)

apple.addComponent(
  new utils.TriggerComponent(
    new utils.TriggerSphereShape(),
    {
        onTriggerEnter : () => {
            apple.getComponent(Transform).position = new Vector3(1 + Math.random() * 64, 1, 1 + Math.random() * 64)
      }
    }
  )
)

engine.addEntity(apple)

// Snake
const snake = new Entity() 
snake.addComponent(new SphereShape()).withCollisions = true
snake.addComponent(new Transform({ 
        position: new Vector3(16, 1, 16),
        scale: new Vector3(2, 0.5, 2),
        rotation: new Quaternion(0, 0, 0, 1)
}))

snake.addComponent(
    new utils.TriggerComponent(new utils.TriggerSphereShape())
)

function createRingWall(x: number, z: number, rotation: number){
    let ringSide = new Entity
    ringSide.addComponent(new PlaneShape())
    ringSide.addComponent(new Transform({ 
        position: new Vector3(x, 1, z),
        scale: new Vector3(2, 4, 1),
        rotation: new Quaternion(0, 1, 0, rotation)
    }))

    let transparentMaterial = new Material
    transparentMaterial.albedoColor = new Color4(0, 0, 0, 0)
    ringSide.addComponent(transparentMaterial)

    engine.addEntity(ringSide)
    ringSide.setParent(snake)
}

createRingWall(1, 0, 1)
createRingWall(-1, 0, 1)
createRingWall(0, 1, 0)


let snakeMaterial = new Material()
snakeMaterial.albedoColor = new Color4(0, 1, 0, 1)
snake.addComponent(snakeMaterial)
engine.addEntity(snake)

import { movePlayerTo } from '@decentraland/RestrictedActions'

const canvas = new UICanvas()
const start = new UIImage(canvas, new Texture("images/top.png"))
start.positionY = -250
start.positionX = 150
start.width = "35px"
start.height = "35px"
start.sourceWidth = 77
start.sourceHeight = 77
start.isPointerBlocker = true
start.onClick = new OnPointerDown(() => {
    snake.getComponent(Transform).position.set(16, 1, 16)
    movePlayerTo({ x: 16, y: 3, z: 16 }, { x: 0, y: 1, z: 8 })
})

const input = Input.instance
let direction = ' '

input.subscribe("BUTTON_DOWN", ActionButton.FORWARD, false, (e) => {    
    if(direction != 'TOP' && direction != 'BOTTOM'){
        direction = 'TOP'
        snake.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        newPath[1] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, 64)
        snake.addComponent(new utils.FollowPathComponent(newPath, 4))
        snake.getComponent(Transform).rotation.set(0, 0, 0, 1)
    }
})

input.subscribe("BUTTON_DOWN", ActionButton.LEFT, false, (e) => {
    if(direction != 'LEFT' && direction != 'RIGTH'){
        direction = 'LEFT'
        snake.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        newPath[1] = new Vector3(0, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        snake.addComponent(new utils.FollowPathComponent(newPath, 4))
        snake.getComponent(Transform).rotation.set(0, 1, 0, 1)
    }
})

input.subscribe("BUTTON_DOWN", ActionButton.RIGHT, false, (e) => {
    if(direction != 'LEFT' && direction != 'RIGTH'){
        direction = 'RIGTH'
        snake.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        newPath[1] = new Vector3(64, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        snake.addComponent(new utils.FollowPathComponent(newPath, 4))
        snake.getComponent(Transform).rotation.set(0, 1, 0, 1)
    }
})

input.subscribe("BUTTON_DOWN", ActionButton.BACKWARD, false, (e) => {
    if(direction != 'TOP' && direction != 'BOTTOM'){
        direction = 'BOTTOM'
        snake.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        newPath[1] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, 0)
        snake.addComponent(new utils.FollowPathComponent(newPath, 4))
        snake.getComponent(Transform).rotation.set(0, 0, 0, 1)
    }
})
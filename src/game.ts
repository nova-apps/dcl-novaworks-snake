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
    let wallShape = new PlaneShape()
    wallShape.withCollisions = true
    wall.addComponent(wallShape)
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
    // position: new Vector3(16, 1, 30),
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
        scale: new Vector3(1, 0.4, 0.7),
        rotation: new Quaternion(0, 1, 0, 1)
}))

snake.addComponent(
    new utils.TriggerComponent(new utils.TriggerSphereShape())
  )

let snakeMaterial = new Material()
// snakeMaterial.albedoColor = new Color4(0, 1, 0, 1)
const snakeTexture = new Texture("images/Snake.png")
snakeMaterial.albedoTexture = snakeTexture

snake.addComponent(snakeMaterial)
engine.addEntity(snake)



// Controls
let direction = ''

const canvas = new UICanvas()
const top = new UIImage(canvas, new Texture("images/top.png"))
top.positionY = -250
top.positionX = 250
top.width = "35px"
top.height = "35px"
top.sourceWidth = 77
top.sourceHeight = 77
top.isPointerBlocker = true
top.onClick = new OnPointerDown(() => {
    if(direction != 'TOP' && direction != 'BOTTOM'){
        direction = 'TOP'
        snake.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        newPath[1] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, 64)
        snake.addComponent(new utils.FollowPathComponent(newPath, 4))
        snake.getComponent(Transform).rotation.set(0, 1, 0, 1)
    }
})

const bottom = new UIImage(canvas, new Texture("images/bottom.png"))
bottom.positionY = -300
bottom.positionX = 250
bottom.width = "35px"
bottom.height = "35px"
bottom.sourceWidth = 77
bottom.sourceHeight = 77
bottom.isPointerBlocker = true
bottom.onClick = new OnPointerDown(() => {
    if(direction != 'TOP' && direction != 'BOTTOM'){
        direction = 'BOTTOM'
        snake.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        newPath[1] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, 0)
        snake.addComponent(new utils.FollowPathComponent(newPath, 4))
        snake.getComponent(Transform).rotation.set(0, 1, 0, -1)
    }
})

const left = new UIImage(canvas, new Texture("images/left.png"))
left.positionY = -300
left.positionX = 200
left.width = "35px"
left.height = "35px"
left.sourceWidth = 77
left.sourceHeight = 77
left.isPointerBlocker = true
left.onClick = new OnPointerDown(() => {
    if(direction != 'LEFT' && direction != 'RIGTH'){
        direction = 'LEFT'
        snake.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        newPath[1] = new Vector3(0, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        snake.addComponent(new utils.FollowPathComponent(newPath, 4))
        snake.getComponent(Transform).rotation.set(0, 0, 0, 1)
    }
    
})

const rigth = new UIImage(canvas, new Texture("images/rigth.png"))
rigth.positionY = -300
rigth.positionX = 300
rigth.width = "35px"
rigth.height = "35px"
rigth.sourceWidth = 77
rigth.sourceHeight = 77
rigth.isPointerBlocker = true
rigth.onClick = new OnPointerDown(() => {
    if(direction != 'LEFT' && direction != 'RIGTH'){
        direction = 'RIGTH'
        snake.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(snake.getComponent(Transform).position.x, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        newPath[1] = new Vector3(64, snake.getComponent(Transform).position.y, snake.getComponent(Transform).position.z)
        snake.addComponent(new utils.FollowPathComponent(newPath, 4))
        snake.getComponent(Transform).rotation.set(0, 1, 0, 0)
    }
})
import { movePlayerTo } from '@decentraland/RestrictedActions'
const start = new UIImage(canvas, new Texture("images/start.png"))
start.positionY = -290
start.positionX = -450
start.width = "150px"
start.height = "43px"
start.sourceWidth = 300
start.sourceHeight = 86
start.isPointerBlocker = true
start.onClick = new OnPointerDown(() => {
        snake.getComponent(Transform).position.set(16, 1, 16)
        movePlayerTo({ x: 14, y: 0, z: 12 }, { x: 16, y: 0, z: 16 })
})


// const message = new UIText(canvas)
// message.value = snake.getComponent(Transform).position.x.toString()
// message.fontSize = 15
// message.vAlign = "bottom"
// message.positionX = 0

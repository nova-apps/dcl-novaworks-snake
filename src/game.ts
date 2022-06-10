import * as utils from '@dcl/ecs-scene-utils'

const floor = new Entity()
floor.addComponent(new PlaneShape())

import { Snake } from './Snake'
engine.addSystem(new Snake())

const cube = new Entity() 
cube.addComponent(new SphereShape())
cube.addComponent(new Transform({ 
        position: new Vector3(1, 1, 1),
        scale: new Vector3(0.5, 0.5, 2),
        rotation: new Quaternion(0, 0, 0, 1)
}))

let material = new Material()
material.albedoColor = new Color4(0, 1, 0, 1)

cube.addComponent(material)
engine.addEntity(cube)

let direction = ''
const canvas = new UICanvas()



const bottom = new UIImage(canvas, new Texture("images/bottom.png"))
bottom.positionY = -300
bottom.positionX = 150
bottom.width = "35px"
bottom.height = "35px"
bottom.sourceWidth = 77
bottom.sourceHeight = 77
bottom.isPointerBlocker = true
bottom.onClick = new OnClick(() => {
    if(direction != 'TOP' && direction != 'BOTTOM'){
        direction = 'BOTTOM'
        cube.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(cube.getComponent(Transform).position.x, cube.getComponent(Transform).position.y, cube.getComponent(Transform).position.z)
        newPath[1] = new Vector3(cube.getComponent(Transform).position.x, cube.getComponent(Transform).position.y, 0)
        cube.addComponent(new utils.FollowPathComponent(newPath, 4))
        cube.getComponent(Transform).rotation.set(0, 0, 0, 1)
    }
})

const left = new UIImage(canvas, new Texture("images/left.png"))
left.positionY = -300
left.positionX = 100
left.width = "35px"
left.height = "35px"
left.sourceWidth = 77
left.sourceHeight = 77
left.isPointerBlocker = true
left.onClick = new OnClick(() => {
    if(direction != 'LEFT' && direction != 'RIGTH'){
        direction = 'LEFT'
        cube.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(cube.getComponent(Transform).position.x, cube.getComponent(Transform).position.y, cube.getComponent(Transform).position.z)
        newPath[1] = new Vector3(0, cube.getComponent(Transform).position.y, cube.getComponent(Transform).position.z)
        cube.addComponent(new utils.FollowPathComponent(newPath, 4))
        cube.getComponent(Transform).rotation.set(0, 1, 0, 1)
    }
    
})

const rigth = new UIImage(canvas, new Texture("images/rigth.png"))
rigth.positionY = -300
rigth.positionX = 200
rigth.width = "35px"
rigth.height = "35px"
rigth.sourceWidth = 77
rigth.sourceHeight = 77
rigth.isPointerBlocker = true
rigth.onClick = new OnClick(() => {
    if(direction != 'LEFT' && direction != 'RIGTH'){
        direction = 'RIGTH'
        cube.removeComponent(utils.FollowPathComponent)
        let newPath = []
        newPath[0] = new Vector3(cube.getComponent(Transform).position.x, cube.getComponent(Transform).position.y, cube.getComponent(Transform).position.z)
        newPath[1] = new Vector3(64, cube.getComponent(Transform).position.y, cube.getComponent(Transform).position.z)
        cube.addComponent(new utils.FollowPathComponent(newPath, 4))
        cube.getComponent(Transform).rotation.set(0, 1, 0, 1)
    }
})


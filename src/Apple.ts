import * as utils from '@dcl/ecs-scene-utils'
import { Segment } from './Segment';
import { Snake } from './Snake';
import { UI } from './UI';

export class Apple extends Entity {
    public score = 0

    constructor(public snake: Snake, public ui: UI){
        super()
        this.snake = snake
        this.ui = ui
        
        this.addComponent(new GLTFShape("models/Apple.glb"))
        // this.addComponent(new SphereShape())
        this.addComponent(new Transform({
            scale: new Vector3(1.5, 1.5, 1.5)
        }))

        // let appleMaterial  = new Material()
        // appleMaterial.albedoColor = new Color4(1, 0, 0, 0)
        // this.addComponent(appleMaterial)

        this.addComponent(
        new utils.TriggerComponent(
                new utils.TriggerSphereShape(),
                {
                    onTriggerEnter : () => {
                        this.getComponent(Transform).position = new Vector3(1 + Math.random() * 64, 1, 1 + Math.random() * 64)
                        this.snake.addSegment(this.snake.body[Segment.quantity - 1 ])
                        this.ui.scoreValue.value = Segment.quantity.toString()
                    }
                }
            )
        )
        engine.addEntity(this)
    }
}
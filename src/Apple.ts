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
        
        this.addComponent(new SphereShape())
        this.addComponent(new Transform({
            scale: new Vector3(0.5, 0.5, 0.5)
        }))

        let appleMaterial  = new Material()
        appleMaterial.albedoColor = new Color4(1, 0, 0, 1)
        this.addComponent(appleMaterial)

        this.addComponent(
        new utils.TriggerComponent(
                new utils.TriggerSphereShape(),
                {
                    onTriggerEnter : () => {
                        this.getComponent(Transform).position = new Vector3(1 + Math.random() * 64, 1, 1 + Math.random() * 64)
                        this.snake.addSegment(this.snake.body[Segment.quantity])
                        this.score = parseInt(ui.scoreValue.value)
                        this.score++
                        this.ui.scoreValue.value = 'this.score.toString()'
                    }
                }
            )
        )
        engine.addEntity(this)
    }
}
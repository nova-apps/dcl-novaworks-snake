import * as utils from '@dcl/ecs-scene-utils'
import { Segment } from './Node';
import { Snake } from './Snake';

export class Apple extends Entity {
    constructor(public snake: Snake){
        super()

        this.snake = snake
        let score = 0
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
                    score++
                    // scoreValue.value = score.toString()
                }
            }
            )
        )
        engine.addEntity(this)
    }
}
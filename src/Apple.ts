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
            scale: new Vector3(2, 2, 2),
            position: new Vector3(1 + Math.random() * 64, 1, 1 + Math.random() * 64)
        }))

        this.addComponent(
            new utils.TriggerComponent(
                new utils.TriggerSphereShape(),
                {
                    layer: 2,
                }
            )
        )

        this.addPeel()
        engine.addEntity(this)
    }
    
    public eat(){
        this.getComponent(Transform).position = new Vector3(1 + Math.random() * 64, 1, 1 + Math.random() * 64)
        this.snake.addSegment(this.snake.body[Segment.quantity - 1 ])
        this.ui.scoreValue.value = Segment.quantity.toString()
    }

    public addPeel(){
        let appleTiggerEntity = new Entity()
        appleTiggerEntity.setParent(this)

        appleTiggerEntity.addComponent(
            new utils.TriggerComponent(
                new utils.TriggerBoxShape(),
                {
                    triggeredByLayer: 4,
                    onTriggerEnter : () => {
                        this.eat()
                    }
                }
            )
        )
    }
}
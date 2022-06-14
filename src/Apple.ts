import * as utils from '@dcl/ecs-scene-utils'
import { Segment } from './Segment';
import { Snake } from './Snake';
import { UI } from './UI';

export class Apple extends Entity {
    public score = 0

    constructor(
          public snake: Snake,
          public ui: UI
        ){
        super()
        this.snake = snake
        this.ui = ui
        
        this.addComponent(new GLTFShape("models/Apple_Animated.glb"))
        this.addComponent(new Transform({
            scale: new Vector3(3, 3, 3),
            rotation: new Quaternion(0, 1, 0, 1),
            position: new Vector3(1 + (Math.random() * 10), 1, 1 + (Math.random() * 10))
        }))

        let appleTriggerShape = new utils.TriggerBoxShape()
        appleTriggerShape.size = new Vector3(1.5, 1.5, 1.5)
        
        this.addComponent(
            new utils.TriggerComponent(
                appleTriggerShape,
                {
                    layer: 2,
                    enableDebug: false
                }
            )
        )
        this.addPeel()
        engine.addEntity(this)
    }
    
    public eaten(){
        this.getComponent(Transform).position = new Vector3(2 + (Math.random() * 16), 1, 2 + (Math.random() * 16))
        this.snake.addSegment(this.snake.body[Segment.quantity - 1])

        // TODO: esto tiene que ser un metodo de ui que se actualice aca y cuando muere
        // no hace falta que ui este "adentro" de apple, mas bien puede ser una variable y que se pueda leer/actualizar de cualquier lado
        // let score = (Segment.quantity - 1) * 100
        // let record = (Segment.record) * 100
        // this.ui.scoreValue.value =  score.toString()
        // this.ui.bestValue.value = record.toString()
        this.ui.increaseScore()
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
                        this.eaten()
                    }
                }
            )
        )
    }
}
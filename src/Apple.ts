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
        
        this.addComponent(new GLTFShape("models/Apple.glb"))
        this.addComponent(new Transform({
            scale: new Vector3(3, 3, 3),
            position: new Vector3( 5 + Math.random() * 55, 1, 1 + Math.random() * 55)
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
    
    public eaten(){
        // TODO: ruido de mordida
        this.getComponent(Transform).position = new Vector3(5 + Math.random() * 55, 1, 5 + Math.random() * 55)
        //this.snake.addSegment(this.snake.body[Segment.quantity - 1])
        //this.snake.addSegment(this.snake.body[this.snake.body.length - 1])
        this.snake.addSegment()


        // TODO: esto tiene que ser un metodo de ui que se actualice aca y cuando muere
        // no hace falta que ui este "adentro" de apple, mas bien puede ser una variable y que se pueda leer/actualizar de cualquier lado
        let score = (Segment.quantity - 1) * 100
        let record = (Segment.record) * 100
        this.ui.scoreValue.value =  score.toString() + " / " + record.toString()
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
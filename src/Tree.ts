import * as utils from '@dcl/ecs-scene-utils'
import { UI } from './UI'

export class Tree{
    public tree = new Entity()
    public treeTrigger = new utils.TriggerBoxShape

    constructor(){
        this.tree.addComponent(new Transform({
            position: new Vector3(3, 1, 3),
            scale: new Vector3(1, 1, 1)
        
        }))

        this.tree.addComponent(
            new utils.TriggerComponent(
                this.treeTrigger,
                {
                    layer: 1,
                    onTriggerEnter : () => {
                        log('TREE!')
                        // this.ui.resetScore()
                    }
                }
            )
        )
    }
}
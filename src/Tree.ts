import * as utils from '@dcl/ecs-scene-utils'
import { UI } from './UI'

export class Tree{
    public tree = new Entity()
    public treeTrigger = new utils.TriggerBoxShape

    constructor(public ui: UI, public xPosition: number, public zPosition: number){
        this.ui = ui
        this.tree.addComponent(new Transform({
            position: new Vector3(xPosition, 1, zPosition),
        }))

        this.treeTrigger.size = new Vector3(0.7, 1, 0.7)

        this.tree.addComponent(
            new utils.TriggerComponent(
                this.treeTrigger,
                {
                    layer: 1,
                    onTriggerEnter : () => {
                        log('TREE!')
                        this.ui.resetScore()
                    },
                    enableDebug: true
                }
            )
        )

        engine.addEntity(this.tree)
    }
}
import { movePlayerTo } from '@decentraland/RestrictedActions'

export class UI {
    constructor(){
        const canvas = new UICanvas()
        const start = new UIImage(canvas, new Texture("images/start.png"))
        start.positionY = -290
        start.positionX = -450
        start.width = "150px"
        start.height = "43px"
        start.sourceWidth = 300
        start.sourceHeight = 86
        start.isPointerBlocker = true
        start.onClick = new OnPointerDown(() => {
            // restartGame()
        })

        // function restartGame(){
        //     score = 0
        //     scoreValue.value = score.toString()
        //     // direction = ''
        //     snake.getComponent(Transform).position.set(16, 1, 16)
        //     snake.getComponent(Transform).rotation.set(0, 1, 0, 1)
        //     movePlayerTo({ x: 14, y: 0, z: 12 }, { x: 16, y: 0, z: 16 })
        // }

        const scoreText = new UIText(canvas)
        scoreText.fontSize = 15
        scoreText.vAlign = "bottom"
        scoreText.positionX = -260
        scoreText.value = 'Score:'

        const scoreValue = new UIText(canvas)
        scoreValue.fontSize = 15
        scoreValue.vAlign = "bottom"
        scoreValue.positionX = -200
        // scoreValue.value = score.toString()
    }
}
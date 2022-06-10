import { movePlayerTo } from '@decentraland/RestrictedActions'
const input = Input.instance

import { Snake } from './Snake'

export class UI {
    public canvas = new UICanvas()
    public scoreValue = new UIText(this.canvas)

    constructor(public snake: Snake){
        this.snake = snake
        this.addControls()
        this.shiftControls()

        // const start = new UIImage(this.canvas, new Texture("images/start.png"))
        // start.positionY = -290
        // start.positionX = -450
        // start.width = "150px"
        // start.height = "43px"
        // start.sourceWidth = 300
        // start.sourceHeight = 86
        // start.isPointerBlocker = true
        // start.onClick = new OnPointerDown(() => {
        //     // restartGame()
        // })

        // function restartGame(){
        //     // score = 0
        //     // scoreValue.value = score.toString()
        //     // // direction = ''
        //     // snake.getComponent(Transform).position.set(16, 1, 16)
        //     // snake.getComponent(Transform).rotation.set(0, 1, 0, 1)
        //     // movePlayerTo({ x: 14, y: 0, z: 12 }, { x: 16, y: 0, z: 16 })
        // }

        const scoreText = new UIText(this.canvas)
        scoreText.fontSize = 15
        scoreText.vAlign = "bottom"
        scoreText.positionX = -260
        scoreText.value = 'Score:'

        this.scoreValue.fontSize = 15
        this.scoreValue.vAlign = "bottom"
        this.scoreValue.positionX = -200
    }

    public shiftControls(){
        let toggle = false

        input.subscribe("BUTTON_DOWN", ActionButton.WALK, false, (e) => {
            toggle = true
        })

        input.subscribe("BUTTON_UP", ActionButton.WALK, false, (e) => {
            toggle = false
        })

        input.subscribe("BUTTON_DOWN", ActionButton.FORWARD, false, (e) => {
            if(toggle){
                this.snake.head.forward()
            }
        })

        input.subscribe("BUTTON_DOWN", ActionButton.BACKWARD, false, (e) => {
            if(toggle){
                this.snake.head.backward()
            }
        })

        input.subscribe("BUTTON_DOWN", ActionButton.LEFT, false, (e) => {
            if(toggle){
                this.snake.head.turnLeft()
            }
        })

        input.subscribe("BUTTON_DOWN", ActionButton.RIGHT, false, (e) => {
            if(toggle){
                this.snake.head.turnRigth()
            }
        })
    }

    public addControls(){
        const top = new UIImage(this.canvas, new Texture("images/top.png"))
        top.positionY = -250
        top.positionX = 250
        top.width = "35px"
        top.height = "35px"
        top.sourceWidth = 77
        top.sourceHeight = 77
        top.isPointerBlocker = true
        top.onClick = new OnPointerDown(() => {
          this.snake.head.forward()
        })

        const rigth = new UIImage(this.canvas, new Texture("images/rigth.png"))
        rigth.positionY = -300
        rigth.positionX = 300
        rigth.width = "35px"
        rigth.height = "35px"
        rigth.sourceWidth = 77
        rigth.sourceHeight = 77
        rigth.isPointerBlocker = true
        rigth.onClick = new OnPointerDown(() => {
            this.snake.head.turnRigth()  
        })

        const bottom = new UIImage(this.canvas, new Texture("images/bottom.png"))
        bottom.positionY = -300
        bottom.positionX = 250
        bottom.width = "35px"
        bottom.height = "35px"
        bottom.sourceWidth = 77
        bottom.sourceHeight = 77
        bottom.isPointerBlocker = true
        bottom.onClick = new OnPointerDown(() => {
            this.snake.head.backward()
        })

        const left = new UIImage(this.canvas, new Texture("images/left.png"))
        left.positionY = -300
        left.positionX = 200
        left.width = "35px"
        left.height = "35px"
        left.sourceWidth = 77
        left.sourceHeight = 77
        left.isPointerBlocker = true
        left.onClick = new OnPointerDown(() => {
            this.snake.head.turnLeft()
        })
    }
}
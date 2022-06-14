import { movePlayerTo } from '@decentraland/RestrictedActions'
const input = Input.instance

import { Snake } from './Snake'

export class UI {
    public score = 0
    public best = 0

    public canvas = new UICanvas()
    public scoreValue = new UIText(this.canvas)
    public bestValue = new UIText(this.canvas)

    constructor(public snake: Snake){
        this.snake = snake
        this.addControls()
        this.shiftControls()

        const scoreText = new UIText(this.canvas)
        scoreText.fontSize = 15
        scoreText.vAlign = "bottom"
        scoreText.positionX = -260
        scoreText.value = 'Score:'

        this.scoreValue.fontSize = 15
        this.scoreValue.vAlign = "bottom"
        this.scoreValue.positionX = -200
        this.scoreValue.value = '0'


        const bestText = new UIText(this.canvas)
        bestText.fontSize = 15
        bestText.vAlign = "bottom"
        bestText.positionX = -460
        bestText.value = 'Best:'

        this.bestValue.fontSize = 15
        this.bestValue.vAlign = "bottom"
        this.bestValue.positionX = -410
        this.bestValue.value = '0'
    }

    public increaseScore(){
        this.score = this.score + 100
        this.scoreValue.value = this.score.toString()

        if(this.score >= this.best){
            this.best = this.score
            this.bestValue.value = this.best.toString()
        }
    }

    public resetScore(){
        this.score = 0
        this.scoreValue.value = this.score.toString()
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
        const instructions = new UIText(this.canvas)
        instructions.fontSize = 10
        instructions.positionY = -290
        instructions.positionX = 400
        instructions.value = 'Use the arrows or hold shift and use WASD to move the snake'

        const data = new UIText(this.canvas)
        data.fontSize = 10
        data.positionY = -305
        data.positionX = 400
        data.value = 'Increase the draw distance to improve the game experience'

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
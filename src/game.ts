import { Snake } from './Snake'
import { Apple } from './Apple'
import { Wall } from './Wall'
import { UI } from './UI'
import { Tree } from './Tree'

const snake = new Snake()
const ui = new UI(snake)
new Apple(snake, ui)
new Wall(snake, ui)
new Tree(ui, 5.7, 22)
new Tree(ui, 24, 9)

engine.addSystem(snake)

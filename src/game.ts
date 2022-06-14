import { Snake } from './Snake'
import { Apple } from './Apple'
import { Wall } from './Wall'
import { UI } from './UI' 
import { Tree } from './Tree' 

let snake = new Snake()
let ui = new UI(snake)
let apple = new Apple(snake, ui)
let walls = new Wall(snake, ui)
let tree_1 = new Tree(ui, 5.7, 22)
let tree_2 = new Tree(ui, 24, 9)

engine.addSystem(snake)
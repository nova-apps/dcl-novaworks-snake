import { Snake } from './Snake'
import { Apple } from './Apple'
import { Enviorment } from './Enviorment'
import { UI } from './UI' 

let snake = new Snake()
engine.addSystem(snake)
let ui = new UI(snake)
new Apple(snake, ui)
new Enviorment(snake)


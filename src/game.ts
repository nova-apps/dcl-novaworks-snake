import { Snake } from './Snake'
import { Apple } from './Apple'
import { Enviorment } from './Enviorment'
import { UI } from './UI' 

let snake = new Snake()
let ui = new UI(snake)
new Apple(snake, ui)
new Enviorment()


engine.addSystem(snake)
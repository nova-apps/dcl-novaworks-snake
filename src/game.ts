import { Snake } from './Snake'
import { Apple } from './Apple'
import { Enviorment } from './Enviorment'
import { UI } from './UI' 

let snake = new Snake()
new Apple(snake)
new Enviorment()
new UI(snake)

engine.addSystem(snake)
// node event loop

// -> timers -> pending callbacks -> idle, prepare -> pool -> check -> close callback ->

// timers - setTimeout, setInterval
// pending callbacks
// idle, prepare - system
// pool - incoming: connections, data, etc
// check - setImmediate
// close callback

// const EventEmitter = require('events')
// class WithLog extends EventEmitter {
//  execute(taskFunc) {
//  console.log('Before executing')  //1
//  this.emit('begin')
//  taskFunc()
//  this.emit('end')
//  console.log('After executing') //5
//  }
// }
// const withLog = new WithLog()
// withLog.on('begin', () => console.log('About to execute')) //2
// withLog.on('end', () => console.log('Done with execute')) // 4
// withLog.execute(() => console.log('*** Executing task ***')) //3

// console.log('script start')  //1
// setTimeout(function () {
//  console.log('setTimeout') //5
// }, 0)
// Promise.resolve()
//  .then(function () {
//  console.log('promise1') //3
//  })
//  .then(function () {
//  console.log('promise2') //4
//  })
// console.log('script end') //2

// setTimeout(() => {
//     console.log('timeout')
// }, 0)
// setImmediate(() => {
//     console.log('immediate')
// })
// // заранее неизвестно, на какой именно мы стадии, поэтому может выводится в разном порядке

// const fs = require('fs')
// fs.readFile(__filename, () => {
//  setTimeout(() => { console.log('timeout') }, 0)
//  setImmediate(() => { console.log('immediate') })
// })
// // так как известно, что начинаем мы со стадии pool (на этой стадии происходит чтение файла),
// // то значит всегда будет выводиться сначала setImmediate (стадия check)6, а потом setTimeout

const fs = require('fs')
setTimeout(() => console.log('timeout out')) //2
setImmediate(() => console.log('immediate out')) //5
fs.readFile('./events.js', (err, data) => {
 console.log('fs') //3
 process.nextTick(() => console.log('next in')) //4
 setTimeout(() => console.log('timeout in'))  //7
 setImmediate(() => console.log('immediate in')) //6
})
const next = () => {
 console.log('next') //1
//  process.nextTick(next) //из-за это строчки зациклится
}
process.nextTick(next)
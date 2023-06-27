// https://habr.com/ru/articles/354046/
// https://ru.education-wiki.com/9383971-abstraction-vs-encapsulation
// https://habr.com/ru/companies/ruvds/articles/665290/
// https://habr.com/ru/articles/87205/
// https://habr.com/ru/articles/680846/
// https://habr.com/ru/articles/461401/
// на UlbiTV крутой видос по event loop
// https://learn.javascript.ru/generator

class A {
  calc() { }
}

class B extends A {
  constructor() {
    super()
  }
}

const b = new B()

b.calc()

// 1. Реализовать функцию create - polyfill для Object.create

function createOne(proto) {
  const newObj = {};
  Object.setPrototypeOf(newObj, proto);
  return newObj;
}
const createTwo = (proto) => ({ __proto__: { ...proto } })

const obj = createTwo({ a: 1 });
console.log(obj.a);
delete obj.a;
console.log('delete')
console.log(obj.a);




// 2. Question
// let url =
//   'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js';

// function loadScript(src, callback) {
//   let script = document.createElement('script');
//   script.src = src;
//   console.log('loading...')

//   script.onload = () => {
//     console.log('on load');
//     callback(script);
//   };
//   script.onerror = () => {
//     console.log('on error');
//     callback(new Error(`Error: ${src}`));
//   };

//   document.head.append(script);
// }

// console.log('load script');
// loadScript(url, function (script) {
//   console.log('script loaded ' + script.src);
// });

// try

// let url = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js';

// function loadScript(src) {
//     let script = document.createElement('script');
//     script.src = src;
//     console.log('loading...')

//     return new Promise((res, rej) => {
//         script.onload = () => res();
//         script.onerror = rej(new Error(`Error: ${src}`));
//     }).then (() => {
//       console.log('script loaded ' + script.src);
//       document.head.append(script);
//  }).catch((error) => {
//      console.log('script loading error ' + error);
//  });  
// }
// console.log('load script');
// loadScript(url)



let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

console.log([...range]); // 1,2,3,4,5
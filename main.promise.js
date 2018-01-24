let MyPromise = require('./promise');

new MyPromise(resolve=>resolve(8))
  .then((value)=> {
    return new MyPromise((res,rej) => {
        setTimeout(() => {
            res(value * 10);
        }, 1000);
    })
  })
  .then((value) => {
    console.log(value)
  })
function MyPromise(executor) {
    var self = this
    self.status = 'pending' // Promise当前的状态
    self.data = undefined  // Promise的值
    self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    self.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved'
            self.data = value
            for (var i = 0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value)
            }
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected'
            self.data = reason
            for (var i = 0; i < self.onRejectedCallback.length; i++) {
                self.onRejectedCallback[i](reason)
            }
        }
    }

    try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
        executor(resolve, reject) // 执行executor
    } catch (e) {
        reject(e)
    }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
    var self = this
    var promise2
  
    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? 
        onResolved : function(v) {return v;}
    onRejected = typeof onRejected === 'function' ? 
        onRejected : function(r) {throw r;}
  
    if (self.status === 'resolved') {
        // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
        // 因为考虑到有可能throw，所以我们将其包在try/catch块里
        return promise2 = new MyPromise(function(resolve, reject) {
            try {
                var x = onResolved(self.data)
                if (x instanceof MyPromise) { 
                    // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
                    x.then(resolve, reject)
                }
                else
                    resolve(x) // 否则，以它的返回值做为promise2的结果
            }
            catch (e) {
                reject(e) // 如果出错，以捕获到的错误做为promise2的结果
            }
        })
    }
  
    if (self.status === 'rejected') {
        return promise2 = new MyPromise(function(resolve, reject) {
            try {
              var x = onRejected(self.data)
              if (x instanceof MyPromise) {
                x.then(resolve, reject)
              }
            }
            catch (e) {
              reject(e)
            }
          })
    }
  
    if (self.status === 'pending') {
        // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
        // 只能等到Promise的状态确定后，才能确实如何处理。
        // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
        // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
        return promise2 = new MyPromise(function(resolve, reject) {
            self.onResolvedCallback.push(function(value) {
                try {
                    var x = onResolved(self.data)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                    }
                    else
                        resolve(x);
                }
                catch (e) {
                    reject(e)
                }
            })
    
            self.onRejectedCallback.push(function(reason) {
                try {
                    var x = onRejected(self.data)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                    }
                }
                catch (e) {
                    reject(e)
                }
            })
        })
        }
  }

  MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
  }

module.exports  = MyPromise;
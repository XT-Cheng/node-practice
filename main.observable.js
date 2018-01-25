let MyObservable = require('./observable');

let o = new MyObservable((observer) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
    });

o.subscribe({
    next: (value) => console.log(value)
});
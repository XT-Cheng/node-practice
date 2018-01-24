let Observable = require('./observable');

let o = new Observable((observer) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
    });

o.subscribe({
    next: (value) => console.log(value)
});
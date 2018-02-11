let Rx = require('rxjs');

Rx.Observable.from([0,1,2,3,4,5])
    .switchMap(value => {

        // This is the disposable stream!
        // Errors can safely occur in here without killing the original stream

        return Rx.Observable.of(value)
            .map(value => {
                if (value === 3) {
                    throw new Error('Value cannot be 3');
                }
                return value;
            })
            .catch(error => {
                // You can do some fancy stuff here with errors if you like
                // Below we are just returning the error object to the outer stream
                return Rx.Observable.of(error);
            });

    })
    .map(value => {
        if (value instanceof Error) {
            // Maybe do some error handling here
            return `Error: ${value.message}`;
        }
        return value;
    })
    .subscribe(
      (x => console.log('Success', x)),
      (x => console.log('Error', x)),
      (() => console.log('Complete'))
    );

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// let o = Rx.Observable.create(function subscriber(subscriber) {
//     subscriber.next(1);
//     subscriber.next(2);
// })

// o.switchMap((value) => {
//     console.log(`first ${value}`);
//     return Rx.Observable.of(...arr)
//     .map((value) => {
//         //console.log(value);
//         if (value == 5)
//             throw Error('error');
//         else
//             return value * 2
//     })
//     .catch(err => {
//        return Rx.Observable.of(err);
//     })})
//     .subscribe((value) => {
//         console.log(value);
//     },
//         (err) => {
//             console.log(err)
//         }
//     );
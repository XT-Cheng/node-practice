let Rx = require('rxjs');

function observer(name) {
    return {
        next: (value) => console.log(`observer ${name}: ${value}`),
        complete: () => console.log(`observer ${name}: complete`)
    };
}

const source = Rx.Observable.interval(2000).startWith(-1).do((v)=>console.log(`emmitted ${v}`));

const p = source.multicast(new Rx.BehaviorSubject()).refCount();

p.subscribe(observer("a"));
p.subscribe(observer("b"));
setTimeout(() => {
    p.subscribe(observer("c"));
}, 10);
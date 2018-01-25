function MyObservable(subscriber) {
    this.subscriber = subscriber;
}

MyObservable.prototype.subscribe = function(observer) {
    this.subscriber(observer);
}

module.exports = MyObservable;
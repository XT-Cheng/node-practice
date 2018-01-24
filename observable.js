function Observable(subscriber) {
    this.subscriber = subscriber;
}

Observable.prototype.subscribe = function(observer) {
    this.subscriber(observer);
    //observer(this.observer.next())
}

module.exports = Observable;
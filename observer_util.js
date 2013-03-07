// STEP 11:  Refactor method names (apparently they are too verbose for the author)
//  just search and replace addObserver -> observe, notifyObservers -> notify

var observable = {};

var observe = function(observer) {
  if (typeof observer != "function") {
    throw new TypeError("TypeError");
  }
  if (!this.observers) {
    this.observers = [];
  }
  this.observers.push(observer);
};
observable.observe = observe;

var hasObserver = function(observer) {
  var i, l;
  if (!this.observers) {
    return false;
  }
  for (i=0,l=this.observers.length; i<l; i++) {
    if (this.observers[i] == observer) {
      return true;
    }
  }
  return false;
};
observable.hasObserver = hasObserver;

var notify = function() {
  var i,l;
  if (!this.observers) {
    return;
  }
  for (i=0,l=this.observers.length; i<l; i++) {
    try {
      this.observers[i].apply(this, arguments);
    } catch (e) {}
  }
};
observable.notify = notify;

exports.observable = observable;

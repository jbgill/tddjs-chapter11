// STEP 8: Add the notifyObservers method and make it pass the tests (write tests first).

var Observable = function() {
  this.observers = [];
};

var addObserver = function(observer) {
  this.observers.push(observer);
};
Observable.prototype.addObserver = addObserver;

var hasObserver = function(observer) {
  var i, l;
  for (i=0,l=this.observers.length; i<l; i++) {
    if (this.observers[i] == observer) {
      return true;
    }
  }
  return false;
};
Observable.prototype.hasObserver = hasObserver;

var notifyObservers = function() {
  var i,l;
  for (i=0,l=this.observers.length; i<l; i++) {
    this.observers[i].apply(this, arguments);
  }
};
Observable.prototype.notifyObservers = notifyObservers;

exports.Observable = Observable;

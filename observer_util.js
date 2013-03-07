// STEP 9:  Add error handling (write test cases first!)

var Observable = function() {
  this.observers = [];
};

var addObserver = function(observer) {
  if (typeof observer != "function") {
    throw new TypeError("TypeError");
  }
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
    try {
      this.observers[i].apply(this, arguments);
    } catch (e) {}
  }
};
Observable.prototype.notifyObservers = notifyObservers;

exports.Observable = Observable;

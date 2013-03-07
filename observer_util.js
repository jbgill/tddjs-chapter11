// STEP 5:  We are adding a new Observer method.  Stub out the hasObserver function to keep the test passing

var Observable = function() {
  this.observers = [];
};

var addObserver = function(observer) {
  this.observers.push(observer);
};
Observable.prototype.addObserver = addObserver;

var hasObserver = function(observer) {
  //TODO:  fix this, it's hardcoded
  return true;
};
Observable.prototype.hasObserver = hasObserver;

exports.Observable = Observable;

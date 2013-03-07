// STEP 6:  new test will fail because of line 14

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

// STEP 4:  Fix the failing test by eliminating the hard-coded solution

var Observable = function() {
  this.observers = [];
};

var addObserver = function(observer) {
  this.observers.push(observer);
};
Observable.prototype.addObserver = addObserver;

exports.Observable = Observable;

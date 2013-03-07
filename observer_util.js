// STEP 3:  We realize that the hard-coded addObserver function is bad, so we will expose it
// by augmenting the test.

var Observable = function() {

};

var addObserver = function(observer) {
  this.observers = [observer];
};
Observable.prototype.addObserver = addObserver;

exports.Observable = Observable;

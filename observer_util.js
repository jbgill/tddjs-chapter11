// STEP 2:  Make the test pass by implementing the test's requirements
// We are doing all of the pieces necessary to make the test pass here,
// but it may be a good idea to address one test error at a time like the 
// book does.  As the book states, at first we will "do the simplest 
// thing that will work, no matter how dirty it feels", then review the 
// code once the test passes.

var Observable = function() {

};

var addObserver = function(observer) {
  this.observers = [observer];
};
Observable.prototype.addObserver = addObserver;

exports.Observable = Observable;

// STEP 7:  fix the failing test caused by line 13.  Note that we skipped the book section thart deals
// with the IE 6 issue because we are running in Node.js.

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

exports.Observable = Observable;

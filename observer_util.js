// STEP 12:  Refactor the code to accept arbitrary events based on a string identifier
//  This is an exercise left for the student.  See book section 11.7 for more details
//  For the really ambitious, do the exercise described at the end of section 11.7

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
